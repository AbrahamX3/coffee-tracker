import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { ProcessInsertSchema, process } from "~/server/db/schema";

export const processRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.process.findMany();
  }),
  list: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.db.query.process.findMany()).map((process) => {
      return {
        value: process.id,
        label: process.name,
      };
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.process.findFirst({
        where: eq(process.id, input.id),
      });
    }),
  create: protectedProcedure
    .input(ProcessInsertSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(process).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(ProcessInsertSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("No Id provided");
      }

      return await ctx.db
        .update(process)
        .set({
          ...input,
        })
        .where(eq(process.id, input.id));
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(process).where(eq(process.id, input.id));
    }),
});
