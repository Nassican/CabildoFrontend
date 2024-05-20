'use client';

import { ChevronRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react'; // Asegúrate de importar React

import Navbar from '@/components/Navbar/Navbar';
import { SidebarMenu } from '@/components/Sidebar/SideBar';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { status } = useSession();

  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const isLast = index === segments.length - 1;
      return (
        <Fragment key={href}>
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link className="capitalize" href={href}>
                  {segment}
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {!isLast && (
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
          )}
        </Fragment>
      );
    });
  };

  if (status === 'loading') return <div>Loading...</div>;
  const pathnameLength = generateBreadcrumbs().length;

  return (
    <div>
      <Navbar />
      <div className="flex ">
        <div className="fixed hidden h-screen sm:block">
          <SidebarMenu />
        </div>
        <main className="ml-0 w-full overflow-auto p-4 sm:ml-36 lg:ml-48">
          <Breadcrumb className="mb-4 flex items-center">
            <BreadcrumbList>
              <BreadcrumbItem>
                {pathnameLength === 0 ? (
                  <BreadcrumbPage className="capitalize">Home</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {pathnameLength > 0 && (
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
              )}
              {generateBreadcrumbs()}
            </BreadcrumbList>
          </Breadcrumb>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
