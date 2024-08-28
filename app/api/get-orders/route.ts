import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
 
const prisma = new PrismaClient();

export async function GET() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const income = await prisma.order.findMany({
      where: {
        date: {
          gte: thirtyDaysAgo,
        },
      },
    });
      return NextResponse.json(income, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}