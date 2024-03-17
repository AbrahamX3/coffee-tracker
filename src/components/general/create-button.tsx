"use client";

import Link from "next/link";
import { buttonVariants, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Icons } from "./icons";

interface CreateButtonProps extends ButtonProps {
  title: string;
  href: string;
}

export function CreateButton({
  className,
  variant,
  title,
  href,
}: CreateButtonProps) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant }), className)}>
      {title} <Icons.add className="ml-2 h-4 w-4" />
    </Link>
  );
}
