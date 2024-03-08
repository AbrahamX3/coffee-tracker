import {
  CalendarDaysIcon,
  CoffeeIcon,
  CogIcon,
  NotepadTextIcon,
  SquareStackIcon,
  WarehouseIcon,
} from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { DashboardHeader } from "~/components/dashboard-header";
import { api } from "~/trpc/server";
import CardCstats from "./_components/card-stats";
export const metadata = {
  title: "Manage Catalogs",
};

export default async function StatsPage() {
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
        <CardCstats
          title="Total Roasters"
          total={Intl.NumberFormat("en-US").format(totalRoasters)}
          icon={<WarehouseIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/roaster"
        />
        <CardCstats
          title="Total Logs"
          total={Intl.NumberFormat("en-US").format(totalLogs)}
          icon={<CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/log"
        />
        <CardCstats
          title="Total Coffees"
          total={Intl.NumberFormat("en-US").format(totalCoffees)}
          icon={<CoffeeIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/coffee"
        />
        <CardCstats
          title="Total Notes"
          total={Intl.NumberFormat("en-US").format(totalNotes)}
          icon={<NotepadTextIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/note"
        />
        <CardCstats
          title="Total Varietals"
          total={Intl.NumberFormat("en-US").format(totalVarietals)}
          icon={<SquareStackIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/varietal"
        />
        <CardCstats
          title="Total Processes"
          total={Intl.NumberFormat("en-US").format(totalProcesses)}
          icon={<CogIcon className="h-4 w-4 text-muted-foreground" />}
          url="/dashboard/manage/process"
        />
      </div>
    </>
  );
}
