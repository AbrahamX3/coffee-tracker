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
      id: "statistics",
      title: "Statistics",
      href: "/dashboard/manage",
      icon: "statistics",
    },
    {
      id: "logs",
      title: "Logs",
      href: "/dashboard/manage/log",
      icon: "log",
    },
    {
      id: "coffees",
      title: "Coffees",
      href: "/dashboard/manage/coffee",
      icon: "coffee",
    },
    {
      id: "varietals",
      title: "Varietals",
      href: "/dashboard/manage/varietal",
      icon: "varietal",
    },
    {
      id: "notes",
      title: "Notes",
      href: "/dashboard/manage/note",
      icon: "note",
    },
    {
      id: "processes",
      title: "Processes",
      href: "/dashboard/manage/process",
      icon: "process",
    },
    {
      id: "roasters",
      title: "Roasters",
      href: "/dashboard/manage/roaster",
      icon: "roaster",
    },
  ],
};
