import { DashboardHeader } from "~/components/dashboard-header";
import FormShell from "~/components/form-shell";
import { DashboardShell } from "~/components/shell";
import { CreateForm } from "../_components/create-form";

export const metadata = {
  title: "Create Roaster",
};

import { z } from "zod";

export const coffeeInsertformSchema = z.object({
  notes: z.array(z.number()),
  varietals: z.array(z.number()),
  region: z.string().min(1, { message: "Region is required" }),
  altitude: z.coerce.number().min(0).max(10000),
  score: z.coerce.number().min(0).max(100),
  roasterId: z.number().min(1, { message: "Roaster is required" }),
  processId: z.number().min(1, { message: "Process is required" }),
  active: z.boolean(),
  roast: z.enum(["LIGHT", "LIGHT_MEDIUM", "MEDIUM", "MEDIUM_DARK", "DARK"]),
});

export type CreateFormSchema = z.infer<typeof coffeeInsertformSchema>;
export default async function Create() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Roaster" text="Create a new roaster" />
      <FormShell>
        <CreateForm />
      </FormShell>
    </DashboardShell>
  );
}
