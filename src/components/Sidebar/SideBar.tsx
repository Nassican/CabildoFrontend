"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { menuItems } from "./MenuItems";

type Menu = {
  label: string;
  name: string;
  icon: React.ReactNode;
  submenu?: Submenu[];
  href: string;
};

type Submenu = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export function SidebarMenu() {
  const menus: Menu[] = menuItems;

  const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)));

  return (
    <div className="h-screen overflow-auto">
      <ScrollArea className="lg:w-48 sm:w-full rounded-md mb-16 ">
        <div className="md:px-2 sm:p-2 mt-5 ">
          {uniqueLabels.map((label, index) => (
            <React.Fragment key={label}>
              {label && (
                <div
                  className={`mx-4 mb-3 text-xs text-left tracking-wider font-bold text-slate-700 dark:text-slate-200 ${
                    index > 0 ? "mt-5" : ""
                  }`}
                >
                  {label}
                </div>
              )}
              {menus
                .filter((menu) => menu.label === label)
                .map((menu) => (
                  <React.Fragment key={menu.name}>
                    {menu.submenu && menu.submenu.length > 0 ? (
                      <Accordion
                        key={menu.name}
                        type="single"
                        className="mt-[-10px] mb-[-10px] p-0 font-normal"
                        collapsible
                      >
                        <AccordionItem
                          value="item-1"
                          className="m-0 p-0 font-normal"
                        >
                          <AccordionTrigger className="w-full flex justify-start text-xs font-normal h-10 bg-background my-2 items-center p-4 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background rounded-md [&[data-state=open]>svg]:rotate-180">
                            <a key={menu.name}>
                              <div
                                className={cn("flex justify-between w-full")}
                              >
                                <div className="flex items-center">
                                  <div className="w-6">{menu.icon}</div>
                                  {menu.name}
                                </div>
                              </div>
                            </a>
                          </AccordionTrigger>
                          <AccordionContent>
                            {menu.submenu.map((submenu) => (
                              <Link
                                key={submenu.name}
                                href={submenu.href}
                                className="text-gray-400 mt-0 mb-0 flex text-xs h-10 bg-white dark:bg-background dark:hover:bg-primary dark:hover:text-background my-2 items-center p-4 hover:bg-primary hover:text-white rounded-md"
                              >
                                <div className="w-6">{submenu.icon}</div>
                                {submenu.name}
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <div key={menu.name}>
                        <Link
                          href={menu.href}
                          className="flex text-xs h-10 bg-white dark:bg-background my-2 items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-background hover:text-white rounded-md"
                        >
                          <div className="w-6">{menu.icon}</div>
                          {menu.name}
                        </Link>
                      </div>
                    )}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
