import { publicProcedure, createTRPCRouter } from "../trpc.js";
import { recordingsService } from "../services/recordings.js";
import { z } from "zod";

export const recordingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const recordings = await recordingsService.getAll();
    return recordings;
  }),
  create: publicProcedure
    .input(
      z.object({
        radioName: z.string(),
        streamUrl: z.string(),
        fileName: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const recording = await recordingsService.create(input);
      return recording;
    }),
  updateById: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "processing", "completed", "failed"]),
        duration: z.number().optional(),
        size: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const recording = await recordingsService.updateById(input.id, input);
      return recording;
    }),
});
