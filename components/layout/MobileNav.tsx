"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../common/Logo";
import SidebarLinks from "./sidebar/SidebarLinks";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full max-w-[264px]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="menu"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Logo isMobileNav />
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                <SidebarLinks isMobileNav setOpen={setOpen} />
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
