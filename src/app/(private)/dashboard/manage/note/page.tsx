import { unstable_noStore as noStore } from "next/cache";
import { CreateButton } from "~/components/create-button";
import { DashboardHeader } from "~/components/dashboard-header";
import { EmptyPlaceholder } from "~/components/empty-placeholder";
import { DashboardShell } from "~/components/shell";
import { api } from "~/trpc/server";
import { DataTableView } from "./_components/data-table-view";

export const metadata = {
  title: "Manage Notes",
};

export default async function Notes() {
  noStore();
  const notes = await api.note.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Logs" text="Create and manage notes">
        <CreateButton
          href="/dashboard/manage/note/create"
          title="Create Note"
        />
      </DashboardHeader>
      <div className="w-full">
        {notes?.length ? (
          <DataTableView data={notes} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No notes created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any notes yet.
            </EmptyPlaceholder.Description>
            <CreateButton
              variant="outline"
              href="/dashboard/manage/note/create"
              title="Create Note"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
