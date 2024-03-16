import { z } from "zod";
import { type api } from "~/trpc/server";

export const RoasterFormSchema = z.object({
  name: z.string().min(1, { message: "Roaster Name is required" }),
  website: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
  instagram: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
});

export type RoasterForm = z.infer<typeof RoasterFormSchema>;

export type RoasterGetById = Awaited<
  ReturnType<typeof api.roaster.getById.query>
>;

export type RoasterGetAll = Awaited<
  ReturnType<typeof api.roaster.getAll.query>
>;

export type RoasterDataTableColumn = RoasterGetAll[number];
