"use client";

import { Todo } from "@/lib/types";
import { useEffect } from "react";
import { TodoItem } from "@/components/Todo/TodoItem";
import { TodoForm } from "@/components/Todo/TodoForm";
import { useTodoStore } from "@/store/todoStore";
export const TodoListClient = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const { todos, setInitialTodos } = useTodoStore();
  useEffect(() => {
    setInitialTodos(initialTodos);
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
