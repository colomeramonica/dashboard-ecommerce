"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

import LineChart from "@/components/line-chart";
import { Navbar } from "@/components/navbar";
import SalesInformationCard from "@/components/cards";

export default function Home() {
  return (
    <section className="flex flex-col w-full h-full">
      <Navbar />
      <div className="flex flex-row justify-center p-3">
        <SalesInformationCard title="Receita" value="R$172.800" />
        <SalesInformationCard title="Ticket médio" value="R$350.21" />
        <SalesInformationCard title="Média de itens por pedido" value="12" />
        <SalesInformationCard title="Preço médio por item" value="R$1,16 mil" />
      </div>
      <div className="flex flex-row justify-start p-3">
        <Card className="flex flex-col justify-start p-4 max-w-[780] max-h-[500px] bg-white rounded-xl">
          <CardHeader className="font-bold text-xl">
            Pedidos feitos (nos últimos 30 dias)
          </CardHeader>
          <CardBody>
            <LineChart
              data={[25, 16, 1.25, 8.15, 0.713, 10.533, 1.611, 21.09, 0.45]}
            />
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
