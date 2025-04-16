import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  Calendar,
  LayoutGrid,
  LucideIcon,
  BookIcon,
  User2,
  Box,
  DollarSign
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
    {
      groupLabel: "",
      menus: [
        {
          href: "/manajemen-peserta",
          label: "Manajemen Peserta",
          icon: User2,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          label: "Manajemen Aset",
          icon: Box,
          href: "/aset",
          submenus: [
            {
              label: "Aset Masuk",
              href: "/aset/masuk",
            },
            {
              label: "Aset Keluar",
              href: "/aset/keluar",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          label: "Manajemen Keuangan",
          icon: DollarSign,
          href: "/keuangan",
          submenus: [
            {
              label: "Transaksi Masuk",
              href: "/keuangan/masuk",
            },
            {
              label: "Transaksi Keluar",
              href: "/keuangan/keluar",
            },
            {
              label: "Admin Menu",
              href: "/keuangan/admin",
            },
          ],
        },
      ],
    }
  ];
}
