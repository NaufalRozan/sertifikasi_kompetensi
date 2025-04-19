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
  DollarSign,
  Building2
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
          label: "Manajemen HRD",
          icon: Users,
          href: "/hrd",
          submenus: [
            {
              label: "Manajemen Peserta",
              href: "/hrd/manajemen-peserta",
            },
            {
              label: "Manajemen Trainer",
              href: "/hrd/manajemen-trainer",
            },
            {
              label: "Manajemen Pengurus",
              href: "/hrd/manajemen-pengurus",
            },
            {
              label: "Manajemen Struktur",
              href: "/hrd/manajemen-struktur",
            },
            {
              label: "Manajemen Asessor",
              href: "/hrd/manajemen-asessor",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/vendor",
          label: "Manajemen Vendor",
          icon: Building2,
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
              label: "Cashflow",
              href: "/keuangan/cashflow",
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
