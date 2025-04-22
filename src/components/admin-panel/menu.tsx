"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { MouseEventHandler, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";

interface MenuProps {
  isOpen: boolean | undefined;
}

import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "@/constant/BaseURL";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { resetUser } from "@/lib/features/auth/authSlice";
import { permission } from "process";

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);
  const [isAsetExpanded, setIsAsetExpanded] = useState(false);
  const isAsetPath = pathname.startsWith("/aset");
  const [isKeuanganExpanded, setIsKeuanganExpanded] = useState(false);
  const isKeuanganPath = pathname.startsWith("/keuangan");
  const [isHrdExpanded, setIsHrdExpanded] = useState(false);
  const isHrdPath = pathname.startsWith("/hrd");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (!pathname.startsWith("/aset")) {
      setIsAsetExpanded(false);
    } else {
      setIsAsetExpanded(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (isKeuanganPath) {
      setIsKeuanganExpanded(true);
    } else {
      setIsKeuanganExpanded(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (isHrdPath) {
      setIsHrdExpanded(true);
    } else {
      setIsHrdExpanded(false);
    }
  }, [pathname]);

  const onSubmitSignOut: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      toast.loading("Logging out...");

      await axios.post(
        `http://localhost:5000/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(resetUser());

      toast.success("Logged out successfully");

      // Tunggu sejenak sebelum redirect agar toast muncul
      setTimeout(() => {
        router.push("/auth");
      }, 300);
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Error logging out. Please try again.");
    }
  };



  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-8 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                (active === undefined &&
                                  pathname.startsWith(href)) ||
                                  active
                                  ? "activeSidebar"
                                  : "ghost"
                              }
                              className="w-full justify-start h-10 mb-1"
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={pathname.startsWith(href)}
                        submenus={submenus}
                        isOpen={isOpen}
                        href={href}
                        expanded={
                          label === "Manajemen Aset"
                            ? isAsetExpanded
                            : label === "Manajemen Keuangan"
                              ? isKeuanganExpanded
                              : label === "Manajemen HRD"
                                ? isHrdExpanded
                                : false
                        }
                        setExpanded={
                          label === "Manajemen Aset"
                            ? setIsAsetExpanded
                            : label === "Manajemen Keuangan"
                              ? setIsKeuanganExpanded
                              : label === "Manajemen HRD"
                                ? setIsHrdExpanded
                                : () => { }
                        }
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onSubmitSignOut}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
