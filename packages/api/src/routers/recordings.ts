import { publicProcedure, createTRPCRouter } from "../trpc.js";
import { recordingsService } from "../services/recordings.js";

export const recordingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const recordings = await recordingsService.getAll();
    return recordings;
  }),
});
