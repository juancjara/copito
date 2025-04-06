import { createTRPCRouter } from "./trpc.js";
import { helloRouter } from "./routers/hello.js";

export const appRouter = createTRPCRouter({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
