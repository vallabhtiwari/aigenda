import { prisma } from "@/lib/db";
import { AuthSchema } from "@/lib/zodSchemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const safePayload = AuthSchema.safeParse(body);
    if (!safePayload.success) {
      return NextResponse.json(
        { error: safePayload.error.format() },
        { status: 400 }
      );
    }
    const { email, password } = safePayload.data;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });
    return NextResponse.json({ user: { id: user.id, email: user.email } });
  } catch {
    return NextResponse.json(
      { error: "Something wend wrong. Please try again" },
      { status: 500 }
    );
  }
}
