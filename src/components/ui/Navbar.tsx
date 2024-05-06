"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./button";

// LO AGREGUE YO< QUITAR PARA INSTALAR POR SHADCN

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b">
      <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
        <MountainIcon className="w-6 h-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="/" > Home </Link>
        {session?.user ? (
          <>
            <Link
              href="/dashboard"
              className="btn btn-primary btn-sm"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="btn btn-danger btn-sm"
            >
              Signout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-primary btn-sm"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-primary btn-sm"
            >
              Register
            </Link>
          </>
        )}
      </nav>
      <Button className="md:hidden" size="icon" variant="ghost">
        <MenuIcon className="w-6 h-6" />
        <span className="sr-only">Toggle navigation</span>
      </Button>
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
  )
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
  )
}

export default Navbar;
