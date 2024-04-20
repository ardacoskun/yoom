"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  const checkIsActive = (link: string) => {
    return pathname === link && pathname.startsWith(link);
  };

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((item) => (
          <Link
            key={item.id}
            href={item.route}
            className={cn(
              "flex gap-4 items-center p-4 rounded-lg justify-start",
              {
                "bg-blue-1": checkIsActive(item.route),
              }
            )}
          >
            <Image src={item.imgUrl} alt={item.label} width={24} height={24} />
            <p className="text-lg font-semibold max-lg:hidden">{item.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
