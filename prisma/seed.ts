import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criando usuários
  const users = await prisma.user.createMany({
    data: [
      {
      name: "Alice",
      email: "alice@example.com",
      age: 28,
      gender: "Female",
      },
      {
        name: "Anya",
        email: "anya@example.com",
        age: 26,
        gender: "Female",
      },
      {
        name: "Rob",
        email: "rob@example.com",
        age: 31,
        gender: "Male",
      },
      {
        name: "BOB",
        email: "bob@example.com",
        age: 30,
        gender: "Other",
      },
      {
        name: "Suki",
        email: "suki@example.com",
        age: 28,
        gender: "Other",
      },
      {
        name: "Dany",
        email: "dany@example.com",
        age: 31,
        gender: "Male",
      },
      {
        name: "Sky",
        email: "sky@example.com",
        age: 19,
        gender: "Female",
      }
  ],
  });

  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Games",
      },
      {
        name: "Household",
      },
      {
        name: "Electronics",
      },
      {
        name: "Books",
      },
      {
        name: "Clothing",
      },
      {
        name: "Vinil"
      }
    ]
  });

  const products = await prisma.product.createMany({
    data: [
      {
      name: "Dark Souls Trilogy",
      categories_id: [1],
      sku: "PROD011",
      stock: 4,
      price: 70.00,
      },
      {
        name: "Soap duo",
        categories_id: [2],
        sku: "PROD012",
        stock: 4,
        price: 20.82,
      },
      {
        name: "Towel Bundle",
        categories_id: [2],
        sku: "PROD013",
        stock: 14,
        price: 120.90,
      },
      {
        name: "Scented Candles",
        categories_id: [2],
        sku: "PROD014",
        stock: 140,
        price: 62.70,
      },
      {
        name: "PlayStation5",
        categories_id: [1,3],
        sku: "PS501",
        stock: 100,
        price: 700.00,
      },
      {
        name: "Hozier Vinil",
        categories_id: [6],
        sku: "HOZIER_001",
        stock: 40,
        price: 78.90,
      },
      {
        name: "Black Shirt",
        categories_id: [5],
        sku: "SHIRT__BLACK091",
        stock: 40,
        price: 29.89,
      },
      {
        name: "Sheer Red Dress",
        categories_id: [5],
        sku: "DRESS__RED091",
        stock: 40,
        price: 89.99,
      },
      {
        name: "Gray Sweetshirt",
        categories_id: [5],
        sku: "SWEETSHIRT__GRAY091",
        stock: 40,
        price: 129.99,
      },
      {
        name: "Green TShirt",
        categories_id: [5],
        sku: "TSHIRT__GREEN091",
        stock: 40,
        price: 58.90,
      },
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });