"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type z } from "zod";

import { DataTableColumnHeader } from "~/components/ui/datatable/data-table-column-header";
import DataTableLabelId from "~/components/ui/datatable/data-table-label-id";
import { type RoasterSelectSchema } from "~/server/db/schema";
import { Actions } from "./actions";

export type RoasterColumn = z.infer<typeof RoasterSelectSchema>;

export function Columns() {
  const columns: ColumnDef<RoasterColumn>[] = [
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
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "instagram",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Instagram" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("instagram")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "website",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Website" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("website")}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return <Actions row={row} />;
      },
    },
  ];

  return columns;
}
