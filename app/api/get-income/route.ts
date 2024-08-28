import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
 
const prisma = new PrismaClient();

export async function GET() {
  try {
    const income = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });
      return NextResponse.json(income, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}