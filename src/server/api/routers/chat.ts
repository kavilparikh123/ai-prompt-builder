import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const chatRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ promptId: z.string(), message: z.string() }))
    .mutation(async ({ input }) => {
      const prompt = await prisma.prompt.findUnique({ where: { id: input.promptId } });
      if (!prompt) return { response: "Prompt not found." };

      // Save user message
      await prisma.message.create({
        data: {
          promptId: input.promptId,
          sender: "user",
          text: input.message,
        },
      });

      const fullPrompt = `${prompt.body}\nUser: ${input.message}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt.body },
          { role: "user", content: input.message },
        ],
      });

      const aiReply = completion.choices[0]?.message?.content ?? "No response.";

      await prisma.message.create({
        data: {
          promptId: input.promptId,
          sender: "ai",
          text: aiReply,
        },
      });

      return { response: aiReply };
    }),

  getHistory: publicProcedure
    .input(z.object({ promptId: z.string() }))
    .query(({ input }) => {
      return prisma.message.findMany({
        where: { promptId: input.promptId },
        orderBy: { createdAt: "asc" },
      });
    }),
});
