import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import { signupSchema } from "@/lib/zodSchemas";
import axios from "axios";
import { toast } from "sonner";

export const AuthDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { data: session } = useSession();
  const [isSignUp, setIsSignUp] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState<z.infer<typeof signupSchema>>({
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setForm({ email: "", password: "" });
    setIsSignUp((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isSignUp ? "/api/signup" : "";
    setLoading(true);
    setError(false);
    try {
      const parsed = signupSchema.parse(form);
      const resp = await axios.request({
        url,
        method: "POST",
        data: parsed,
      });
      setLoading(false);
      setIsSignUp(false);
      setForm({ email: "", password: "" });
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError(true);
    }
  };

  if (session) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm text-center border-primary">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-destructive hover:bg-destructive-hover">
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm text-center border-primary">
        <DialogHeader>
          <DialogTitle>{isSignUp ? "Sign Up" : "Sign In"}</DialogTitle>
          <DialogDescription>
            {isSignUp
              ? "Create a new account to use AIgenda."
              : "Welcome ! Please sign in."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            className="bg-input"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            className="bg-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <DialogFooter className="flex flex-col gap-2 mt-4">
          <Button onClick={toggleMode} variant="secondary">
            {isSignUp
              ? "Already have an account? Sign In"
              : "New here? Sign Up"}
          </Button>
          <Button onClick={handleSubmit}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
