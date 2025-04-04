import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { recordingsRouter } from "./routes/recordings.js";

const app = new Hono();

app.route("/recordings", recordingsRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
