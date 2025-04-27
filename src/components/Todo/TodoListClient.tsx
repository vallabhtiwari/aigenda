"use client";

import { Todo } from "@/lib/types";
import { useEffect } from "react";
import { TodoItem } from "@/components/Todo/TodoItem";
import { TodoForm } from "@/components/Todo/TodoForm";
import { useTodoStore } from "@/store/todoStore";
import axios from "axios";
import { generatedSuggestedTodos } from "@/app/actions/todoActions";
export const TodoListClient = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const { todos, setInitialTodos } = useTodoStore();
  useEffect(() => {
    setInitialTodos(initialTodos);
    async function fetchSuggestions() {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const { latitude, longitude } = pos.coords;
        console.log(pos);
        console.log(latitude, longitude);
        const suggestions = await generatedSuggestedTodos({
          latitude,
          longitude,
        });
        if (suggestions)
          suggestions.forEach((prompt: string) => {
            const id = crypto.randomUUID();
            const todo = {
              id,
              title: prompt,
              complete: false,
              prompt,
              userEmail: null,
              createdAt: null,
              updatedAt: null,
            };
            // addSuggestedTodo(todo)
          });
      } catch (error) {
        console.error("Failed to fetch AI suggestions", error);
      }
    }

    fetchSuggestions();
  }, [initialTodos, setInitialTodos]);

  return (
    <>
      <TodoForm />
      {todos.length === 0 ? (
        <p className="text-muted text-xl p-4 text-center">No todos yet!</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </>
  );
};
