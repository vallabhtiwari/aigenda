import { TodoListClient } from "@/components/Todo/TodoListClient";
import { sortTodos } from "@/lib/utils";
import { getTodos } from "@/app/actions/todoActions";

export async function TodosList() {
  const { todos } = await getTodos();
  return <TodoListClient initialTodos={todos.sort(sortTodos)} />;
}
