import { ReactNode } from "react";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Yoom",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-16 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
