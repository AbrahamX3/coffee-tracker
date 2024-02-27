import { DashboardHeader } from "~/components/dashboard-header";

export const metadata = {
  title: "Manage Catalogs",
};

export default async function DashboardPage() {
  return (
    <>
      <DashboardHeader
        heading="Statistics"
        text="Dashboard overview and general statistics"
      />
      <div>
        <div>8 Logs</div>
        <div>3 Rosters</div>
      </div>
    </>
  );
}
