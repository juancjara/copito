import { serve } from "@hono/node-server";
import { Hono } from "hono";
import * as dotenv from "dotenv";

dotenv.config();

import sampleRouter from "./routes/sample.js";
import { script } from "./services/script.js";

const app = new Hono();

app.route("/sample", sampleRouter);

script();

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
