import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { hash } from "bcrypt";
import { RegisterFormInputType } from "@/types/user";
import { User } from "@prisma/client";

export async function POST(req: Request): Promise<NextResponse> {
  const {
    body: { name, email, password },
  }: { body: RegisterFormInputType } = await req.json();

  const exists: User | null = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword: string = await hash(password, 10);

  const user: User = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
