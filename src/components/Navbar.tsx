import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserDropdown } from "@/components/UserDropdown";
import { getServerSession } from "next-auth";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="w-full p-4 flex justify-between items-center border border-primary rounded-full shadow-lg">
      <NavLink href="/" className="text-2xl">
        <h1>AIgenda</h1>
      </NavLink>
      <h1 className="hidden xs:block text-lg">
        Hi, {session?.user?.email?.split("@")[0] || "User"}
      </h1>
      <div className="flex justify-between items-center gap-2">
        <ThemeToggle variant="icon" className="hidden xs:block" />
        <UserDropdown />
      </div>
    </nav>
  );
}
