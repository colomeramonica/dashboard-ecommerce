"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import { ShoppingBagIcon } from "./icons";

export default function SalesInformationCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <section className="flex flex-row items-center justify-center lg:px-3 py-8 md:py-10">
      <Card className="w-60">
        <CardHeader className="font-semibold text-xl">{title}</CardHeader>
        <CardBody className="flex flex-row items-center justify-center gap-3">
          <p className="text-2xl font-bold">{value}</p>
          <ShoppingBagIcon size={20} />
        </CardBody>
      </Card>
    </section>
  );
}
