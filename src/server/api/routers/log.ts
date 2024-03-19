import { format } from "@formkit/tempo";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { log } from "~/server/db/schema";
import { LogFormSchema } from "~/utils/schemas/log-schema";

export const logRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.log.findMany({
      orderBy: [desc(log.date)],
      with: {
        coffee: {
          with: {
            roaster: true,
            process: true,
            notes: {
              columns: {
                coffeeId: false,
                noteId: false,
              },
              with: {
                note: true,
              },
            },
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
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.log.findFirst({
        where: eq(log.id, input.id),
      });
    }),
  insert: protectedProcedure
    .input(LogFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(log).values({
        ...input,
        date: format(input.date, "YYYY-MM-DD"),
      });
    }),
  update: protectedProcedure
    .input(LogFormSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("No Id provided");
      }

      return await ctx.db
        .update(log)
        .set({
          ...input,
          date: format(input.date, "YYYY-MM-DD"),
          updatedAt: new Date(),
        })
        .where(eq(log.id, input.id));
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(log).where(eq(log.id, input.id));
    }),
});
