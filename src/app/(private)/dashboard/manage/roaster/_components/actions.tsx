"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteAlert } from "~/components/general/delete-alert";
import { Button } from "~/components/ui/button";
import { type DataTableRowActionsProps } from "~/components/ui/datatable/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";
import { type RoasterDataTableColumn } from "~/utils/schemas/roaster-schema";

export function Actions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const utils = api.useUtils();
  const task = row.original as RoasterDataTableColumn;

  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isLoading } = api.roaster.delete.useMutation({
    onSuccess: async () => {
      toast.success("Successfully deleted");
      await utils.roaster.getAll.invalidate();
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
            onClick={() => router.push(`/dashboard/manage/roaster/${task.id}`)}
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
