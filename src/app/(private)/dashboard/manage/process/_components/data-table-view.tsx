"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { Columns, type ProcessColumn } from "./columns";

export function DataTableView({ data }: { data: ProcessColumn[] }) {
  return <DataTable columns={Columns()} data={data} />;
}
