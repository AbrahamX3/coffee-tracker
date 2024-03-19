import { z } from "zod";
import { type api } from "~/trpc/server";

export const LogFormSchema = z.object({
  date: z.date(),
  coffeeId: z.string(),
});
export type LogForm = z.infer<typeof LogFormSchema>;

export type LogGetAll = Awaited<ReturnType<typeof api.log.getAll.query>>;
export type LogGetById = Awaited<ReturnType<typeof api.log.getById.query>>;

export type LogDataTableColumn = LogGetAll[number];
