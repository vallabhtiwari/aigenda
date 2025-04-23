import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";
import { UpdateTodoSchema } from "@/lib/zodSchemas";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Invalid Session" }, { status: 401 });
    }
    const body = await req.json();
    const safPayload = UpdateTodoSchema.safeParse(body);
    if (!safPayload.data?.id) {
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }
    const { id, title, complete } = safPayload.data;
    const todo = await prisma.todo.update({
      where: {
        id,
        userEmail: session.user.email,
      },
      data: {
        title,
        complete,
      },
    });
    return NextResponse.json({ todo });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}
