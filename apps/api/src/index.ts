import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { recordingsRouter } from "./routes/recordings.js";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", cors());
app.use("*", logger());

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
