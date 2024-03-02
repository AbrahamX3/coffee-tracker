import { unstable_noStore as noStore } from "next/cache";
import { CreateButton } from "~/components/create-button";
import { DashboardHeader } from "~/components/dashboard-header";
import { EmptyPlaceholder } from "~/components/empty-placeholder";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { DataTableView } from "./_components/data-table-view";

export const metadata = {
  title: "Manage Coffees",
};

export default async function Coffees() {
  noStore();
  const coffees = await api.coffee.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Coffees" text="Create and manage coffees">
        <CreateButton
          href="/dashboard/manage/coffee/create"
          title="Create Coffee"
        />
      </DashboardHeader>
      <div className="w-full">
        {coffees?.length ? (
          <DataTableView data={coffees} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No roasters created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any roasters yet.
            </EmptyPlaceholder.Description>
            <CreateButton
              variant="outline"
              href="/dashboard/manage/coffee/create"
              title="Create Coffee"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
