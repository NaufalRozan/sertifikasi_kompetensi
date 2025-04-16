"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CollapseMenuButtonProps {
  label: string;
  icon: React.ElementType;
  submenus: { href: string; label: string }[];
  active?: boolean;
  isOpen?: boolean;
  href?: string;
  expanded: boolean;
  setExpanded: (val: boolean) => void;
}

export const CollapseMenuButton = ({
  label,
  icon: Icon,
  submenus,
  active,
  isOpen,
  href,
  expanded,
  setExpanded,
}: CollapseMenuButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (href) router.push(href);
    setExpanded(!expanded);
  };

  return (
    <div className="w-full">
      {/* Button utama */}
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition",
          active ? "bg-red-700 text-accent hover:bg-red-800" : "hover:bg-accent"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          {isOpen && <span>{label}</span>}
        </div>
        {isOpen && (
          <ChevronDown
            className={cn("transition-transform", expanded && "rotate-180")}
            size={16}
          />
        )}
      </button>

      {/* Submenu */}
      {expanded && (
        <div className="pl-8 mt-1 space-y-1">
          {isOpen && submenus.map((submenu, idx) => {
            const isActive = pathname === submenu.href;
            return (
              <Link
                key={idx}
                href={submenu.href}
                className={cn(
                  "block text-sm px-3 py-1 rounded transition",
                  isActive
                    ? "text-red-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {submenu.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
