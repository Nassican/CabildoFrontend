'use client';

import clsx from 'clsx';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn } from '@/lib/utils';

import { menuItems } from './MenuItems';

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
  const pathName = usePathname();
  const segmens = pathName.split('/').filter(Boolean);
  const segment = `/${segmens[0] ? segmens[0] : ''}`;

  const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)));

  return (
    <div className="h-screen overflow-auto sm:border-r lg:border-r ">
      <ScrollArea className="mb-16 rounded-md sm:w-full lg:w-48 ">
        <div className="mt-2 sm:p-2 md:px-2">
          {uniqueLabels.map((label, index) => (
            <React.Fragment key={label}>
              {label && (
                <div
                  className={`mx-4 mb-3 text-left text-base font-bold tracking-wider text-slate-700 dark:text-slate-200 ${
                    index > 0 ? 'mt-5' : ''
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
                        className="mb-[-10px] mt-[-10px] p-0 font-medium"
                        collapsible
                      >
                        <AccordionItem value="item-1" className="m-0 p-0 font-medium">
                          <AccordionTrigger className="my-2 flex h-10 items-center rounded-md p-4 text-sm text-accent-foreground transition-colors hover:bg-accent hover:text-foreground md:h-9 [&[data-state=open]>svg]:rotate-180">
                            <a key={menu.name}>
                              <div className={cn('flex w-full justify-between')}>
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
                                href={menu.href}
                                className={clsx(
                                  'my-2 flex h-10 items-center rounded-md p-4 text-sm text-accent-foreground transition-colors hover:bg-accent hover:text-foreground md:h-9',
                                  {
                                    'bg-accent text-black': segment === menu.href,
                                  },
                                )}
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
                          className={clsx(
                            'my-2 flex h-10 items-center rounded-md p-4 text-sm text-accent-foreground transition-colors hover:bg-accent hover:text-foreground md:h-9',
                            {
                              'bg-accent text-black': segment === menu.href,
                            },
                          )}
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
