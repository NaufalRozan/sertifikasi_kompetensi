"use client";

import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { cn } from "@/lib/utils";
import {
  ScrollArea,
} from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;

  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  const collapsed = !getOpenState();

  return (
    <>
      {/* MOBILE SIDEBAR (SLIDE) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <PanelsTopLeft className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SidebarContent collapsed={false} isSheet />
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={cn(
          "hidden lg:flex fixed top-0 left-0 z-30 h-screen transition-all duration-300 ease-in-out bg-background shadow-md dark:shadow-zinc-800",
          getOpenState() ? "w-72" : "w-[90px]",
          settings.disabled && "hidden"
        )}
      >
        <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
        <SidebarContent collapsed={collapsed} />
      </aside>
    </>
  );
}

function SidebarContent({
  collapsed,
  isSheet = false,
}: {
  collapsed: boolean;
  isSheet?: boolean;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;

  const { setIsHover } = sidebar;

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex flex-col h-full w-full"
    >
      {/* Header Title */}
      <div className="flex items-center justify-center w-full px-4 py-6">
        {!collapsed && (
          <div className="leading-tight">
            <div className="font-bold text-black text-[20px] text-left">Sertifikasi</div>
            <div className="font-bold italic text-[20px] text-[#A94442] pl-6">Kompetensi</div>
          </div>
        )}
      </div>


      {/* Menu Scrollable Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-2 pb-4">
          <Menu isOpen={!collapsed} />
        </ScrollArea>
      </div>
    </div>
  );
}
