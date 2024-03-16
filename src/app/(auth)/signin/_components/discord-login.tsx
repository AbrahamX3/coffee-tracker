"use client";

import { signIn } from "next-auth/react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function DiscordLogin() {
  return (
    <div className="flex w-full justify-center gap-4">
      <button
        className={cn(buttonVariants(), "w-full")}
        onClick={() => signIn("discord")}
      >
        Sign in with Discord
      </button>
    </div>
  );
}
