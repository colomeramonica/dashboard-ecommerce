import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
 
const prisma = new PrismaClient();

export async function GET() {
  try {
    const productCountPerOrder = await prisma.productOnOrders.groupBy({
      by: ['orderId'],
      _count: {
        productId: true,
      },
    });

    const totalOrders = productCountPerOrder.length;
    const totalItems = productCountPerOrder.reduce((sum, order) => sum + order._count.productId, 0);
    const averageItemsPerOrder = totalItems / totalOrders;
    return NextResponse.json(averageItemsPerOrder, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}