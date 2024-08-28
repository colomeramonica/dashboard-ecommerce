"use client";
import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import SalesInformationCard from "@/components/cards";
import LineChart from "@/components/line-chart";
import { Navbar } from "@/components/navbar";
import PieChart from "@/components/pie-chart";

export default function Home() {
  const [ordersTotal, setOrdersTotal] = useState<number[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [averageItemsPerOrder, setAverageItemsPerOrder] = useState<number>(0);
  const [averageTotalPerOrder, setAverageTotalPerOrder] = useState<number>(0);
  const [averagePricePerItem, setAveragePricePerItem] = useState<number>(0);
  const [popularProducts, setPopularProducts] = useState<{ label: string; value: number; }[]>([]);

  useEffect(() => {
    // Funções de fetch para dados da API
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
      const avg = data._avg.price;
      setAveragePricePerItem(avg.toFixed(2));
    };

    const fetchMostPopularProducts = async () => {
      const response = await fetch("/api/get-popular-products");
      const data = await response.json();

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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedElementId = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(draggedElementId);
    if (draggedElement && e.currentTarget) {
      e.currentTarget.appendChild(draggedElement);
    }
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col w-full h-full bg-fixed bg-cover bg-repeat-y">
      <Navbar />
      <div
        className="flex lg:flex-row flex-col flex-wrap lg:justify-between justify-center align-middle"
        onDrop={handleDrop}
        onDragOver={allowDrop}
      >
        <div
          id="income-card"
          draggable
          onDragStart={handleDragStart}
          className="draggable-item"
        >
          <SalesInformationCard title="Receita" value={income} />
        </div>
        <div
          id="avg-total-card"
          draggable
          onDragStart={handleDragStart}
          className="draggable-item"
        >
          <SalesInformationCard title="Ticket médio" value={averageTotalPerOrder} />
        </div>
        <div
          id="avg-items-card"
          draggable
          onDragStart={handleDragStart}
          className="draggable-item"
        >
          <SalesInformationCard title="Média de produtos por pedido" value={averageItemsPerOrder} />
        </div>
        <div
          id="avg-price-card"
          draggable
          onDragStart={handleDragStart}
          className="draggable-item"
        >
          <SalesInformationCard title="Média valor por produto" value={averagePricePerItem} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-10"
        onDrop={handleDrop}
        onDragOver={allowDrop}>
        <div className="w-full md:w-[1/2] p-2">
          <Card
            id="line-chart-card"
            draggable
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            className="flex flex-col p-4 w-full max-h-auto gap-3 rounded-xl draggable-item"
          >
            <CardHeader className="font-bold text-xl">
              Pedidos feitos (nos últimos 30 dias)
            </CardHeader>
            <CardBody>
              <LineChart data={ordersTotal} />
            </CardBody>
          </Card>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <Card
            id="pie-chart-card"
            draggable
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            className="flex flex-col justify-center p-4 max-w-full max-h-auto gap-3 rounded-xl draggable-item"
          >
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