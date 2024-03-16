import { z } from "zod";
import { type api } from "~/trpc/server";

export const ProcessFormSchema = z.object({
  name: z.string().min(1, { message: "Process Name is required" }),
});

export type ProcessForm = z.infer<typeof ProcessFormSchema>;

export type ProcessGetById = Awaited<
  ReturnType<typeof api.process.getById.query>
>;

export type ProcessGetAll = Awaited<
  ReturnType<typeof api.process.getAll.query>
>;

export type ProcessDataTableColumn = ProcessGetAll[number];
