import { unstable_noStore as noStore } from "next/cache";
import { CreateButton } from "~/components/create-button";
import { DashboardHeader } from "~/components/dashboard-header";
import { EmptyPlaceholder } from "~/components/empty-placeholder";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Manage Logs",
};

export default async function Logs() {
  noStore();
  const logs = await api.log.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Logs" text="Create and manage logs">
        <CreateButton href="/dashboard/manage/log/create" title="Create Log" />
      </DashboardHeader>
      <div>
        {logs?.length ? (
          <div className="divide-y divide-border rounded-md border">logs</div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No logs created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any logs yet. Start logging!.
            </EmptyPlaceholder.Description>
            <CreateButton
              variant="outline"
              href="/dashboard/manage/log/create"
              title="Create Log"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
