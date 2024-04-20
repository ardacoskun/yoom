"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";

interface SidebarLinksProps {
  setOpen?: (value: boolean) => void;
  isMobileNav?: boolean;
}

const SidebarLinks = ({ isMobileNav = false, setOpen }: SidebarLinksProps) => {
  const pathname = usePathname();

  const checkIsActive = (link: string) => {
    return pathname === link && pathname.startsWith(link);
  };

  return sidebarLinks.map((item) => (
    <Link
      key={item.id}
      href={item.route}
      className={cn(
        `flex gap-4 items-center p-4 rounded-lg ${
          isMobileNav ? "w-full max-w-60" : "justify-start"
        }`,
        {
          "bg-blue-1": checkIsActive(item.route),
        }
      )}
      onClick={() => (isMobileNav ? setOpen!(false) : {})}
    >
      <Image
        src={item.imgUrl}
        alt={item.label}
        width={isMobileNav ? 20 : 24}
        height={isMobileNav ? 20 : 24}
      />
      <p
        className={`font-semibold ${
          isMobileNav ? "" : "text-lg  max-lg:hidden"
        }`}
      >
        {item.label}
      </p>
    </Link>
  ));
};

export default SidebarLinks;
