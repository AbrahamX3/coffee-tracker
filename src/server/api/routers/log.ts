import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { LogSchema, log } from "~/server/db/schema";

export const logRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.log.findMany({
      with: {
        coffee: {
          with: {
            roaster: true,
            varietals: {
              columns: {
                coffeeId: false,
                varietalId: false,
              },
              with: {
                varietal: true,
              },
            },
          },
        },
      },
    });
  }),
  insert: protectedProcedure
    .input(LogSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(log).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(LogSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("No Id provided");
      }

      return await ctx.db
        .update(log)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(log.id, input.id));
    }),
});
