"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type z } from "zod";

import { DataTableColumnHeader } from "~/components/ui/datatable/data-table-column-header";
import DataTableLabelId from "~/components/ui/datatable/data-table-label-id";
import { type VarietalSelectSchema } from "~/server/db/schema";
import { Actions } from "./actions";

export type VarietalColumn = z.infer<typeof VarietalSelectSchema>;

export function Columns() {
  const columns: ColumnDef<VarietalColumn>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Id" />
      ),
      cell: ({ row }) => {
        return <DataTableLabelId id={row.getValue("id")} />;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <span className="max-w-[50px] truncate font-medium">
            {row.getValue("name")}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="sr-only hidden">Actions</div>,
      cell: ({ row }) => {
        return <Actions row={row} />;
      },
    },
  ];

  return columns;
}
