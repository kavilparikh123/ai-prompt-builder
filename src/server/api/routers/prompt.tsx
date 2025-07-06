import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const promptRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return prisma.prompt.findMany({ orderBy: { createdAt: "desc" } });
  }),

  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return prisma.prompt.findUnique({ where: { id: input.id } });
  }),

  create: publicProcedure
    .input(z.object({ title: z.string(), body: z.string() }))
    .mutation(({ input }) => {
      return prisma.prompt.create({ data: input });
    }),

  update: publicProcedure
    .input(z.object({ id: z.string(), title: z.string(), body: z.string() }))
    .mutation(({ input }) => {
      return prisma.prompt.update({
        where: { id: input.id },
        data: { title: input.title, body: input.body },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma.prompt.delete({ where: { id: input.id } });
    }),

});
