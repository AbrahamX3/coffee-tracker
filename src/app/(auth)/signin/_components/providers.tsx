"use client";

import { type BuiltInProviderType } from "next-auth/providers/index";
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion,
} from "next-auth/react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ProviderProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

export function Providers({ providers }: ProviderProps) {
  return (
    <div className="flex w-full justify-center gap-4">
      {providers
        ? Object.values(providers)?.map((provider) => (
            <button
              key={provider.name}
              className={cn(buttonVariants(), "w-full")}
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          ))
        : null}
    </div>
  );
}
