import createOrderWithProducts from './order';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId, productIds } = await req.json();
  const order = await createOrderWithProducts(userId, productIds);
  return NextResponse.json(order, { status: 201 });
}