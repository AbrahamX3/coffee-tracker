import { notFound, redirect } from "next/navigation";
import BackButton from "~/components/general/back-button";
import { DashboardHeader } from "~/components/general/dashboard-header";
import FormShell from "~/components/general/form-shell";
import { DashboardShell } from "~/components/general/shell";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";
import { UpdateForm } from "../_components/update-form";

export const metadata = {
  title: "Update Varietal",
};

export default async function Update({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const data = await api.varietal.getById.query({ id: params.id });

  if (!data) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Update Varietal"
        text="Update an existing varietal"
        icon="varietal"
      >
        <BackButton href="/dashboard/manage/varietal" />
      </DashboardHeader>
      <FormShell>
        <UpdateForm data={data} />
      </FormShell>
    </DashboardShell>
  );
}
