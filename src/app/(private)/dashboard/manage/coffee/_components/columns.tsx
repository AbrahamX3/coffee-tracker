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
  statusOptions,
}: {
  roasterOptions: FilterOptions[];
  statusOptions: FilterOptions[];
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
      accessorFn: (row) =>
        row.name ?? `${row.region} - ${row.estate ? row.estate : row.country} `,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.name
                ? row.original.name
                : `${row.original.region} - ${row.original.estate ? row.original.estate : row.original.country} `}
            </span>
          </div>
        );
      },
    },

    {
      id: "Roaster",
      accessorKey: "Roaster",
      accessorFn: (row) => row.roaster.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Roaster" />
      ),
      cell: ({ row }) => {
        const roaster = roasterOptions.find((roaster) => {
          return roaster.label === row.original.roaster.name;
        });

        if (!roaster?.value) {
          return <Skeleton className="h-6 w-36 rounded-full px-3 py-1" />;
        }

        return (
          <Badge
            variant="outline"
            className="flex w-max px-3 py-1 align-middle"
          >
            <roaster.icon className="mr-2 h-4 w-4" />
            {roaster.label}
          </Badge>
        );
      },
      filterFn: (row, id: string, value: string) => {
        return value.includes(row.getValue(id));
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
      accessorKey: "country",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Country" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("country")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "sca",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="SCA" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("sca") !== 0 ? row.getValue("sca") : "N/A"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "personal_sca",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Personal SCA" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("sca") !== 0 ? row.getValue("sca") : "N/A"}
            </span>
          </div>
        );
      },
    },
    {
      id: "Notes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Notes" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.notes.map((note) => note.note.name).join(", ")}
            </span>
          </div>
        );
      },
    },
    {
      id: "Varietals",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Varietals" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.varietals
                .map((varietal) => varietal.varietal.name)
                .join(", ")}
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
      id: "Status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      accessorFn: (row) => (row.active ? "enabled" : "disabled"),
      cell: ({ row }) => {
        const status = statusOptions.find((status) => {
          return (
            status.value === (row.original.active ? "enabled" : "disabled")
          );
        });

        if (!status?.value) {
          return <Skeleton className="h-6 w-36 rounded-full px-3 py-1" />;
        }

        if (status.value === "enabled") {
          return (
            <Badge
              variant="success"
              className="flex w-fit px-3 py-1 align-middle"
            >
              <status.icon className="mr-2 h-4 w-4" />
              {status.label}
            </Badge>
          );
        }
        if (status.value === "disabled") {
          return (
            <Badge
              variant="destructive"
              className="flex w-fit px-3 py-1 align-middle"
            >
              <status.icon className="mr-2 h-4 w-4" />
              {status.label}
            </Badge>
          );
        }
      },
      filterFn: (row, id: string, value: string) => {
        return value.includes(row.original.active ? "enabled" : "disabled");
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
