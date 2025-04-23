import { Todo } from "@/lib/types";
import { TodoItem } from "@/components/Todo/TodoItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";
import { TodoListClient } from "./TodoListClient";

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
  console.log(todos);
  return <TodoListClient initialTodos={todos} />;
}
