"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { buttonVariants } from "~/components/ui/button";
import { DataTableColumnHeader } from "~/components/ui/datatable/data-table-column-header";
import DataTableLabelId from "~/components/ui/datatable/data-table-label-id";
import { cn } from "~/lib/utils";
import { type RoasterDataTableColumn } from "~/utils/schemas/roaster-schema";
import { Actions } from "./actions";

export function Columns() {
  const columns: ColumnDef<RoasterDataTableColumn>[] = [
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
        if (!row.getValue("instagram")) {
          return null;
        }

        return (
          <div className="flex space-x-2">
            <a
              target="_blank"
              rel="noreferrer"
              href={row.getValue("instagram")}
              className={cn(
                buttonVariants({ variant: "link" }),
                "font-medium tracking-tight",
              )}
            >
              {row.getValue("instagram")}
            </a>
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
        if (!row.getValue("website")) {
          return null;
        }

        return (
          <a
            target="_blank"
            rel="noreferrer"
            href={row.getValue("website")}
            className={cn(
              buttonVariants({ variant: "link" }),
              "font-medium tracking-tight",
            )}
          >
            {row.getValue("website")}
          </a>
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
