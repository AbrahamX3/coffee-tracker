import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/shell";

export const metadata = {
  title: "Manage Catalogs",
};

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Statistics"
        text="Dashboard overview and general statistics"
      />
      <div>
        <div>8 Logs</div>
        <div>3 Rosters</div>
      </div>
    </DashboardShell>
  );
}
