import { eq } from "drizzle-orm";
import { z } from "zod";
import { coffeeInsertformSchema } from "~/app/(private)/dashboard/manage/coffee/create/page";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  CoffeeInsertSchema,
  coffee,
  coffeeOnNote,
  coffeeOnVarietal,
} from "~/server/db/schema";

export const coffeeInsertSchema = z.object({
  coffeeValues: CoffeeInsertSchema,
  varietalsValues: z.number().array(),
  notesValues: z.number().array(),
});

export const coffeeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.coffee.findMany({
      with: {
        roaster: true,
        varietals: true,
        notes: true,
      },
    });
  }),
  insert: protectedProcedure
    .input(coffeeInsertformSchema)
    .mutation(async ({ ctx, input }) => {
      let varietalsInsert: {
        varietalId: number;
      }[] = [];

      let notesInsert: {
        noteId: number;
      }[] = [];

      const coffeeInsert = await ctx.db
        .insert(coffee)
        .values({
          region: input.region,
          roasterId: input.roasterId,
          active: input.active,
          altitude: input.altitude,
          score: input.score,
          roast: input.roast,
          processId: input.processId,
        })
        .returning({
          id: coffee.id,
        });

      const coffeeId = coffeeInsert[0]?.id;

      if (input.varietals.length > 0 && coffeeId) {
        varietalsInsert = await ctx.db
          .insert(coffeeOnVarietal)
          .values(
            input.varietals.map((varietalId) => ({
              coffeeId,
              varietalId,
            })),
          )
          .returning({
            varietalId: coffeeOnVarietal.varietalId,
          });
      }

      if (input.notes.length > 0 && coffeeId) {
        notesInsert = await ctx.db
          .insert(coffeeOnNote)
          .values(input.notes.map((noteId) => ({ coffeeId, noteId })))
          .returning({
            noteId: coffeeOnNote.noteId,
          });
      }

      return {
        coffeeInsert,
        varietalsInsert,
        notesInsert,
      };
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(coffee).where(eq(coffee.id, input.id));
    }),
});
