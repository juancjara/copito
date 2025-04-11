import axios, { AxiosError } from "axios";
import fs from "fs";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@copito/api";
import SuperJSON from "superjson";

// TODO get URL and timeout from parameters
const url = "https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio";
//const timeout = 60 * 60 * 1000;
const timeout = 20 * 1000;

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
      transformer: SuperJSON,
      /*
      async headers() {
        return {
          authorization: getAuthCookie(),
        };
      },
      */
    }),
  ],
});

let timeoutId: NodeJS.Timeout;

const main = async () => {
  const fileName = `${new Date().toISOString()}.aac`;
  const result = await client.recordings.create.mutate({
    radioName: "Radio 1",
    streamUrl: url,
    fileName,
  });
  try {
    console.log("Attempting to connect to stream:", url);
    const response = await axios({
      method: "get",
      url,
      responseType: "stream",
    });

    console.log("Stream connected successfully");
    const fileStream = fs.createWriteStream(fileName);

    await client.recordings.updateById.mutate({
      id: result.id,
      status: "processing",
    });

    response.data.on("data", (chunk: Buffer) => {
      console.log(`Received ${chunk.length} bytes of data`);
    });

    response.data.on("error", (err: Error) => {
      console.error("Stream error:", err);
    });

    response.data.pipe(fileStream);

    console.log("Started recording to file:", fileName);

    // Wait for the timeout to complete
    await new Promise<void>((resolve) => {
      timeoutId = setTimeout(async () => {
        console.log("Recording timeout reached");
        await client.recordings.updateById.mutate({
          id: result.id,
          status: "completed",
        });
        fileStream.end();
        response.data.destroy();
        resolve();
      }, timeout);
    });
  } catch (error) {
    await client.recordings.updateById.mutate({
      id: result.id,
      status: "failed",
    });
    if (error instanceof AxiosError) {
      console.error("Axios error:", error.message);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  } finally {
    console.log("End of script");
    clearTimeout(timeoutId);
  }
};

main();
