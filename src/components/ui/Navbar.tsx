"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";
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
import { Label } from "./label";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white dark:bg-background dark:text-white text-sm py-4 border-b ">
      <nav
        className="max-w-full w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="sm:hidden flex items-center">
              <Sheet>
                <SheetTrigger className="border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900 dark:hover:text-slate-200 focus:border-slate-400 dark:focus:border-slate-700 h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  <Menu className="h-6 w-6" />
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
            <Link
              href="/"
              className="flex flex-center text-xl font-semibold text-black dark:text-white"
            >
              <MountainIcon className="h-8 w-8 mr-2 ml-2 text-black dark:text-white" />
              <Label className="text-xl font-semibold cursor-pointer">Cabildo</Label>
            </Link>
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
