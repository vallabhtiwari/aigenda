import { Todo } from "@/lib/types";
import { TodoItem } from "@/app/components/TodoItem";

export function TodosList({ todos }: { todos: Todo[] }) {
  return (
    <section>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
}
