"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/badge";
import { DataTableColumnHeader } from "~/components/ui/datatable/data-table-column-header";
import DataTableLabelId from "~/components/ui/datatable/data-table-label-id";
import { type FilterOptions } from "~/components/ui/datatable/data-table-toolbar";
import { Skeleton } from "~/components/ui/skeleton";
import { type LogDataTableColumn } from "~/utils/schemas/log-schema";
import { Actions } from "./actions";

export function Columns({ coffeeOptions }: { coffeeOptions: FilterOptions[] }) {
  const columns: ColumnDef<LogDataTableColumn>[] = [
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
      id: "Coffee",
      accessorFn: (row) => row.coffeeId,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Coffee" />
      ),
      cell: ({ row }) => {
        const coffee = coffeeOptions.find((coffee) => {
          return coffee.value === row.original.coffeeId;
        });

        if (!coffee?.value) {
          return <Skeleton className="h-6 w-36 rounded-full px-3 py-1" />;
        }

        return (
          <Badge
            variant="outline"
            className="flex w-fit max-w-[500px] px-3 py-1 align-middle"
          >
            <coffee.icon className="mr-2 h-4 w-4" />
            {coffee.label}
          </Badge>
        );
      },
      filterFn: (row, id: string, value: string) => {
        return value.includes(
          row.original.coffee.name ??
            `${row.original.coffee.roaster.name} - ${row.original.coffee.region}`,
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("date")}
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
