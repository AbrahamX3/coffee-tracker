import {
  CalendarDaysIcon,
  CoffeeIcon,
  CogIcon,
  NotepadTextIcon,
  SquareStackIcon,
  WarehouseIcon,
} from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { DashboardHeader } from "~/components/general/dashboard-header";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";
import CardStatLink from "../../../../components/overview/card-stat-link";

export const metadata = {
  title: "Manage Catalogs",
};

export default async function StatsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  noStore();

  const totals = await api.stats.getTotals.query();

  const {
    totalCoffees,
    totalNotes,
    totalProcesses,
    totalRoasters,
    totalVarietals,
    totalLogs,
  } = totals;

  return (
    <>
      <DashboardHeader
        heading="Statistics"
        text="Dashboard overview and general statistics"
      />
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
        <CardStatLink
          title="Total Roasters"
          total={Intl.NumberFormat("en-US").format(totalRoasters)}
          icon={<WarehouseIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/roaster"
        />
        <CardStatLink
          title="Total Logs"
          total={Intl.NumberFormat("en-US").format(totalLogs)}
          icon={<CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/log"
        />
        <CardStatLink
          title="Total Coffees"
          total={Intl.NumberFormat("en-US").format(totalCoffees)}
          icon={<CoffeeIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/coffee"
        />
        <CardStatLink
          title="Total Notes"
          total={Intl.NumberFormat("en-US").format(totalNotes)}
          icon={<NotepadTextIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/note"
        />
        <CardStatLink
          title="Total Varietals"
          total={Intl.NumberFormat("en-US").format(totalVarietals)}
          icon={<SquareStackIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/varietal"
        />
        <CardStatLink
          title="Total Processes"
          total={Intl.NumberFormat("en-US").format(totalProcesses)}
          icon={<CogIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/process"
        />
      </div>
    </>
  );
}
