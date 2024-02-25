import { SidebarNav } from "~/components/nav";
import { dashboardConfig } from "~/config/dashoard";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside className="col-span-2 hidden flex-col md:flex">
        <SidebarNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="col-span-10 flex w-full flex-1 flex-col">
        {children}
      </main>
    </>
  );
}
