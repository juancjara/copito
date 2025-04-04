import { Hono } from "hono";
import { recordingsService } from "../services/recordings.js";

export const recordingsRouter = new Hono()
  .get("/", async (c) => {
    const recordings = await recordingsService.getAll();
    return c.json({
      data: recordings,
    });
  })
  .post("/", async (c) => {
    const { radioName, streamUrl, fileName } = await c.req.json();
    const recording = await recordingsService.create({
      radioName,
      streamUrl,
      fileName,
    });
    return c.json(recording);
  })
  .put("/:id", async (c) => {
    const { id } = c.req.param();
    const { status, duration, size } = await c.req.json();
    const recording = await recordingsService.updateById(Number(id), {
      status,
      duration,
      size,
    });
    return c.json(recording);
  });
