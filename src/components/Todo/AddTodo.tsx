"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { AddTodoSchema } from "@/lib/zodSchemas";
import { ZodError } from "zod";
import { toast } from "sonner";

const AddTodo = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    const url = "/api/todo/add";
    try {
      const parsedTitle = AddTodoSchema.parse(title);
      const resp = await axios.request({
        url,
        method: "POST",
        data: { title: parsedTitle },
      });
      toast.success("Todo Added");
      setTitle("");
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
    <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
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
        className="w-full text-2xl sm:w-28 cursor-pointer px-2 py-6"
        onClick={handleSubmit}
      >
        Add
      </Button>
    </div>
  );
};

export default AddTodo;
