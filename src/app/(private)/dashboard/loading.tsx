import { Loader2Icon } from "lucide-react";
import { EmptyPlaceholder } from "~/components/general/empty-placeholder";

export default function Loading() {
  return (
    <main className="container">
      <EmptyPlaceholder className="flex h-full w-full flex-1">
        <EmptyPlaceholder.Icon name="ellipsis" />
        <EmptyPlaceholder.Title>
          <div className="flex items-center gap-x-4 align-middle">
            <Loader2Icon className="h-8 w-8 animate-spin" />
            <span className="animate-pulse text-3xl font-semibold">
              Loading data...
            </span>
          </div>
        </EmptyPlaceholder.Title>
      </EmptyPlaceholder>
    </main>
  );
}
