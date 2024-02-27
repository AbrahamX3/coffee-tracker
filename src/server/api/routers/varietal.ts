import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { VarietalInsertSchema, varietal } from "~/server/db/schema";

export const varietalRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.varietal.findMany();
  }),
  create: protectedProcedure
    .input(VarietalInsertSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(varietal).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(VarietalInsertSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("No Id provided");
      }

      return await ctx.db
        .update(varietal)
        .set({
          ...input,
        })
        .where(eq(varietal.id, input.id));
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(varietal).where(eq(varietal.id, input.id));
    }),
});
