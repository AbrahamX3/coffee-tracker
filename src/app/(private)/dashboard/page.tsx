import { CoffeeIcon, PlusIcon } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardHeader } from "~/components/general/dashboard-header";
import { CardStat } from "~/components/overview/card-stat";
import LogCarousel from "~/components/overview/log-carousel";
import { buttonVariants } from "~/components/ui/button";
import { getCurrentUser } from "~/lib/session";
import { cn } from "~/lib/utils";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Tracker",
};

export default async function DashboardPage() {
  noStore();

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const logs = await api.stats.getLogs.query();
  const avgCoffee = await api.stats.getAlltimeCoffeeAvg.query();
  const totalCoffee = await api.stats.getTotalCoffeesTried.query();

  return (
    <div className="container flex flex-1 flex-col">
      <DashboardHeader
        heading="Coffee Consumption Overview"
        text="Gain insights into my coffee consumption habits and the different types of coffee I've enjoyed."
      >
        <Link href="/dashboard/manage/log/new" className={cn(buttonVariants())}>
          New Log <PlusIcon className="ml-2 h-4 w-4" />
        </Link>
      </DashboardHeader>
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
          <CardStat
            icon={<CoffeeIcon className="h-4 w-4" />}
            title="Average Coffee per Day"
            total={
              Intl.NumberFormat("en-US").format(
                avgCoffee[0]?.avg ? Number(avgCoffee[0]?.avg) : 0,
              ) + " per day"
            }
          />
          <CardStat
            icon={<CoffeeIcon className="h-4 w-4" />}
            title="Total Coffee's Tried"
            total={
              Intl.NumberFormat("en-US").format(
                totalCoffee[0]?.total ? Number(totalCoffee[0]?.total) : 0,
              ) + " coffees"
            }
          />
        </div>
        <div className="flex w-full flex-1 flex-col overflow-hidden rounded-md border p-4">
          <div className="container flex w-full flex-col gap-2">
            <LogCarousel logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}
