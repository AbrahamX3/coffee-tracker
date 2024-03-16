"use client";

import Link from "next/link";
import { buttonVariants, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

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
      {title}
    </Link>
  );
}
