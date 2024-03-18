"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { FlameIcon } from "lucide-react";
import { StatusFilter } from "~/lib/constants";
import { api } from "~/trpc/react";
import { type CoffeeGetAll } from "~/utils/schemas/coffee-schema";
import { Columns } from "./columns";

export function DataTableView({ data }: { data: CoffeeGetAll }) {
  const roasters = api.roaster.getAll.useQuery().data?.map((roaster) => ({
    value: roaster.name,
    label: roaster.name,
    icon: FlameIcon,
  }));

  return (
    <DataTable
      filters={[
        {
          columnId: "Roaster",
          title: "Roaster",
          options: roasters ?? [],
        },
        {
          columnId: "Status",
          title: "Status",
          options: StatusFilter,
        },
      ]}
      columns={Columns({
        roasterOptions: roasters ?? [],
        statusOptions: StatusFilter,
      })}
      data={data}
    />
  );
}
