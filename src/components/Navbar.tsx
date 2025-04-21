import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserDropdown } from "@/components/UserDropdown";

export function Navbar() {
  return (
    <nav className="w-full p-4 flex justify-between items-center border border-primary rounded-full shadow-lg">
      <NavLink href="/" className="text-2xl">
        <h1>AIgenda</h1>
      </NavLink>
      <h1 className="hidden xs:block text-lg">Hi, User</h1>
      <div className="flex justify-between items-center gap-2">
        <ThemeToggle />
        <UserDropdown />
      </div>
    </nav>
  );
}
