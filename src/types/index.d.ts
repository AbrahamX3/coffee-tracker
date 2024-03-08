import { type Icons } from "~/components/icons";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface NavProps {
  items: NavItem[];
  children?: React.ReactNode;
}

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  id: string;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href: string;
      items: LinkProps[];
    }
);
