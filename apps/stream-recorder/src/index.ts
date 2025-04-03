import axios, { AxiosError } from "axios";
import fs from "fs";

// TODO get URL and timeout from parameters
const url = "https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio";
//const timeout = 120 * 60 * 1000;
const timeout = 1 * 60 * 1000;

let timeoutId: NodeJS.Timeout;

const main = async () => {
  try {
    const response = await axios({
      method: "get",
      url,
      responseType: "stream",
    });

    const fileStream = fs.createWriteStream(`${new Date().toISOString()}.aac`);

    response.data.pipe(fileStream);

    console.log("started");
    await new Promise<void>((resolve) => {
      timeoutId = setTimeout(() => {
        console.log("ended");
        fileStream.end();
        response.data.destroy();
        resolve();
      }, timeout);
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.headers);
      }
    } else {
      console.error(error);
    }
  } finally {
    console.log("end of script");
  }
};

// Properly await the main function
main().catch(console.error);
