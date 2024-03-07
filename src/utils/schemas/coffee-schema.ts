import { z } from "zod";
import { roastTypes } from "~/server/db/schema";
import { type api } from "~/trpc/server";

export const CoffeeInsertFormSchema = z.object({
  name: z.string().optional(),
  notes: z.array(z.number()),
  varietals: z.array(z.number()),
  region: z.string().min(1, { message: "Region is required" }),
  altitude: z.coerce.number().min(0).max(10000),
  score: z.coerce.number().min(0).max(100),
  roasterId: z.number().min(1, { message: "Roaster is required" }),
  processId: z.number().min(1, { message: "Process is required" }),
  active: z.boolean().optional(),
  roast: z.enum(roastTypes),
});
export type CoffeeInsertForm = z.infer<typeof CoffeeInsertFormSchema>;

export const CoffeeUpdateFormSchema = z.object({
  name: z.string().optional(),
  notes: z.array(z.number()),
  varietals: z.array(z.number()),
  region: z.string().min(1, { message: "Region is required" }),
  altitude: z.coerce.number().min(0).max(10000),
  score: z.coerce.number().min(0).max(100),
  roasterId: z.number().min(1, { message: "Roaster is required" }),
  processId: z.number().min(1, { message: "Process is required" }),
  active: z.boolean().optional(),
  roast: z.enum(roastTypes),
});
export type CoffeeUpdateForm = z.infer<typeof CoffeeUpdateFormSchema>;

export type CoffeeGetById = Awaited<
  ReturnType<typeof api.coffee.getById.query>
>;
export type CoffeeGetAll = Awaited<ReturnType<typeof api.coffee.getAll.query>>;

export type CoffeeDataTableColumn = CoffeeGetAll[number];
