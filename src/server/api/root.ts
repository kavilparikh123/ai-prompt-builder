// src/server/api/root.ts

import { createTRPCRouter } from "~/server/api/trpc";
import { promptRouter } from "./routers/prompt";
import { chatRouter } from "./routers/chat";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { postRouter } from "./routers/post";

export const appRouter = createTRPCRouter({
  prompt: promptRouter,
  chat: chatRouter,
  post: postRouter,
});

export const createCaller = appRouter.createCaller;

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
