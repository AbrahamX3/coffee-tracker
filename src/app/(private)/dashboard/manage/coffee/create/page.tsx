import { DashboardHeader } from "~/components/dashboard-header";
import FormShell from "~/components/form-shell";
import { DashboardShell } from "~/components/shell";
import { CreateForm } from "../_components/create-form";

export const metadata = {
  title: "Create Roaster",
};

export default async function Create() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Coffee" text="Create a new coffee" />
      <FormShell>
        <CreateForm />
      </FormShell>
    </DashboardShell>
  );
}
