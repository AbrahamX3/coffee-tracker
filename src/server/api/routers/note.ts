import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { NoteSchema, note } from "~/server/db/schema";

export const noteRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.note.findMany();
  }),
  create: protectedProcedure
    .input(NoteSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(note).values({
        ...input,
      });
    }),
  update: protectedProcedure
    .input(NoteSchema)
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
});
