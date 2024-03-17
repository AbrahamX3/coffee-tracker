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
  title: "Manage Logs",
};

export default async function Logs() {
  noStore();

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const logs = await api.log.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader icon="log" heading="Logs" text="Create and manage logs">
        <CreateButton href="/dashboard/manage/log/new" title="Create Log" />
      </DashboardHeader>
      <div>
        {logs?.length ? (
          <DataTableView data={logs} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No logs created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any logs yet. Start logging!.
            </EmptyPlaceholder.Description>
            <CreateButton
              variant="outline"
              href="/dashboard/manage/log/new"
              title="Create Log"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
