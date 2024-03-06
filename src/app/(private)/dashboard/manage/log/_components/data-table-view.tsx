"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { CoffeeIcon } from "lucide-react";
import { api } from "~/trpc/react";
import { type LogGetAll } from "~/utils/schemas/log-schema";
import { Columns } from "./columns";

export function DataTableView({ data }: { data: LogGetAll }) {
  const coffee = api.coffee.getAll.useQuery().data?.map((coffee) => ({
    value: coffee.id,
    label: coffee.name ?? `${coffee.roaster.name} - ${coffee.region}`,
    icon: CoffeeIcon,
  }));

  return (
    <DataTable
      filters={[
        {
          columnId: "Coffee",
          title: "Coffee",
          options: coffee ?? [],
        },
      ]}
      columns={Columns({
        coffeeOptions: coffee ?? [],
      })}
      data={data}
    />
  );
}
