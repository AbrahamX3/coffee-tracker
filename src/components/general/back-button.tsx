import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Icons } from "./icons";

interface BackButton {
  href: string;
  className?: string;
}

export default function BackButton({ href, className }: BackButton) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "outline" }), className)}
    >
      <Icons.chevronLeft className="mr-2 h-4 w-4" />
      Back
    </Link>
  );
}
