import { EmptyPlaceholder } from "~/components/general/empty-placeholder";

export default function Loading() {
  return (
    <main className="container">
      <EmptyPlaceholder className="h-full w-full">
        <EmptyPlaceholder.Icon name="circleSpinner" className="animate-spin" />
        <EmptyPlaceholder.Title>
          <span className="animate-pulse text-3xl font-semibold">
            Loading data...
          </span>
        </EmptyPlaceholder.Title>
      </EmptyPlaceholder>
    </main>
  );
}
