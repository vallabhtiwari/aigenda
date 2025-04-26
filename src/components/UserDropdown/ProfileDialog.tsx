import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const ProfileDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ oldpassword: "", newpassword: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(form.newpassword && form.oldpassword)) return;
    setLoading(true);
    const url = "/api/auth/password-update";
    try {
      const resp = await axios.request({
        method: "POST",
        url,
        data: form,
      });
      toast.success("Password updated successfully");
      setForm({ oldpassword: "", newpassword: "" });
      setOpen(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.error);
      } else {
        toast.error("Some error occurred. Please try again.");
      }
    }
    setLoading(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md border-primary">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Old Password
              </Label>
              <Input
                type="password"
                name="oldpassword"
                value={form.oldpassword}
                onChange={handleChange}
                className="col-span-3 bg-input"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                New Password
              </Label>
              <Input
                type="password"
                name="newpassword"
                value={form.newpassword}
                onChange={handleChange}
                className="col-span-3 bg-input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="cursor-pointer">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
