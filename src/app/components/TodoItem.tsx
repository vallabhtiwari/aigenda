import { Todo } from "@/lib/types";

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div>
      {todo.title} -- {todo.complete}
    </div>
  );
}
