"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { Columns, type CoffeeColumn } from "./columns";

export function DataTableView({ data }: { data: CoffeeColumn[] }) {
  return <DataTable columns={Columns()} data={data} />;
}
