import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { UpdateForm } from "../_components/update-form";
import FormShell from "~/components/form-shell";

export const metadata = {
  title: "Update Roaster",
};

export default async function Update({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  const data = await api.roaster.getById.query({ id });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Update Roaster"
        text="Update an existing roaster"
      />
      <FormShell>
        <UpdateForm id={id} data={data} />
      </FormShell>
    </DashboardShell>
  );
}
