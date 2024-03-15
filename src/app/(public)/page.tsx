import { CoffeeIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { DashboardHeader } from "~/components/dashboard-header";
import TrackingGraph from "~/components/graph";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";

interface CardStatsProps {
  title: string;
  total: string;
  icon: React.ReactNode;
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const logs = await api.stats.getLogs.query();
  const avgCoffee = await api.stats.getAlltimeCoffeeAvg.query();
  const totalCoffee = await api.stats.getTotalCoffeesTried.query();

  const months = [
    {
      month: "January",
      id: 1,
    },
    {
      month: "February",
      id: 2,
    },
    {
      month: "March",
      id: 3,
    },

    {
      month: "April",
      id: 4,
    },

    {
      month: "May",
      id: 5,
    },

    {
      month: "June",
      id: 6,
    },

    {
      month: "July",
      id: 7,
    },

    {
      month: "August",
      id: 8,
    },
    {
      month: "September",
      id: 9,
    },
    {
      month: "October",
      id: 10,
    },
    {
      month: "November",
      id: 11,
    },
    {
      month: "December",
      id: 12,
    },
  ];

  return (
    <div className="container flex flex-1 flex-col">
      <DashboardHeader
        heading="Tracker"
        text="Overview of my coffee consumption and coffee I had"
      />
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4">
          <CardLogStats
            icon={<CoffeeIcon className="h-4 w-4" />}
            title="Average Coffee per Day"
            total={
              Intl.NumberFormat("en-US").format(
                avgCoffee[0]?.avg ? Number(avgCoffee[0]?.avg) : 0,
              ) + " per day"
            }
          />
          <CardLogStats
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
                      <TrackingGraph
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

export function CardLogStats({ title, total, icon }: CardStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium tabular-nums">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
      </CardContent>
    </Card>
  );
}
