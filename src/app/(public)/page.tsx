import { redirect } from "next/navigation";
import { DashboardHeader } from "~/components/dashboard-header";
import ContributionGraph from "~/components/graph";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const logs = await api.stats.getLogs.query();

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
    <>
      <div className="container flex flex-1 flex-col">
        <DashboardHeader
          heading="Statistics"
          text="Overview of my coffee consumption and coffee I had"
        />
        <main className="col-span-full flex w-full flex-1 flex-col overflow-hidden rounded-md border p-4">
          <div className="container flex w-full flex-col gap-2">
            {months.map((month) => (
              <div key={month.id}>
                <h1 className="pb-2 text-3xl font-bold">{month.month}</h1>
                <ContributionGraph
                  totalsByDate={logs}
                  month={month.id}
                  key={month.month}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
