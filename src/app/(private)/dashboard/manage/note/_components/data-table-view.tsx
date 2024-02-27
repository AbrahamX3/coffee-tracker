"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { Columns, type NoteColumn } from "./columns";

export function DataTableView({ data }: { data: NoteColumn[] }) {
  return <DataTable columns={Columns()} data={data} />;
}
