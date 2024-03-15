import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/shell";
import { CreateForm } from "../_components/create-form";
import FormShell from "~/components/form-shell";

export const metadata = {
  title: "Create Varietal",
};

export default async function Create() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Varietal" text="Create a new varietal" />
      <FormShell>
        <CreateForm />
      </FormShell>
    </DashboardShell>
  );
}
