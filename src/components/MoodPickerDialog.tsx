"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Smile, Meh, Frown, Angry, PartyPopper } from "lucide-react";
import { useTodoStore } from "@/store/todoStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mood } from "@/lib/types";
import { useSession } from "next-auth/react";

const MOOD_ICON_MAP: Record<string, React.JSX.Element> = {
  happy: <Smile className="size-12 text-primary" />,
  sad: <Frown className="size-12 text-primary" />,
  angry: <Angry className="size-12 text-primary" />,
  excited: <PartyPopper className="size-12 text-primary" />,
  neutral: <Meh className="size-12 text-primary" />,
};

export function MoodPickerDailog() {
  const { mood, setMood } = useTodoStore();
  const { status } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !mood) setOpen(true);
    else setOpen(false);
  }, [status, mood]);

  const handleSelectMood = (m: Mood) => {
    setMood(m);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">How are you doing?</DialogTitle>
        </DialogHeader>
        <div className=" flex justify-between items-center p-2">
          {Object.entries(MOOD_ICON_MAP).map(([moodKey, IconElement]) => (
            <Button
              key={moodKey}
              onClick={() => handleSelectMood(moodKey as Mood)}
              variant="outline"
              className="flex flex-col items-center gap-1 p-12 border-none cursor-pointer"
            >
              {IconElement}
              <span className="text-sm text-primary">
                {moodKey.charAt(0).toUpperCase() + moodKey.slice(1)}
              </span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
