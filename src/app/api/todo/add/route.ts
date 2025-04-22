import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { AddTodoSchema } from "@/lib/zodSchemas";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Invalid Session" }, { status: 401 });
  }
  const { title } = await req.json();
  const safePayload = AddTodoSchema.safeParse(title);
  if (!safePayload.success) {
    return NextResponse.json(
      { error: safePayload.error.format() },
      { status: 400 }
    );
  }
  const todo = await prisma.todo.create({
    data: {
      title,
      userEmail: session.user.email,
    },
  });
  return NextResponse.json({ todo });
}
