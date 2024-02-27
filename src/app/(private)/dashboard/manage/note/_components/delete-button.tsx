"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface DeleteProps {
  id: number;
}

export default function DeleteButton({ id }: DeleteProps) {
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate, isLoading } = api.note.delete.useMutation({
    onSuccess: async () => {
      toast.success("Successfully deleted");
      await utils.note.getAll.invalidate();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button
      onClick={() => mutate({ id })}
      disabled={isLoading}
      variant="destructive"
      size="icon"
    >
      <Icons.trash className="h-4 w-4" />
    </Button>
  );
}
