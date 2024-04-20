import Image from "next/image";
import Link from "next/link";

const Logo = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/icons/logo.svg"
        alt="Yoom"
        width={32}
        height={32}
        className="max-sm:size-10"
      />
      <p
        className={`text-[26px] font-extrabold text-white ${
          isMobileNav ? "" : "max-sm:hidden"
        }`}
      >
        Yoom
      </p>
    </Link>
  );
};

export default Logo;
