import { DashboardHeader } from "~/components/dashboard-header";
import FormShell from "~/components/form-shell";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { UpdateForm } from "../_components/update-form";

export const metadata = {
  title: "Update Process",
};

export default async function Update({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  const data = await api.process.getById.query({ id });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Update Process"
        text="Update an existing process"
      />
      <FormShell>
        <UpdateForm id={id} data={data} />
      </FormShell>
    </DashboardShell>
  );
}
