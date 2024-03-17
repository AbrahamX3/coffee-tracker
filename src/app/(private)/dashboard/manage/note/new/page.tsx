import { redirect } from "next/navigation";
import BackButton from "~/components/general/back-button";
import { DashboardHeader } from "~/components/general/dashboard-header";
import FormShell from "~/components/general/form-shell";
import { DashboardShell } from "~/components/general/shell";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";
import { CreateForm } from "../_components/create-form";

export const metadata = {
  title: "Create Note",
};

export default async function Create() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        icon="note"
        heading="Create Note"
        text="Create a new note"
      >
        <BackButton href="/dashboard/manage/note" />
      </DashboardHeader>
      <FormShell>
        <CreateForm />
      </FormShell>
    </DashboardShell>
  );
}
