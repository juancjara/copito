// TODO use long process
// worker
import axios, { AxiosError } from "axios";
import fs from "fs";
const url = "https://mdstrm.com/audio/5fab3416b5f9ef165cfab6e9/icecast.audio";

const saveStream = (fileName: string, stream: ReadableStream, time: number) => {
  const fileStream = fs.createWriteStream(fileName);
  stream.pipe(fileStream);
  setTimeout(() => {
    fileStream.end();
  }, time);
};

export const script = async (time: number) => {
  let i = 0;

  try {
    const response = await axios({
      method: "get",
      url: url,
      responseType: "stream",
      maxRedirects: 5,
    });

    saveStream(`output${i}.aac`, response.data, 60000);

    let t = 0;
    const offset = 15;
    const interval = setInterval(() => {
      t++;

      if (i === 3) {
        console.log("finished");
        response.data.destroy();
        clearInterval(interval);
        return;
      }

      if (t + offset === 60) {
        console.log("new stream", i);
        i++;
        saveStream(`output${i}.aac`, response.data, (60 + offset) * 1000);
      }

      if (t === 60) {
        t = 0;
      }
    }, 1000);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error:", error.message);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    } else {
      console.error("Unknown error:", error);
    }
  }
};
