import { Todo } from "@/lib/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";
import { TodoListClient } from "@/components/Todo/TodoListClient";
import { sortTodos } from "@/lib/utils";

export async function TodosList() {
  let todos: Todo[] = [];
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    todos = [];
  } else {
    todos = await prisma.todo.findMany({
      where: { userEmail: session.user.email },
    });
  }
  return <TodoListClient initialTodos={todos.sort(sortTodos)} />;
}
