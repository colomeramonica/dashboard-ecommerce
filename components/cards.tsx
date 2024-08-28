"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function SalesInformationCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="draggable-card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`flex flex-row items-center justify-center lg:px-3 py-8 md:py-10 ${isDragging ? "opacity-50" : ""}`}
    >
      <Card className="w-60 cursor-move">
        <CardHeader className="font-semibold text-xl">{title}</CardHeader>
        <CardBody className="flex flex-row items-center justify-center gap-3">
          <p className="text-2xl font-bold">{value}</p>
        </CardBody>
      </Card>
    </section>
  );
}