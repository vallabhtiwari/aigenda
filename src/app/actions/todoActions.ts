"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";

export async function getTodos() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { error: "Invalid session", todos: [] };
    }

    const todos = await prisma.todo.findMany({
      where: {
        userEmail: session.user.email,
      },
    });

    return { todos };
  } catch (err) {
    console.error("Failed to fetch todos", err);
    return { error: "Something went wrong. Please try again", todos: [] };
  }
}
