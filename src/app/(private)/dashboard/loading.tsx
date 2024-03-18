import { EmptyPlaceholder } from "~/components/general/empty-placeholder";

export default function Loading() {
  return (
    <main className="container flex flex-1 flex-col">
      <EmptyPlaceholder className="flex flex-1 flex-col">
        <EmptyPlaceholder.Icon name="circleSpinner" className="animate-spin" />
        <EmptyPlaceholder.Title>
          <span className="animate-pulse text-3xl font-semibold">
            Loading statistics...
          </span>
        </EmptyPlaceholder.Title>
      </EmptyPlaceholder>
    </main>
  );
}
