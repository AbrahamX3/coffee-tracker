import { SidebarNav } from "~/components/nav";
import { dashboardConfig } from "~/config/dashoard";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container grid flex-1 gap-4 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col rounded-md border p-4 md:flex">
        <SidebarNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden rounded-md border p-4">
        {children}
      </main>
    </div>
  );
}
