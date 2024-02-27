"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { Columns, type RoasterColumn } from "./columns";

export function DataTableView({ data }: { data: RoasterColumn[] }) {
  return <DataTable columns={Columns()} data={data} />;
}
