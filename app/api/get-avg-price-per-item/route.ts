import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
 
const prisma = new PrismaClient();

export async function GET() {
  try {
    const avgPricePerItem = await prisma.product.aggregate({
      _avg: {
        price: true,
      },
    });

    return NextResponse.json(avgPricePerItem, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}