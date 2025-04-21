import { prisma } from "@/lib/db";
import { signupSchema } from "@/lib/zodSchemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const safePayload = signupSchema.safeParse(body);
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
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
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
}
