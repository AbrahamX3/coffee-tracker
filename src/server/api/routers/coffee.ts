import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { coffee, coffeeOnNote, coffeeOnVarietal } from "~/server/db/schema";
import {
  CoffeeInsertFormSchema,
  CoffeeUpdateFormSchema,
} from "~/utils/schemas/coffee-schema";

export const coffeeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.coffee.findMany({
      with: {
        roaster: true,
        varietals: true,
        notes: true,
        process: true,
      },
    });
  }),
  list: publicProcedure.query(async ({ ctx }) => {
    return (
      await ctx.db.query.coffee.findMany({
        with: {
          roaster: true,
        },
      })
    ).map((coffee) => {
      return {
        value: coffee.id,
        label: coffee.name ?? `${coffee.roaster.name} - ${coffee.region}`,
      };
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.coffee.findFirst({
        where: eq(coffee.id, input.id),
        with: {
          roaster: true,
          varietals: true,
          notes: true,
          process: true,
        },
      });
    }),
  insert: protectedProcedure
    .input(CoffeeInsertFormSchema)
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
          name: input.name,
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
  update: protectedProcedure
    .input(CoffeeUpdateFormSchema.extend({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("No Id provided");
      }

      const coffeeUpdate = await ctx.db
        .update(coffee)
        .set({
          name: input.name,
          region: input.region,
          roasterId: input.roasterId,
          active: input.active,
          altitude: input.altitude,
          score: input.score,
          roast: input.roast,
          processId: input.processId,
        })
        .where(eq(coffee.id, input.id));

      if (input.varietals.length > 0) {
        await ctx.db
          .delete(coffeeOnVarietal)
          .where(eq(coffeeOnVarietal.coffeeId, input.id));
        await ctx.db.insert(coffeeOnVarietal).values(
          input.varietals.map((varietalId) => ({
            coffeeId: input.id,
            varietalId,
          })),
        );
      }

      if (input.notes.length > 0) {
        await ctx.db
          .delete(coffeeOnNote)
          .where(eq(coffeeOnNote.coffeeId, input.id));
        await ctx.db.insert(coffeeOnNote).values(
          input.notes.map((noteId) => ({
            coffeeId: input.id,
            noteId,
          })),
        );
      }

      return coffeeUpdate;
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
