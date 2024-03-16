"use client";

import Link from "next/link";

import { Icons } from "~/components/general/icons";

export function PublicDashboardNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo />
        <span className="font-bold">Coffee Tracker</span>
      </Link>
    </div>
  );
}
