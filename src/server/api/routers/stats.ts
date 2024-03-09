import { asc, count, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  coffee,
  log,
  note,
  process,
  roaster,
  varietal,
} from "~/server/db/schema";
export const statsRouter = createTRPCRouter({
  getTotals: publicProcedure.query(async ({ ctx }) => {
    const totalNotes = await ctx.db.select({ total: count() }).from(note);
    const totalVarietals = await ctx.db
      .select({
        total: count(),
      })
      .from(varietal);
    const totalProcesses = await ctx.db
      .select({
        total: count(),
      })
      .from(process);
    const totalCoffees = await ctx.db
      .select({
        total: count(),
      })
      .from(coffee);
    const totalRoasters = await ctx.db
      .select({
        total: count(),
      })
      .from(roaster);
    const totalLogs = await ctx.db.select({ total: count() }).from(log);

    return {
      totalNotes: totalNotes[0]?.total ?? 0,
      totalVarietals: totalVarietals[0]?.total ?? 0,
      totalProcesses: totalProcesses[0]?.total ?? 0,
      totalCoffees: totalCoffees[0]?.total ?? 0,
      totalRoasters: totalRoasters[0]?.total ?? 0,
      totalLogs: totalLogs[0]?.total ?? 0,
    };
  }),
  getLogs: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({
        date: log.date,
        total: sql<number>`cast(count(${log.id}) as int)`,
      })
      .from(log)
      .groupBy(log.date)
      .orderBy(asc(log.date));
  }),
  getLogsByDate: publicProcedure
    .input(z.object({ date: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.query.log.findMany({
        where: eq(log.date, input.date),
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
});
