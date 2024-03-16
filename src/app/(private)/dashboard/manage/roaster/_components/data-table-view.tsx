"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { type RoasterGetAll } from "~/utils/schemas/roaster-schema";
import { Columns } from "./columns";

export function DataTableView({ data }: { data: RoasterGetAll }) {
  return <DataTable columns={Columns()} data={data} />;
}
