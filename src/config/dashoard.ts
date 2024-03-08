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
      id: "stats",
      title: "Stats",
      href: "/dashboard/manage",
      icon: "settings",
    },
    {
      id: "logs",
      title: "Logs",
      href: "/dashboard/manage/log",
      icon: "post",
    },
    {
      id: "coffees",
      title: "Coffees",
      href: "/dashboard/manage/coffee",
      icon: "settings",
    },
    {
      id: "varietals",
      title: "Varietals",
      href: "/dashboard/manage/varietal",
      icon: "settings",
    },
    {
      id: "notes",
      title: "Notes",
      href: "/dashboard/manage/note",
      icon: "settings",
    },
    {
      id: "processes",
      title: "Processes",
      href: "/dashboard/manage/process",
      icon: "settings",
    },
    {
      id: "roasters",
      title: "Roasters",
      href: "/dashboard/manage/roaster",
      icon: "settings",
    },
  ],
};
