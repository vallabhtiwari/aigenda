"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ProfileDialog } from "@/components/UserDropdown/ProfileDialog";
import { AuthDialog } from "@/components/UserDropdown/AuthDialog";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/providers/ThemeProvider";

export function UserDropdown() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-12 h-12 p-2 rounded-full font-semibold hover:cursor-pointer flex justify-evenly items-center">
          <User />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="m-2 p-2 bg-muted/80 border-primary">
          <DropdownMenuLabel className="xs:hidden">
            Hi {session?.user?.email?.split("@")[0] || "there"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary xs:hidden" />
          <DropdownMenuItem onClick={toggleTheme} className="xs:hidden">
            {theme === "dark" ? "Light" : "Dark"}
          </DropdownMenuItem>

          {session && (
            <DropdownMenuItem onClick={() => setProfileOpen(true)}>
              Profile
            </DropdownMenuItem>
          )}

          {session ? (
            <DropdownMenuItem onClick={() => setAuthOpen(true)}>
              Logout
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setAuthOpen(true)}>
              Signin
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileDialog open={profileOpen} setOpen={setProfileOpen} />
      <AuthDialog open={authOpen} setOpen={setAuthOpen} />
    </>
  );
}
