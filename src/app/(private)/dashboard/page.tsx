import { redirect } from "next/navigation";
import { CreateButton } from "~/components/create-button";
import { DashboardHeader } from "~/components/dashboard-header";
import { DashboardShell } from "~/components/shell";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/login");
  }

  return (
    <main className="col-span-full flex w-full flex-1 flex-col">
      <DashboardShell>
        <DashboardHeader heading="Dashboard" text="Overview of created logs">
          <CreateButton
            href="/dashboard/manage/log/create"
            title="Create Log"
          />
        </DashboardHeader>
        <div className="flex w-full flex-col gap-3">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="h-8 w-full animate-pulse rounded-md bg-muted"
              ></div>
            ))}
        </div>
      </DashboardShell>
    </main>
  );
}
