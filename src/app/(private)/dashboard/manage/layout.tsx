import { SidebarNav } from "~/components/general/sidebar-nav";
import { dashboardConfig } from "~/config/dashoard";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container grid flex-1 gap-4 md:grid-cols-[200px_1fr]">
      <aside className="flex w-full flex-col rounded-md border p-4 md:w-[200px]">
        <SidebarNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="flex h-full w-full flex-1 flex-col overflow-hidden rounded-md border p-4">
        {children}
      </main>
    </div>
  );
}
