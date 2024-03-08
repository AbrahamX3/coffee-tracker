import { Loader2Icon } from "lucide-react";

export default function loading() {
  return (
    <div className="flex h-full w-full items-center justify-center align-middle">
      <div className="flex items-center gap-x-4 align-middle">
        <Loader2Icon className="h-8 w-8 animate-spin" />
        <span className="animate-pulse text-3xl font-semibold">
          Loading data...
        </span>
      </div>
    </div>
  );
}
