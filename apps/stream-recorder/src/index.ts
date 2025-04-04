import axios, { AxiosError } from "axios";
import fs from "fs";

// TODO get URL and timeout from parameters
const url = "https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio";
const timeout = 60 * 60 * 1000;
//const timeout = 1 * 60 * 1000;

let timeoutId: NodeJS.Timeout;

const main = async () => {
  try {
    console.log("Attempting to connect to stream:", url);
    const response = await axios({
      method: "get",
      url,
      responseType: "stream",
    });

    console.log("Stream connected successfully");
    const filename = `${new Date().toISOString()}.aac`;
    const fileStream = fs.createWriteStream(filename);

    response.data.on("data", (chunk: Buffer) => {
      console.log(`Received ${chunk.length} bytes of data`);
    });

    response.data.on("error", (err: Error) => {
      console.error("Stream error:", err);
    });

    response.data.pipe(fileStream);

    console.log("Started recording to file:", filename);

    // Wait for the timeout to complete
    await new Promise<void>((resolve) => {
      timeoutId = setTimeout(() => {
        console.log("Recording timeout reached");
        fileStream.end();
        response.data.destroy();
        resolve();
      }, timeout);
    });
  } catch (error) {
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
