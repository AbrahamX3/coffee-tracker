"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { type ProcessGetAll } from "~/utils/schemas/process-schema";
import { Columns } from "./columns";

export function DataTableView({ data }: { data: ProcessGetAll }) {
  return <DataTable columns={Columns()} data={data} />;
}
