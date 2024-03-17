import { redirect } from "next/navigation";
import BackButton from "~/components/general/back-button";
import { DashboardHeader } from "~/components/general/dashboard-header";
import FormShell from "~/components/general/form-shell";
import { DashboardShell } from "~/components/general/shell";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";
import { CreateForm } from "../_components/create-form";

export const metadata = {
  title: "Create Log",
};

export default async function Create() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  return (
    <DashboardShell>
      <DashboardHeader icon="log" heading="Create Log" text="Create a new log">
        <BackButton href="/dashboard/manage/log" />
      </DashboardHeader>
      <FormShell>
        <CreateForm />
      </FormShell>
    </DashboardShell>
  );
}
