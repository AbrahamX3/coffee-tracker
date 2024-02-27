import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { NoteInsertSchema, note } from "~/server/db/schema";

export const noteRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.note.findMany();
  }),
  create: protectedProcedure
    .input(NoteInsertSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(note).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(NoteInsertSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("No Id provided");
      }

      return await ctx.db
        .update(note)
        .set({
          ...input,
        })
        .where(eq(note.id, input.id));
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(note).where(eq(note.id, input.id));
    }),
});
