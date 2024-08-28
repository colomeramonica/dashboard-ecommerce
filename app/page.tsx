"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import SalesInformationCard from "@/components/cards";
import LineChart from "@/components/line-chart";
import { Navbar } from "@/components/navbar";
import PieChart from "@/components/pie-chart";
import { useState, useEffect } from "react";

export default function Home() {
  const [ordersTotal, setOrdersTotal] = useState<number[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [averageItemsPerOrder, setAverageItemsPerOrder] = useState<number>(0);
  const [averageTotalPerOrder, setAverageTotalPerOrder] = useState<number>(0);
  const [averagePricePerItem, setAveragePricePerItem] = useState<number>(0);
  const [popularProducts, setPopularProducts] = useState<{ label: string; value: number; }[]>([]);

  useEffect(() => {
    const fetchOrdersTotalInTheLast30Days = async () => {
      const response = await fetch("/api/get-orders");
      const data = await response.json();

      const totals = data.map((order: { total: number }) => order.total);
      setOrdersTotal(totals);
    };

    const fetchIncome = async () => {
      const response = await fetch("/api/get-income");
      const data = await response.json();
      setIncome(data._sum.total);
    };

    const fetchAvgTotalPerOrder = async () => {
      const response = await fetch("/api/get-avg-ticket");
      const data = await response.json();
      const avg = data._avg.total;
      setAverageTotalPerOrder(avg.toFixed(2));
    }

    const fetchAvgItemsPerOrder = async () => {
      const response = await fetch("/api/get-avg-items-per-order");
      const data = await response.json();
      setAverageItemsPerOrder(data);
    }

    const fetchAvgPricePerItem = async () => {
      const response = await fetch("/api/get-avg-price-per-item");
      const data = await response.json();
      const avg = data._avg.price
      setAveragePricePerItem(avg.toFixed(2));
    };

    const fetchMostPopularProducts = async () => {
      const response = await fetch("/api/get-popular-products");
      const data = await response.json();

      console.log('data?', data);
      data.map((product: { name: string; total: number }) => {
        console.log('data?', product);
        setPopularProducts((prev) => [...prev, { label: product.name, value: product.total }]);
      });
    }

    fetchOrdersTotalInTheLast30Days();
    fetchIncome();
    fetchAvgTotalPerOrder();
    fetchAvgItemsPerOrder();
    fetchAvgPricePerItem();
    fetchMostPopularProducts();
  }, []);

  console.log(popularProducts);

  return (
    <section className="flex flex-col w-full h-full bg-fixed bg-cover bg-repeat-y">
      <Navbar />
      <div className="flex lg:flex-row flex-col flex-wrap lg:justify-between justify-center align-middle">
        <SalesInformationCard title="Receita" value={income} />
        <SalesInformationCard title="Ticket médio" value={averageTotalPerOrder} />
        <SalesInformationCard title="Média de produtos por pedido" value={averageItemsPerOrder} />
        <SalesInformationCard title="Média valor por produto" value={averagePricePerItem} />
      </div>
      <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-10">
        <div className="w-full md:w-[1/2] p-2">
          <Card className="flex flex-col p-4 w-full max-h-auto gap-3 rounded-xl">
            <CardHeader className="font-bold text-xl">
              Pedidos feitos (nos últimos 30 dias)
            </CardHeader>
            <CardBody>
              <LineChart data={ordersTotal} />
            </CardBody>
          </Card>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <Card className="flex flex-col justify-center p-4 max-w-full max-h-auto gap-3 rounded-xl">
            <CardHeader className="font-bold text-xl">
              Produtos mais populares
            </CardHeader>
            <CardBody className="flex justify-center items-center">
              <PieChart data={popularProducts} />
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}