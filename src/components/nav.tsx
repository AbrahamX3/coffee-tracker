"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "~/components/icons";
import { cn } from "~/lib/utils";
import { type SidebarNavItem } from "~/types";

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid grid-cols-3 items-start gap-2 sm:grid-cols-4 md:grid-cols-1">
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "arrowRight"];

        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground md:justify-start",
                  path === item.href ||
                    path.includes(`${item.href}/create`) ||
                    (Number.isInteger(Number(path.split("/").pop())) &&
                      path.includes(`${item.href}/${path.split("/").pop()}`))
                    ? "bg-accent"
                    : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="hidden h-4 w-4 md:mr-2 md:inline-block" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
