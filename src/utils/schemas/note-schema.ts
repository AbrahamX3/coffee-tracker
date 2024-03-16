import { z } from "zod";
import { type api } from "~/trpc/server";

export const NoteFormSchema = z.object({
  name: z.string().min(1, { message: "Note Name is required" }),
});

export type NoteForm = z.infer<typeof NoteFormSchema>;

export type NoteGetById = Awaited<ReturnType<typeof api.note.getById.query>>;

export type NoteGetAll = Awaited<ReturnType<typeof api.note.getAll.query>>;

export type NoteDataTableColumn = NoteGetAll[number];
