import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionAuthProvider from '../context/SessionAuthProvider';
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/context/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cabildo",
  description: "Construida con Next.js y TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="{inter.className}" suppressHydrationWarning={true}>
        <main>
          <SessionAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>
              <Toaster/>
            </ThemeProvider>
          </SessionAuthProvider>
        </main>
      </body>
    </html>
  );
}
