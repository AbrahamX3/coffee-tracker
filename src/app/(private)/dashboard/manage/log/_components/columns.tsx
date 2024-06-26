"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
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
      accessorFn: (row) => {
        return (
          row.coffee.name ?? `${row.coffee.roaster.name} - ${row.coffee.region}`
        );
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Coffee" />
      ),
      cell: ({ row }) => {
        const label =
          row.original.coffee.name ??
          `${row.original.coffee.roaster.name} - ${row.original.coffee.region}`;

        const coffee = coffeeOptions.find((coffee) => {
          return coffee.value === label;
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
        const label =
          row.original.coffee.name ??
          `${row.original.coffee.roaster.name} - ${row.original.coffee.region}`;

        return value.includes(label);
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        const date = toZonedTime(
          row.getValue("date"),
          Intl.DateTimeFormat().resolvedOptions().timeZone,
        );

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {format(date, "MMM d, yyyy")}
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
