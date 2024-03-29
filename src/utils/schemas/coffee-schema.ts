import { z } from "zod";
import { roastTypes } from "~/server/db/schema";
import { type api } from "~/trpc/server";

export const CoffeeFormSchema = z.object({
  name: z.string().optional(),
  notes: z.array(z.string()),
  varietals: z.array(z.string()),
  region: z.string().min(1, { message: "Region is required" }),
  altitude: z.coerce.number().min(0).max(10000).default(0).optional(),
  producer: z.string().optional(),
  country: z.string().optional(),
  estate: z.string().optional(),
  sca: z.coerce.number().min(0).max(100).default(0).optional(),
  personal_sca: z.coerce.number().min(0).max(100).default(0).optional(),
  roasterId: z.string().min(1, { message: "Roaster is required" }),
  processId: z.string().min(1, { message: "Process is required" }),
  active: z.boolean().default(true).optional(),
  roast: z.enum(roastTypes),
});

export type CoffeeForm = z.infer<typeof CoffeeFormSchema>;

export type CoffeeGetById = Awaited<
  ReturnType<typeof api.coffee.getById.query>
>;

export type CoffeeGetAll = Awaited<ReturnType<typeof api.coffee.getAll.query>>;

export type CoffeeDataTableColumn = CoffeeGetAll[number];
