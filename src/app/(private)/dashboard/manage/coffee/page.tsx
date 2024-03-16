import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CreateButton } from "~/components/general/create-button";
import { DashboardHeader } from "~/components/general/dashboard-header";
import { EmptyPlaceholder } from "~/components/general/empty-placeholder";
import { DashboardShell } from "~/components/general/shell";
import { getCurrentUser } from "~/lib/session";
import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";
import { DataTableView } from "./_components/data-table-view";

export const metadata = {
  title: "Manage Coffees",
};

export default async function Coffees() {
  noStore();

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const coffees = await api.coffee.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Coffees" text="Create and manage coffees">
        <CreateButton
          href="/dashboard/manage/coffee/new"
          title="Create Coffee"
        />
      </DashboardHeader>
      <div className="w-full">
        {coffees?.length ? (
          <Suspense fallback={"Loading..."}>
            <DataTableView data={coffees} />
          </Suspense>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No coffees created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any coffees yet.
            </EmptyPlaceholder.Description>
            <CreateButton
              variant="outline"
              href="/dashboard/manage/coffee/new"
              title="Create Coffee"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
