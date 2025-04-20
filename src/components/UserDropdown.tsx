import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { User } from "lucide-react";
import { cn } from "@/lib/utils";
const UserDropdown = () => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-12 h-12  p-2 rounded-full font-semibold hover:cursor-pointer flex justify-evenly items-center">
          <User />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-2 p-2 bg-muted/80 border-primary">
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem className="hover:cursor-pointer">
              Profile
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem className="hover:cursor-pointer">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="max-w-md border-primary">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="demo"
              className={cn(
                "col-span-3",
                "!border-none !ring-0 !ring-offset-0 !outline-none !shadow-none",
                "focus-visible:!ring-0 focus-visible:!border-none",
                "bg-input"
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              placeholder="demo"
              className={cn(
                "col-span-3",
                "!border-none !ring-0 !ring-offset-0 !outline-none !shadow-none",
                "focus-visible:!ring-0 focus-visible:!border-none",
                "bg-input"
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDropdown;
