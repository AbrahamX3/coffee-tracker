import { SiteFooter } from "~/components/general/footer";
import { PublicDashboardNav } from "~/components/general/public-dashboard-nav";
import { Analytics } from "@vercel/analytics/react";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <PublicDashboardNav />
        </div>
      </header>
      {children}
      <SiteFooter className="border-t" />
      <Analytics />
    </div>
  );
}
