import "~/styles/globals.css";

import "@fontsource-variable/alexandria";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { SiteFooter } from "~/components/footer";
import { MainNav } from "~/components/main-nav";
import { UserAccountNav } from "~/components/user-account-nav";
import { dashboardConfig } from "~/config/dashoard";
import { getCurrentUser } from "~/lib/session";

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
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      {children}
      <SiteFooter className="border-t" />
    </div>
  );
}
