"use client";

import { Todo } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type TodoItemProps = {
  todo: Todo;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};
export function TodoItem({ todo, onEdit, onDelete, onToggle }: TodoItemProps) {
  const handleToggle = async () => {
    const url = "/api/todos/update";
    try {
      const resp = await axios.request({
        url,
        method: "POST",
        data: { id: todo.id, complete: !todo.complete },
      });
      onToggle(todo.id);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = "/api/todos/delete";
    try {
      const resp = await axios.request({
        url,
        method: "DELETE",
        data: { id: todo.id },
      });
      onDelete(todo.id);
      toast.success("Todo deleted successfully.");
    } catch {
      toast.error("Somthing went wrong. Please try again.");
    }
  };

  return (
    <div className="p-4 flex items-center gap-4">
      <Input
        type="checkbox"
        checked={todo.complete}
        onChange={handleToggle}
        className="w-6 h-6 rounded-lg"
      />
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col">
          <span>{todo.prompt}</span>
          <span
            className={cn(
              todo.complete ? "line-through text-muted" : "text-primary",
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
            <div className="flex flex-row justify-between items-center gap-6">
              <Pencil
                className="h-8 w-8 text-primary cursor-pointer"
                onClick={onEdit}
              />
              <Trash2
                className="h-8 w-8 hover:cursor-pointer text-destructive-hover"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
