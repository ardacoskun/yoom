import { ReactNode } from "react";
import StreamVideoProvider from "@/providers/StreamClientProvider";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default Layout;
