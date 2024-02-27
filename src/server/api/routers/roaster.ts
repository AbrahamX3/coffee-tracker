import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { RoasterInsertSchema, roaster } from "~/server/db/schema";

export const roasterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.roaster.findMany();
  }),
  create: protectedProcedure
    .input(RoasterInsertSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(roaster).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(RoasterInsertSchema)
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
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(roaster).where(eq(roaster.id, input.id));
    }),
});
