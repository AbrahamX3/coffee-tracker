import { z } from "zod";
import { type api } from "~/trpc/server";

export const LogInsertFormSchema = z.object({
  date: z.date(),
  coffeeId: z.number(),
});
export type LogInsertForm = z.infer<typeof LogInsertFormSchema>;

export const LogUpdateFormSchema = z.object({
  id: z.number(),
  date: z.date(),
  coffeeId: z.number(),
});
export type LogUpdateForm = z.infer<typeof LogUpdateFormSchema>;

export type LogGetAll = Awaited<ReturnType<typeof api.log.getAll.query>>;
export type LogGetById = Awaited<ReturnType<typeof api.log.getById.query>>;

export type LogDataTableColumn = LogGetAll[number];