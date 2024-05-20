'use client';

import { LogOut, Menu, MountainIcon, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { SidebarMenu } from '../Sidebar/SideBar';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { ModeToggle } from '../ui/ThemeToggleButton';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex w-full flex-wrap border-b bg-white py-4 text-sm sm:flex-nowrap sm:justify-start dark:bg-background dark:text-white ">
      <nav className="mx-auto w-full max-w-full px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center sm:hidden">
              <Sheet>
                <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-slate-200 bg-transparent text-sm font-medium ring-offset-background transition-colors hover:bg-slate-100 focus:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-900 dark:hover:text-slate-200 dark:focus:border-slate-700">
                  <Menu className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent side={'left'} className="w-[300px] sm:w-[340px]">
                  <SheetHeader>
                    <SheetTitle className="ml-3 text-left text-xl font-bold text-black dark:text-slate-100">
                      Menu
                    </SheetTitle>
                    <div>
                      <SidebarMenu />
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <Link href="/" className="flex-center flex text-xl font-semibold text-black dark:text-white">
              <MountainIcon className="ml-2 mr-2 h-8 w-8 text-black dark:text-white" />
              <Label className="cursor-pointer text-xl font-semibold">Cabildo</Label>
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
                      <DropdownMenuItem className="w-full hover:cursor-pointer">
                        <Link href="/profile" className="flex w-full items-center">
                          <User size={15} className="mr-2 h-4 w-4" />
                          <span>Perfil</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="w-full text-red-500 hover:cursor-pointer">
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
