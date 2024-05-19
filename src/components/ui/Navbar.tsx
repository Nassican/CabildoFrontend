"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";
import dynamic from "next/dynamic";
import { ModeToggle } from "./ThemeToggleButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarMenu } from "../Sidebar/SideBar";
import { LogOut, Menu, MountainIcon, User } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white dark:bg-background dark:text-white text-sm py-4 dark:border-gray-600 border-b border-gray-600">
      <nav
        className="max-w-full w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger className="text-slate-700 mt-2 dark:text-white">
                  <Menu />
                </SheetTrigger>
                <SheetContent side={"left"} className="w-[300px] sm:w-[340px]">
                  <SheetHeader>
                    <SheetTitle className="text-left text-xl font-bold ml-3 text-black dark:text-slate-100">
                      Menu
                    </SheetTitle>
                    <div>
                      <SidebarMenu />
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <MountainIcon className="h-8 w-8 mr-2 ml-2 text-black dark:text-white" />
            <a
              className="flex-none text-xl font-semibold text-black dark:text-white"
              href="/dashboard"
            >
              Cabildo
            </a>
          </div>
          <div className="flex items-center gap-2">
            {session?.user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <span>{session.user.nombres} </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="hover:cursor-pointer w-full">
                        <Link
                          href="/profile"
                          className="flex items-center w-full"
                        >
                          <User size={15} className="mr-2 h-4 w-4" />
                          <span>Perfil</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="text-red-500 hover:cursor-pointer w-full"
                    >
                      <LogOut size={15} className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-primary btn-sm">
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            )}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
