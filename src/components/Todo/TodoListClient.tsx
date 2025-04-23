"use client";

import { Todo } from "@/lib/types";
import { useState } from "react";
import { TodoItem } from "@/components/Todo/TodoItem";
import { TodoForm } from "@/components/Todo/TodoForm";
export const TodoListClient = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const addTodo = (newTodo: Todo) => setTodos((prev) => [...prev, newTodo]);
  const updateTodo = (updated: Todo) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updated.id ? updated : todo))
    );

  const handlSave = (todo: Todo) => {
    if (editingTodo) updateTodo(todo);
    else addTodo(todo);
    setEditingTodo(null);
  };

  return (
    <>
      <TodoForm
        todo={editingTodo || undefined}
        onSave={handlSave}
        onCancelEdit={() => setEditingTodo(null)}
      />
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={() => setEditingTodo(todo)}
          />
        );
      })}
    </>
  );
};
