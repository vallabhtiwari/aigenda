"use client";

import { Todo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTodoStore } from "@/store/todoStore";

export function TodoItem({ todo }: { todo: Todo }) {
  const {
    setEditingTodo,
    deleteTodo,
    toggleTodo,
    addTodo,
    deleteSuggestedTodo,
  } = useTodoStore();
  const handleToggle = async () => {
    const url = "/api/todos/update";
    try {
      const resp = await axios.request({
        url,
        method: "POST",
        data: { id: todo.id, complete: !todo.complete },
      });
      toggleTodo(todo.id);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async () => {
    const url = "/api/todos/delete";
    try {
      const resp = await axios.request({
        url,
        method: "DELETE",
        data: { id: todo.id },
      });
      deleteTodo(todo.id);
      toast.success("Todo deleted successfully.");
    } catch {
      toast.error("Somthing went wrong. Please try again.");
    }
  };

  const handleAccept = async () => {
    const url = "/api/todos/add";
    try {
      const resp = await axios.request({
        url,
        method: "POST",
        data: { title: todo.title },
      });
      const savedTodo = resp.data.todo;
      addTodo(savedTodo);
      deleteSuggestedTodo(todo.id);
      toast.success("Suggested Todo Added");
    } catch {
      toast.error("Something went wrong. Please try again");
    }
  };

  const handleReject = () => deleteSuggestedTodo(todo.id);

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
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            {todo.prompt}
          </span>
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
              <Button onClick={handleAccept} className="w-24 cursor-pointer">
                Accept
              </Button>
              <Button
                onClick={handleReject}
                className="w-24 cursor-pointer bg-destructive hover:bg-destructive-hover"
              >
                Reject
              </Button>
            </>
          ) : (
            <div className="flex flex-row justify-between items-center gap-6">
              <Pencil
                className="h-8 w-8 text-primary cursor-pointer"
                onClick={() => setEditingTodo(todo)}
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
