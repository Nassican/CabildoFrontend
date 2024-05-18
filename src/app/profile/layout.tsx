"use client";

import Navbar from "@/components/ui/Navbar";
import { SidebarMenu } from "@/components/ui/Sidebar/SideBar";
import React, { useEffect, useRef } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentWrapper = contentWrapperRef.current;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { target, contentRect } = entry;
        if (target === contentWrapper) {
          const main = document.querySelector("main");
          if (main) {
            if (contentRect.height > window.innerHeight) {
              main.classList.add("overflow-auto");
            } else {
              main.classList.remove("overflow-auto");
            }
          }
        }
      }
    });

    if (contentWrapper) {
      observer.observe(contentWrapper);
    }

    return () => {
      if (contentWrapper) {
        observer.unobserve(contentWrapper);
      }
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex ">
        <div className="hidden sm:block fixed h-screen">
          <SidebarMenu />
        </div>
        <main className="w-full p-4 overflow-auto ml-0 sm:ml-36 lg:ml-48">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
