import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/session";
import { Providers } from "./_components/providers";

import Link from "next/link";
import { Icons } from "~/components/general/icons";

export const metadata = {
  title: "Sign in",
};

export default async function AuthSignIn() {
  const user = await getCurrentUser();

  if (user) {
    return redirect("/dashboard");
  }

  const providers = await getProviders();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-sm space-y-4 rounded-md bg-card p-4 text-card-foreground shadow-sm">
        <div className="flex items-center justify-center gap-4 rounded-md border-2 border-dashed p-4">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-8 w-8" />
            <span className="text-lg font-bold">Coffee Tracker</span>
          </Link>
        </div>

        <div className="rounded-md border-2 border-dashed p-4">
          <div className="space-y-2 pb-6">
            <p className="text-xl font-bold">Login</p>
            <p className="text-sm text-foreground">
              Sign in with one of the following providers
            </p>
          </div>
          <Providers providers={providers} />
        </div>
      </div>
    </main>
  );
}