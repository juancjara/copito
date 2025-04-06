import { createTRPCRouter, publicProcedure } from "../trpc.js";

export const helloRouter = createTRPCRouter({
  get: publicProcedure.query(() => {
    return "Hello World";
  }),
  getUser: publicProcedure.query(() => {
    return {
      id: 1,
      name: "John Doe",
    };
  }),
});
