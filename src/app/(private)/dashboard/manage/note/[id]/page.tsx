import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { UpdateForm } from "../_components/update-form";
import FormShell from "~/components/form-shell";

export const metadata = {
  title: "Update Note",
};

export default async function Update({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  const data = await api.note.getById.query({ id });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Update Note"
        text="Update an existing varietal"
      />
      <FormShell>
        <UpdateForm id={id} data={data} />
      </FormShell>
    </DashboardShell>
  );
}
