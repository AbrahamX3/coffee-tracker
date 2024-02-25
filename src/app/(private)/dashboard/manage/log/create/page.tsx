import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/shell";

export const metadata = {
  title: "Create Log",
};

export default async function Create() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Log" text="Create a new log" />
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        hi
      </div>
    </DashboardShell>
  );
}
