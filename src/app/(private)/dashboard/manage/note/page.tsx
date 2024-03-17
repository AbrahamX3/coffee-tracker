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

export default async function Notes() {
  noStore();

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions.pages?.signIn ?? "/api/auth/signin");
  }

  const notes = await api.note.getAll.query();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Logs"
        icon="note"
        text="Create and manage notes"
      >
        <CreateButton href="/dashboard/manage/note/new" title="Create Note" />
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
              href="/dashboard/manage/note/new"
              title="Create Note"
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
