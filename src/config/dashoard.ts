import { type DashboardConfig } from "~/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Manage Catalogs",
      href: "/dashboard/manage",
    },
  ],
  sidebarNav: [
    {
      title: "Logs",
      href: "/dashboard/manage/log",
      icon: "post",
    },
    {
      title: "Coffees",
      href: "/dashboard/manage/coffee",
      icon: "settings",
    },
    {
      title: "Varietals",
      href: "/dashboard/manage/varietal",
      icon: "settings",
    },
    {
      title: "Notes",
      href: "/dashboard/manage/note",
      icon: "settings",
    },
    {
      title: "Roasters",
      href: "/dashboard/manage/roaster",
      icon: "settings",
    },
  ],
};
