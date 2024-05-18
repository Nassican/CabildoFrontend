import Navbar from "@/components/ui/Navbar";
import { SidebarMenu } from "@/components/ui/Sidebar/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
