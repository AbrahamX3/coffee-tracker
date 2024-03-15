import { DashboardHeader } from "~/components/dashboard-header";
import FormShell from "~/components/form-shell";
import { DashboardShell } from "~/components/shell";
import { CreateForm } from "../_components/create-form";

export const metadata = {
  title: "Create Log",
};

export default async function Create() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Log" text="Create a new log" />
      <FormShell>
        <CreateForm />
      </FormShell>
    </DashboardShell>
  );
}
