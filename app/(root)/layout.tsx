import { ReactNode } from "react";
import { Metadata } from "next";
import StreamVideoProvider from "@/providers/StreamClientProvider";

export const metadata: Metadata = {
  title: "Yoom",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default Layout;
