const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default async function createOrderWithProducts(userId, productIds) {
  const result = await prisma.$transaction(async (prisma) => {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
    const total = products.reduce((acc, product) => acc + product.price, 0);
    const order = await prisma.order.create({
      data: {
        userId: userId,
        total: total,
        date: new Date(),
      },
    });

    const productOnOrders = productIds.map((productId) => ({
      orderId: order.id,
      productId: productId,
    }));

    await prisma.productOnOrders.createMany({
      data: productOnOrders,
    });

    return order;
  });

  return result;
}