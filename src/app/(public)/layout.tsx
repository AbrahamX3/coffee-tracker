import "~/styles/globals.css";

import "@fontsource-variable/alexandria";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { SiteFooter } from "~/components/footer";
import { getCurrentUser } from "~/lib/session";
import { MainNav } from "./_components/nav";

export const metadata: Metadata = {
  title: {
    default: "Coffee Tracker - Dashboard",
    template: "Coffee Tracker - %s",
  },
  description: "Coffee Tracker - Dashboard",
  icons: [{ rel: "icon", url: "/icon.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/api/auth/signin");
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
        </div>
      </header>
      {children}
      <SiteFooter className="border-t" />
    </div>
  );
}
