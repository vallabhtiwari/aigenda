"use client";

import { Todo } from "@/lib/types";
import { useState } from "react";
import { TodoItem } from "@/components/Todo/TodoItem";
import { TodoForm } from "@/components/Todo/TodoForm";
import { sortTodos } from "@/lib/utils";
export const TodoListClient = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const addTodo = (newTodo: Todo) =>
    setTodos((prev) => [...prev, newTodo].sort(sortTodos));
  const updateTodo = (updated: Todo) =>
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updated.id ? updated : todo))
    );

  const handlSave = (todo: Todo) => {
    if (editingTodo) updateTodo(todo);
    else addTodo(todo);
    setEditingTodo(null);
  };
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: string) => {
    setTodos((prev) => {
      const updatedTodos = prev.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      );
      return updatedTodos.sort(sortTodos);
    });
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
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        );
      })}
    </>
  );
};
