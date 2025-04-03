import { Hono } from "hono";

const sampleRouter = new Hono();

sampleRouter.get("/", (c) => {
  return c.json({ message: "Hello World" });
});

export default sampleRouter;
