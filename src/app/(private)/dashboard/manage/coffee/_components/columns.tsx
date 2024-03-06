"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { DataTableColumnHeader } from "~/components/ui/datatable/data-table-column-header";
import DataTableLabelId from "~/components/ui/datatable/data-table-label-id";
import { type FilterOptions } from "~/components/ui/datatable/data-table-toolbar";
import { Skeleton } from "~/components/ui/skeleton";
import { type CoffeeDataTableColumn } from "~/utils/schemas/coffee-schema";
import { Actions } from "./actions";

export function Columns({
  roasterOptions,
}: {
  roasterOptions: FilterOptions[];
}) {
  const columns: ColumnDef<CoffeeDataTableColumn>[] = [
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
      id: "Roaster",
      accessorFn: (row) => row.roasterId,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Roaster" />
      ),
      cell: ({ row }) => {
        const roaster = roasterOptions.find((roaster) => {
          return roaster.value === row.original.roasterId;
        });

        if (!roaster?.value) {
          return <Skeleton className="h-6 w-36 rounded-full px-3 py-1" />;
        }

        return (
          <Badge
            variant="outline"
            className="flex w-fit max-w-[500px] px-3 py-1 align-middle"
          >
            <roaster.icon className="mr-2 h-4 w-4" />
            {roaster.label}
          </Badge>
        );
      },
      filterFn: (row, id: string, value: string) => {
        return value.includes(row.original.roaster.name);
      },
    },
    {
      accessorKey: "score",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Score" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("score") !== 0 ? row.getValue("score") : "N/A"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "region",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Region" />
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
      header: () => <span className="sr-only hidden">Actions</span>,
      cell: ({ row }) => {
        return <Actions row={row} />;
      },
    },
  ];

  return columns;
}
