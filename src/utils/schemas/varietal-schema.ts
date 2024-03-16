import { z } from "zod";
import { type api } from "~/trpc/server";

export const VarietalFormSchema = z.object({
  name: z.string().min(1, { message: "Varietal name is required" }),
});

export type VarietalForm = z.infer<typeof VarietalFormSchema>;

export type VarietalGetById = Awaited<
  ReturnType<typeof api.varietal.getById.query>
>;

export type VarietalGetAll = Awaited<
  ReturnType<typeof api.varietal.getAll.query>
>;

export type VarietalDataTableColumn = VarietalGetAll[number];
