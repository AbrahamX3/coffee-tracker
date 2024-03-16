import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { varietal } from "~/server/db/schema";
import { VarietalFormSchema } from "~/utils/schemas/varietal-schema";

export const varietalRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.varietal.findMany();
  }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return (await ctx.db.query.varietal.findMany()).map((varietal) => {
      return {
        value: varietal.id,
        label: varietal.name,
      };
    });
  }),
  create: protectedProcedure
    .input(VarietalFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(varietal).values({
        ...input,
      });
    }),
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.varietal.findFirst({
        where: eq(varietal.id, input.id),
      });
    }),
  update: protectedProcedure
    .input(VarietalFormSchema.extend({ id: z.number() }))
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
