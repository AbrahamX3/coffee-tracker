import { DashboardHeader } from "~/components/dashboard-header";
import FormShell from "~/components/form-shell";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { UpdateForm } from "../_components/update-form";

export const metadata = {
  title: "Update Log",
};

export default async function Update({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  const data = await api.log.getById.query({ id });

  return (
    <DashboardShell>
      <DashboardHeader heading="Update Log" text="Update an existing log" />
      <FormShell>
        <UpdateForm data={data} />
      </FormShell>
    </DashboardShell>
  );
}
