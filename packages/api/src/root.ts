import { createTRPCRouter } from "./trpc.js";
import { recordingsRouter as recordings } from "./routers/recordings.js";

export const appRouter = createTRPCRouter({
  recordings,
});

export type AppRouter = typeof appRouter;
