import { unstable_noStore as noStore } from "next/cache";
import { CreateButton } from "~/components/create-button";
import { DashboardHeader } from "~/components/dashboard-header";
import { EmptyPlaceholder } from "~/components/empty-placeholder";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Manage Notes",
};

export default async function Varietal() {
  noStore();
  const varietals = await api.varietal.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Varietals" text="Create and manage varietals">
        <CreateButton
          href="/dashboard/manage/varietal/create"
          title="Create Varietal"
        />
      </DashboardHeader>
      <div>
        {varietals?.length ? (
          <div className="flex flex-col rounded-md border p-4">
            {varietals.map((varietal) => (
              <div key={varietal.id}>{varietal.name}</div>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No varietal created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any varietals yet.
            </EmptyPlaceholder.Description>
            <CreateButton
              variant="outline"
              href="/dashboard/manage/varietal/create"
              title="Create Varietal"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
