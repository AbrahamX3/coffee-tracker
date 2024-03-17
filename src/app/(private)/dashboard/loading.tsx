import { EmptyPlaceholder } from "~/components/general/empty-placeholder";

export default function Loading() {
  return (
    <main className="container">
      <EmptyPlaceholder className="flex h-full w-full flex-1">
        <EmptyPlaceholder.Icon name="circleSpinner" className="animate-spin" />
        <EmptyPlaceholder.Title>
          <span className="animate-pulse text-3xl font-semibold tracking-tight">
            Loading data...
          </span>
        </EmptyPlaceholder.Title>
      </EmptyPlaceholder>
    </main>
  );
}
