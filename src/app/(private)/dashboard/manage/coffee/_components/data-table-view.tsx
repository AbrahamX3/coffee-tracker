"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { User2Icon } from "lucide-react";
import { api } from "~/trpc/react";
import { type CoffeeGetAll } from "~/utils/schemas/coffee-schema";
import { Columns } from "./columns";

export function DataTableView({ data }: { data: CoffeeGetAll }) {
  const roasters = api.roaster.getAll.useQuery().data?.flatMap((roaster) => ({
    value: roaster.id,
    label: roaster.name,
    icon: User2Icon,
  }));

  return (
    <DataTable
      filters={[
        {
          columnId: "Roaster",
          title: "Roaster",
          options: roasters ?? [],
        },
      ]}
      columns={Columns({
        roasterOptions: roasters ?? [],
      })}
      data={data}
    />
  );
}
