import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, name = '' } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({
      code: -1,
      mes: 'User already exists',
      data: null,
    });
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json({
      code: 200,
      msg: 'success',
      data: { id: user.id, email: user.email, name: user.name },
    });
  }
}
