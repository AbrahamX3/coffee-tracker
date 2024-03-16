"use client";

import { DataTable } from "~/components/ui/datatable/data-table";

import { type VarietalGetAll } from "~/utils/schemas/varietal-schema";
import { Columns } from "./columns";

export function DataTableView({ data }: { data: VarietalGetAll }) {
  return <DataTable columns={Columns()} data={data} />;
}
