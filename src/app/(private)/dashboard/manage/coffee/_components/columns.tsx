"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "~/components/ui/datatable/data-table-column-header";
import DataTableLabelId from "~/components/ui/datatable/data-table-label-id";
import { type Coffee } from "~/server/db/schema";
import { Actions } from "./actions";

export type CoffeeColumn = Coffee<"notes" | "roaster" | "varietals">;

export function Columns() {
  const columns: ColumnDef<CoffeeColumn>[] = [
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
      accessorKey: "region",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("region")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "roast",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Roast" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("roast")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "altitude",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Altitude" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("altitude")}
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
