import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { RoasterSchema, roaster } from "~/server/db/schema";

export const roasterRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.roaster.findMany();
  }),
  create: protectedProcedure
    .input(RoasterSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(roaster).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(RoasterSchema)
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
});
