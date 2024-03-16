import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Icons } from "~/components/general/icons";
import { getCurrentUser } from "~/lib/session";
import { DiscordLogin } from "./_components/discord-login";

export const metadata = {
  title: "Sign in",
};

export default async function AuthSignIn() {
  noStore();

  const user = await getCurrentUser();

  if (user) {
    return redirect("/dashboard");
  }

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
          <DiscordLogin />
        </div>
      </div>
    </main>
  );
}
