import { create } from "zustand";
import { Todo } from "@/lib/types";
import { sortTodos } from "@/lib/utils";

export type TodoState = {
  todos: Todo[];
};
export type TodoActions = {
  editingTodo: Todo | null;
  setInitialTodos: (todos: Todo[]) => void;
  setEditingTodo: (todo: Todo | null) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  reset: () => void;
};

export type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  editingTodo: null,
  setInitialTodos: (todos) => set({ todos: todos.sort(sortTodos) }),
  setEditingTodo: (todo) => set({ editingTodo: todo }),
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo].sort(sortTodos),
    })),
  updateTodo: (updated) =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === updated.id ? updated : item
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== id),
    })),
  toggleTodo: (id) =>
    set((state) => {
      const updatedTodos = state.todos.map((t) =>
        t.id === id ? { ...t, complete: !t.complete } : t
      );
      return { todos: updatedTodos.sort(sortTodos) };
    }),

  reset: () => set({ todos: [], editingTodo: null }),
}));
