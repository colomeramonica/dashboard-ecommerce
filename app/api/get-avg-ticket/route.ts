import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
 
const prisma = new PrismaClient();

export async function GET() {
  try {
    const ticket = await prisma.order.aggregate({
      _avg: {
        total: true,
      },
    });
      return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}