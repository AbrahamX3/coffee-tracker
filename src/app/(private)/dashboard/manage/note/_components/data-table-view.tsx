"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { type NoteGetAll } from "~/utils/schemas/note-schema";
import { Columns } from "./columns";

export function DataTableView({ data }: { data: NoteGetAll }) {
  return <DataTable columns={Columns()} data={data} />;
}
