import { NavLink } from "@/app/components/NavLink";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { User } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full p-4 flex justify-between items-center border border-primary rounded-full shadow-lg">
      <NavLink href="/" className="text-2xl">
        <h1>AIgenda</h1>
      </NavLink>
      <h1 className="text-lg">Hi, User</h1>
      <div className="flex justify-between items-center gap-2">
        <ThemeToggle />
        <div className="w-12 h-12  p-2 rounded-full font-semibold hover:cursor-pointer">
          <User />
        </div>
      </div>
    </nav>
  );
}
