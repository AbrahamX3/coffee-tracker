"use client";

import Link from "next/link";

import { Icons } from "~/components/icons";

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">Coffee Tracker</span>
      </Link>
    </div>
  );
}