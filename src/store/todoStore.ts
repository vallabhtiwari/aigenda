import { create } from "zustand";
import { Todo } from "@/lib/types";
import { sortTodos } from "@/lib/utils";

export type TodoState = {
  todos: Todo[];
  suggestedTodos: Todo[] | null;
  editingTodo: Todo | null;
};
export type TodoActions = {
  setInitialTodos: (todos: Todo[]) => void;
  setSuggestedTodos: (todos: Todo[]) => void;
  setEditingTodo: (todo: Todo | null) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  deleteSuggestedTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  reset: () => void;
};

export type TodoStore = TodoState & TodoActions;

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  editingTodo: null,
  suggestedTodos: [],
  setInitialTodos: (todos) => set({ todos: todos.sort(sortTodos) }),
  setSuggestedTodos: (todos) => set({ suggestedTodos: todos.sort(sortTodos) }),
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
  deleteSuggestedTodo: (id) =>
    set((state) => ({
      suggestedTodos: state.suggestedTodos?.filter((item) => item.id !== id),
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
