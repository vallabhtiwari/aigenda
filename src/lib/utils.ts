import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Todo } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortTodos(a: Todo, b: Todo) {
  if (a.complete !== b.complete) {
    return a.complete ? 1 : -1;
  }
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}
