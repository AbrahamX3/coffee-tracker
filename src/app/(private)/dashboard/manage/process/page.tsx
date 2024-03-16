import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { CreateButton } from "~/components/general/create-button";
import { DashboardHeader } from "~/components/general/dashboard-header";
import { EmptyPlaceholder } from "~/components/general/empty-placeholder";
import { DashboardShell } from "~/components/general/shell";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";
import { DataTableView } from "./_components/data-table-view";

export const metadata = {
  title: "Manage Roasters",
};

export default async function Process() {
  noStore();

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const processes = await api.process.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Roasters" text="Create and manage roasters">
        <CreateButton
          href="/dashboard/manage/process/new"
          title="Create Process"
        />
      </DashboardHeader>
      <div className="w-full">
        {processes?.length ? (
          <DataTableView data={processes} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No processes created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any processes yet.
            </EmptyPlaceholder.Description>
            <CreateButton
              variant="outline"
              href="/dashboard/manage/process/new"
              title="Create Process"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
