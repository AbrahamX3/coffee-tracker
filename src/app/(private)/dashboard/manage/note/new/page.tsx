import { DashboardHeader } from "~/components/dashboard-header";
import FormShell from "~/components/form-shell";
import { DashboardShell } from "~/components/shell";
import { CreateForm } from "../_components/create-form";

export const metadata = {
  title: "Create Note",
};

export default async function Create() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Note" text="Create a new note" />
      <FormShell>
        <CreateForm />
      </FormShell>
    </DashboardShell>
  );
}
