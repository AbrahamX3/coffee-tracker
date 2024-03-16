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
  title: "Manage Notes",
};

export default async function Varietal() {
  noStore();

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const varietals = await api.varietal.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Varietals" text="Create and manage varietals">
        <CreateButton
          href="/dashboard/manage/varietal/new"
          title="Create Varietal"
        />
      </DashboardHeader>
      <div className="w-full">
        {varietals?.length ? (
          <DataTableView data={varietals} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>
              No varietals created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any varietals yet.
            </EmptyPlaceholder.Description>
            <CreateButton
              variant="outline"
              href="/dashboard/manage/varietal/new"
              title="Create Varietal"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
