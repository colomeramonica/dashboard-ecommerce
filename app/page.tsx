"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

import LineChart from "@/components/line-chart";
import { Navbar } from "@/components/navbar";
import SalesInformationCard from "@/components/cards";
import PieChart from "@/components/pie-chart";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  const mostPopularProducts = [
    {
      label: "Produto 1",
      value: 30,
      color: "#a134eb",
    },
    {
      label: "Produto 2",
      value: 40,
      color: "#345eeb",
    },
    {
      label: "Produto 3",
      value: 30,
      color: "#eb349b",
    },
  ];

  const graphicsSize = () => {
    if (windowWidth > 768) {
      return 400;
    }

    return 200;
  };

  return (
    <section className="flex flex-col w-full h-full">
      <Navbar />
      <div className="flex lg:flex-row flex-col flex-wrap lg:justify-between justify-center align-middle">
        <SalesInformationCard title="Receita" value="R$172.800" />
        <SalesInformationCard title="Ticket médio" value="R$350.21" />
        <SalesInformationCard title="Média itens por pedido" value="12" />
        <SalesInformationCard title="Preço médio por item" value="R$1,16 mil" />
      </div>
      <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-10">
        <div className="w-full md:w-1/2 p-2">
          <Card className="flex flex-col p-4 max-w-full max-h-auto gap-3 rounded-xl">
            <CardHeader className="font-bold text-xl">
              Pedidos feitos (nos últimos 30 dias)
            </CardHeader>
            <CardBody>
              <LineChart
                data={[25, 16, 1.25, 8.15, 0.713, 10.533, 1.611, 21.09, 0.45]}
                size={graphicsSize()}
              />
            </CardBody>
          </Card>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <Card className="flex flex-col justify-center p-4 max-w-full max-h-auto gap-3 rounded-xl">
            <CardHeader className="font-bold text-xl">
              Pedidos feitos (nos últimos 30 dias)
            </CardHeader>
            <CardBody>
              <PieChart data={mostPopularProducts} size={graphicsSize()} />
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
