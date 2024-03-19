import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { note } from "~/server/db/schema";
import { NoteFormSchema } from "~/utils/schemas/note-schema";

export const noteRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.note.findMany();
  }),
  list: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.db.query.note.findMany()).map((note) => {
      return {
        label: note.name,
        value: note.id,
      };
    });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.note.findFirst({
        where: eq(note.id, input.id),
      });
    }),
  create: protectedProcedure
    .input(NoteFormSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(note).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(NoteFormSchema.extend({ id: z.string() }))
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
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(note).where(eq(note.id, input.id));
    }),
});
