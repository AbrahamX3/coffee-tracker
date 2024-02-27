"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteAlert } from "~/components/delete-alert";
import { Button } from "~/components/ui/button";
import { type DataTableRowActionsProps } from "~/components/ui/datatable/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { VarietalSelectSchema } from "~/server/db/schema";
import { api } from "~/trpc/react";

export function Actions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const utils = api.useUtils();
  const task = VarietalSelectSchema.parse(row.original);

  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isLoading } = api.varietal.delete.useMutation({
    onSuccess: async () => {
      toast.success("Successfully deleted");
      await utils.varietal.getAll.invalidate();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/manage/varietal/${task.id}`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlert
        isLoading={isLoading}
        setIsOpen={setIsOpen}
        deleteAction={() => mutate({ id: task.id })}
        isOpen={isOpen}
      />
    </div>
  );
}
