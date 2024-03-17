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
  title: "Update Log",
};

export default async function Update({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const id = parseInt(params.id, 10);

  const data = await api.log.getById.query({ id });

  if (!data) {
    notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        icon="log"
        heading="Update Log"
        text="Update an existing log"
      >
        <BackButton href="/dashboard/manage/log" />
      </DashboardHeader>
      <FormShell>
        <UpdateForm data={data} />
      </FormShell>
    </DashboardShell>
  );
}
