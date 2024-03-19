import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { roaster } from "~/server/db/schema";
import { RoasterFormSchema } from "~/utils/schemas/roaster-schema";

export const roasterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.roaster.findMany();
  }),
  list: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.db.query.roaster.findMany()).map((roaster) => {
      return {
        value: roaster.id,
        label: roaster.name,
      };
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.roaster.findFirst({
        where: eq(roaster.id, input.id),
      });
    }),
  create: protectedProcedure
    .input(RoasterFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(roaster).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(RoasterFormSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("No Id provided");
      }

      return await ctx.db
        .update(roaster)
        .set({
          ...input,
        })
        .where(eq(roaster.id, input.id));
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(roaster).where(eq(roaster.id, input.id));
    }),
});
