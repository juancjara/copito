import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "./root.js";
import { appRouter } from "./root.js";
import { createCallerFactory } from "./trpc.js";

const createCaller = createCallerFactory(appRouter);

type RouterInputs = inferRouterInputs<AppRouter>;

type RouterOutputs = inferRouterOutputs<AppRouter>;

export { appRouter, createCaller };
export type { AppRouter, RouterInputs, RouterOutputs };
