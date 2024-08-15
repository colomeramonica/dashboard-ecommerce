"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function SalesInformationCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <section className="flex flex-row items-center justify-center px-3 py-8 md:py-10">
      <Card className="w-[400px] h-[200px]">
        <CardHeader className="font-bold text-2xl">{title}</CardHeader>
        <CardBody className="align-middle items-center justify-center">
          <p className="text-2xl ">{value}</p>
        </CardBody>
      </Card>
    </section>
  );
}
