"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { Columns, type VarietalColumn } from "./columns";

export function DataTableView({ data }: { data: VarietalColumn[] }) {
  return <DataTable columns={Columns()} data={data} />;
}
