"use client";

import { Todo } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function TodoItem({ todo }: { todo: Todo }) {
  const [isComplete, setIsComplete] = useState(todo.complete);
  const router = useRouter();

  const handleToggle = async () => {
    const url = "/api/todos/update";
    try {
      const resp = await axios.request({
        url,
        method: "POST",
        data: { id: todo.id, title: todo.title, complete: !isComplete },
      });
      setIsComplete(!isComplete);
      // router.refresh();
    } catch {}
  };

  return (
    <div className="p-4 flex items-center gap-4">
      <input
        type="checkbox"
        checked={isComplete}
        onChange={handleToggle}
        className="w-6 h-6 rounded-lg"
      />
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <span>{todo.prompt}</span>
          <span
            className={cn(
              isComplete ? "line-through text-muted" : "text-primary",
              "text-2xl"
            )}
          >
            {todo.title}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          {todo.prompt ? (
            <>
              <Button className="w-24 cursor-pointer">Accept</Button>
              <Button className="w-24 cursor-pointer bg-destructive hover:bg-destructive-hover">
                Reject
              </Button>
            </>
          ) : (
            <Trash2 className="h-8 w-8 hover:cursor-pointer text-primary" />
          )}
        </div>
      </div>
    </div>
  );
}
