"use client";

import { Todo } from "@/lib/types";
import { useEffect, useRef } from "react";
import { TodoItem } from "@/components/Todo/TodoItem";
import { TodoForm } from "@/components/Todo/TodoForm";
import { useTodoStore } from "@/store/todoStore";
import { generatedSuggestedTodos } from "@/app/actions/todoActions";
import { getDistanceFromLatLonInMeters } from "@/lib/utils";
import { toast } from "sonner";
export const TodoListClient = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const previousLocationRef = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const { todos, setInitialTodos, suggestedTodos, setSuggestedTodos } =
    useTodoStore();
  useEffect(() => {
    setInitialTodos(initialTodos);
  }, [initialTodos, setInitialTodos]);

  useEffect(() => {
    let watcher: number;
    async function fetchSuggestions() {
      try {
        watcher = navigator.geolocation.watchPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            const previousLocation = previousLocationRef.current;
            if (previousLocation) {
              const distance = getDistanceFromLatLonInMeters(
                previousLocation.latitude,
                previousLocation.longitude,
                latitude,
                longitude
              );
              if (distance < 1000 && suggestedTodos.length !== 0) return;
            }
            previousLocationRef.current = { latitude, longitude };
            console.log("Calling");
            const suggestions = await generatedSuggestedTodos({
              latitude,
              longitude,
            });
            if (suggestions) {
              if (suggestions.error)
                toast.error(
                  "Failed to get suggestions. Please try reloading the page."
                );
              else setSuggestedTodos(suggestions);
            }
          },
          (error) => console.error("Failed to watch location", error)
        );
      } catch (error) {
        console.error("Failed to fetch AI suggestions", error);
      }
    }

    fetchSuggestions();
    return () => {
      if (watcher) navigator.geolocation.clearWatch(watcher);
    };
  }, [suggestedTodos, setSuggestedTodos]);

  return (
    <>
      <TodoForm />
      {todos.length === 0 &&
      (!suggestedTodos || suggestedTodos.length === 0) ? (
        <p className="text-muted text-xl p-4 text-center">No todos yet!</p>
      ) : (
        <div className="max-h-150 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted">
          {todos.map(
            (todo) => !todo.complete && <TodoItem key={todo.id} todo={todo} />
          )}
          {suggestedTodos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {todos.map(
            (todo) => todo.complete && <TodoItem key={todo.id} todo={todo} />
          )}
        </div>
      )}
    </>
  );
};
