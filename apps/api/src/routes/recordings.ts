import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { recordingsService } from "../services/recordings.js";
import { z } from "zod";

export const recordingsRouter = new Hono()
  .get("/", async (c) => {
    const recordings = await recordingsService.getAll();
    console.log("called");
    return c.json({
      data: [],
    });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        radioName: z.string(),
        streamUrl: z.string(),
        fileName: z.string(),
      })
    ),
    async (c) => {
      const data = c.req.valid("json");
      const recording = await recordingsService.create(data);
      return c.json(recording);
    }
  )
  .patch(
    "/:id",
    zValidator(
      "json",
      z.object({
        status: z.enum(["pending", "processing", "completed", "failed"]),
        duration: z.number().optional(),
        size: z.number().optional(),
      })
    ),
    zValidator("param", z.object({ id: z.coerce.number() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const data = c.req.valid("json");
      const recording = await recordingsService.updateById(id, data);
      return c.json(recording);
    }
  );
