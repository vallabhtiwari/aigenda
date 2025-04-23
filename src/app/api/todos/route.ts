import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Invalid Session" }, { status: 401 });
    }
    const todos = await prisma.todo.findMany({
      where: {
        userEmail: session.user.email,
      },
    });
    return NextResponse.json({ todos });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again" },
      { status: 500 }
    );
  }
}
