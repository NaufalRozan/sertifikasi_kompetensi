import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  Calendar,
  LayoutGrid,
  LucideIcon,
  BookIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/program",
          label: "Program",
          icon: Calendar,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/manajemen-sertifikasi",
          label: "Manajemen Sertifikasi",
          icon: BookIcon,
          submenus: []
        }
      ]
    },
  ];
}
