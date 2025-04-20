import { Todo } from "@/lib/types";
import { TodoItem } from "@/components/Todo/TodoItem";

export function TodosList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
