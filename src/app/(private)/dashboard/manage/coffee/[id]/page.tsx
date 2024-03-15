import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { DashboardHeader } from "~/components/dashboard-header";
import FormShell from "~/components/form-shell";
import { DashboardShell } from "~/components/shell";
import { buttonVariants } from "~/components/ui/button";
import { api } from "~/trpc/server";
import { UpdateForm } from "../_components/update-form";

export const metadata = {
  title: "Update Coffee",
};

export default async function Update({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);

  const data = await api.coffee.getById.query({ id });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Update Coffee"
        text="Update an existing roaster"
      >
        <Link
          href="/dashboard/manage/coffee"
          className={buttonVariants({ variant: "outline" })}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Link>
      </DashboardHeader>
      <FormShell>
        <UpdateForm data={data} />
      </FormShell>
    </DashboardShell>
  );
}
