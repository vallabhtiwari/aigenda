import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Invalid Session" }, { status: 401 });
  }
  const { oldpassword, newpassword } = await req.json();
  if (!(oldpassword && newpassword)) {
    return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { password: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }
  const verify = await bcrypt.compare(oldpassword, user.password);
  if (!verify) {
    return NextResponse.json(
      { error: "Invalid Old Password" },
      { status: 401 }
    );
  }
  if (oldpassword === newpassword) {
    return NextResponse.json(
      { error: "New Password cannot be same as Old Password" },
      { status: 400 }
    );
  }
  const hashedNewPassword = await bcrypt.hash(newpassword, 10);
  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      password: hashedNewPassword,
    },
  });
  return NextResponse.json({ message: "Password updated succussfully" });
}
