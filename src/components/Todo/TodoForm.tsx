"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddTodoSchema } from "@/lib/zodSchemas";
import { ZodError } from "zod";
import { toast } from "sonner";
import { Todo } from "@/lib/types";

type TodoFormProps = {
  todo?: Todo;
  onSave?: (todo: Todo) => void;
};

export const TodoForm = ({ todo, onSave }: TodoFormProps) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(todo?.title || "");
  }, [todo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url, data;
      const parsedTitle = AddTodoSchema.parse(title);
      if (todo) {
        url = "/api/todos/update";
        data = { id: todo.id, title: parsedTitle };
      } else {
        url = "/api/todos/add";
        data = { title: parsedTitle };
      }
      const resp = await axios.request({
        url,
        method: "POST",
        data,
      });
      const savedTodo = resp.data.todo;
      if (onSave) onSave(savedTodo);
      setTitle("");
      todo ? toast.success("Todo Updated") : toast.success("Todo Added");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data.error instanceof String)
          toast.error(e.response?.data.error);
        else toast.error("Something went wrong. Please try again.");
      } else if (e instanceof ZodError) {
        toast.error("Invalid Input");
      } else {
        toast.error("Some error occurred. Please try again.");
      }
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col sm:flex-row justify-between items-center gap-2"
    >
      <Input
        type="text"
        name="todo"
        value={title}
        placeholder="Add a todo"
        onChange={handleChange}
        autoComplete="off"
        className={cn("bg-input !text-3xl px-2 py-6")}
      />
      <Button
        type="submit"
        className="w-full text-2xl sm:w-28 cursor-pointer px-2 py-6"
        disabled={loading}
      >
        {todo ? "Update" : "Add"}
      </Button>
      {todo && (
        <Button
          className="w-full text-2xl sm:w-28 cursor-pointer px-2 py-6"
          variant="destructive"
        >
          Cancel
        </Button>
      )}
    </form>
  );
};
