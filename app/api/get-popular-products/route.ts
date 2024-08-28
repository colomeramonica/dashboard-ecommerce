import { NextResponse } from "next/server";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function GET() {
  try {
    const mostOrderedProducts = await prisma.productOnOrders.groupBy({
      by: ['productId'],
      _count: {
        productId: true,
      },
      orderBy: {
        _count: {
          productId: 'desc',
        },
      },
      take: 3,
    });

    const productIds = mostOrderedProducts.map(product => product.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const result = products.map(product => {
      const orderCount = mostOrderedProducts.find(p => p.productId === product.id)._count.productId;
      return {
        ...product,
        orderCount,
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}