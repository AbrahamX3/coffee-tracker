import { CoffeeIcon } from "lucide-react";
import { Suspense } from "react";
import { DashboardHeader } from "~/components/general/dashboard-header";
import { CardStat } from "~/components/overview/card-stat";
import CoffeeTrackerGraph from "~/components/overview/coffee-tracker-graph";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { months } from "~/lib/constants";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Tracker",
};

export default async function PublicDashboard() {
  const logs = await api.stats.getLogs.query();
  const avgCoffee = await api.stats.getAlltimeCoffeeAvg.query();
  const totalCoffee = await api.stats.getTotalCoffeesTried.query();

  return (
    <div className="container flex flex-1 flex-col">
      <DashboardHeader
        heading="Tracker"
        text="Overview of my coffee consumption and coffee I had"
      />
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
            <Suspense fallback={"Loading..."}>
              <Carousel
                opts={{
                  startIndex: new Date().getMonth(),
                  loop: true,
                }}
                className="m-6"
              >
                <CarouselContent>
                  {months.map((month) => (
                    <CarouselItem key={month.id}>
                      <h1 className="pb-2 text-3xl font-bold">{month.month}</h1>
                      <CoffeeTrackerGraph
                        totalsByDate={logs}
                        month={month.id}
                        key={month.month}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
