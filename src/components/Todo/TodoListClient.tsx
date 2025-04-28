"use client";

import { Todo } from "@/lib/types";
import { useEffect } from "react";
import { TodoItem } from "@/components/Todo/TodoItem";
import { TodoForm } from "@/components/Todo/TodoForm";
import { useTodoStore } from "@/store/todoStore";
import { generatedSuggestedTodos } from "@/app/actions/todoActions";
export const TodoListClient = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const { todos, setInitialTodos, suggestedTodos, setSuggestedTodos } =
    useTodoStore();
  useEffect(() => {
    setInitialTodos(initialTodos);
  }, [initialTodos, setInitialTodos]);

  useEffect(() => {
    if (suggestedTodos && suggestedTodos.length === 0) {
      async function fetchSuggestions() {
        try {
          const pos = await new Promise<GeolocationPosition>(
            (resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject)
          );
          const { latitude, longitude } = pos.coords;
          const suggestions = await generatedSuggestedTodos({
            latitude,
            longitude,
          });
          if (suggestions) {
            setSuggestedTodos(suggestions);
          }
        } catch (error) {
          console.error("Failed to fetch AI suggestions", error);
        }
      }

      fetchSuggestions();
    }
  }, [suggestedTodos, setSuggestedTodos]);

  return (
    <>
      <TodoForm />
      {todos.length === 0 &&
      (!suggestedTodos || suggestedTodos.length === 0) ? (
        <p className="text-muted text-xl p-4 text-center">No todos yet!</p>
      ) : (
        <div className="max-h-150 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {suggestedTodos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
};
