"use client";

import { Todo } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function TodoItem({ todo }: { todo: Todo }) {
  const [isComplete, setIsComplete] = useState(todo.complete);

  const handleToggle = () => {
    setIsComplete(!isComplete);
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
        {todo.prompt && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <Button className="w-24 cursor-pointer">Accept</Button>
            <Button className="w-24 cursor-pointer bg-destructive hover:bg-destructive-hover">
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
