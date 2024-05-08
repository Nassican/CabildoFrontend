import Navbar from "@/components/ui/Navbar";
import { SidebarMenu } from "@/components/ui/SideBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="hidden sm:block">
          <SidebarMenu />
        </div>
        <main className="w-full p-4">{children}</main>
      </div>
    </div>
  );
}