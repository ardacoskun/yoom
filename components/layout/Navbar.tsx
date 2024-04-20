import MobileNav from "./MobileNav";
import Logo from "../common/Logo";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Logo />
      <div className="flex-between gap-5">
        {/* CLERT USER MANAGEMENT */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
