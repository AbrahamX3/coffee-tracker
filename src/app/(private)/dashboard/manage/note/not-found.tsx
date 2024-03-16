import { CreateButton } from "~/components/general/create-button";
import { EmptyPlaceholder } from "~/components/general/empty-placeholder";

export default function NotFound() {
  return (
    <EmptyPlaceholder className="h-full w-full">
      <EmptyPlaceholder.Icon name="post" />
      <EmptyPlaceholder.Title>Not Found</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        This note does not exist.
      </EmptyPlaceholder.Description>
      <CreateButton
        variant="outline"
        href="/dashboard/manage/note/new"
        title="Create Note"
      />
    </EmptyPlaceholder>
  );
}
