import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/shell";
import { CreateForm } from "./_components/form";

export const metadata = {
  title: "Create Roaster",
};

export default async function Create() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Roaster" text="Create a new roaster" />
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 animate-in fade-in-50">
        <CreateForm />
      </div>
    </DashboardShell>
  );
}
