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
import { SidebarMenu } from "./SideBar";
import { LogOut, Menu,  User } from "lucide-react";

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
                    <SheetDescription>
                      <SidebarMenu />
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <MountainIcon className="h-8 w-8 mr-4 ml-4 text-black dark:text-white" />
            <a
              className="flex-none text-xl ml-4 font-semibold text-black dark:text-white sm:ml-0 sm:mr-4"
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
                  <DropdownMenuContent align="end" className="w-56 ">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                      >
                        <Link href="/profile" className="flex items-center">
                          <User size={15} className="mr-2 h-4 w-4" />
                          <span>Perfil</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className=" text-red-500 hover:cursor-pointer"
                    >
                      <LogOut size={15} className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                      <DropdownMenuShortcut className="dark:text-slate-100 text-slate-950" >⇧⌘P</DropdownMenuShortcut>
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

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default Navbar;
