"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ProfileDialog } from "@/components/UserDropdown/ProfileDialog";
import { AuthDialog } from "@/components/UserDropdown/AuthDialog";
import { User } from "lucide-react";

export function UserDropdown() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-12 h-12 p-2 rounded-full font-semibold hover:cursor-pointer flex justify-evenly items-center">
          <User />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="m-2 p-2 bg-muted/80 border-primary">
          <DropdownMenuItem onClick={() => setProfileOpen(true)}>
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setAuthOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProfileDialog open={profileOpen} setOpen={setProfileOpen} />
      <AuthDialog open={authOpen} setOpen={setAuthOpen} />
    </>
  );
}
