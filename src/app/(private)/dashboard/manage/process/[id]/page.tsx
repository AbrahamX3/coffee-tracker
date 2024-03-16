import { notFound, redirect } from "next/navigation";
import { DashboardHeader } from "~/components/general/dashboard-header";
import FormShell from "~/components/general/form-shell";
import { DashboardShell } from "~/components/general/shell";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";
import { UpdateForm } from "../_components/update-form";

export const metadata = {
  title: "Update Process",
};

export default async function Update({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const id = parseInt(params.id, 10);

  const data = await api.process.getById.query({ id });

  if (!data) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Update Process"
        text="Update an existing process"
      />
      <FormShell>
        <UpdateForm data={data} />
      </FormShell>
    </DashboardShell>
  );
}
