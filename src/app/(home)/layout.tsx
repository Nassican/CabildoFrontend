"use client";


import React from "react"; // Asegúrate de importar React
import Navbar from "@/components/ui/Navbar";
import { SidebarMenu } from "@/components/Sidebar/SideBar";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  }) {
  
  const path = usePathname();

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const generateBreadcrumbs = () => {
    const segments = path.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;
      return (
        <React.Fragment key={href}>
          <BreadcrumbItem className="text-lg">
            {isLast ? (
              <BreadcrumbPage>{capitalizeFirstLetter(segment)}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });
  };

  console.log(path);
  
  return (
    <div>
      <Navbar />
      <div className="flex ">
        <div className="hidden sm:block fixed h-screen">
          <SidebarMenu />
        </div>
        <main className="w-full p-4 overflow-auto ml-0 sm:ml-36 lg:ml-48">
          <Breadcrumb className="flex items-center mb-4">
            <BreadcrumbList>
              <BreadcrumbItem className="text-lg">
                <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {generateBreadcrumbs()}
            </BreadcrumbList>
          </Breadcrumb>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
