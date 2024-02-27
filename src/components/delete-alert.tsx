import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

interface DeleteAlertProps {
  title?: string;
  description?: string;
  isLoading?: boolean;
  deleteAction: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DeleteAlert({
  title = "Delete item",
  description = "Are you sure you want to delete this item?",
  deleteAction,
  isLoading = false,
  isOpen = false,
  setIsOpen,
}: DeleteAlertProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={deleteAction}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
