"use client";
import React, { useRef, useEffect, useState } from "react";

const LineChart = ({ data }: { data: number[] }) => {
  const [chartWidth, setChartWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const height = 200;
  const numLines = 5;

  const maxDataValue = Math.max(...data);

  const points = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = height - (point / maxDataValue) * height;

      return `${x},${y}`;
    })
    .join(" ");

  const gridLines = () => {
    const lines = [];
    const step = Math.ceil(maxDataValue / numLines);

    for (let i = 0; i <= numLines; i++) {
      const y = (i / numLines) * height;

      lines.push(
        <line
          key={i}
          stroke="#e0e0e0"
          strokeWidth="1"
          x1="60"
          x2={chartWidth}
          y1={y}
          y2={y}
        />,
      );

      lines.push(
        <text
          key={`label-${i}`}
          fill="#b134eb"
          fontSize="16"
          textAnchor="start"
          x="5"
          y={y}
        >
          R${Math.round(step * (numLines - i))}
        </text>,
      );
    }

    return lines;
  };

  useEffect(() => {
    if (containerRef.current) {
      const handleResize = () => {
        setChartWidth(containerRef.current!.offsetWidth);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-full"
    >
      <svg height={height + 30} width={chartWidth}>
        {gridLines()}
        <polyline
          fill="none"
          points={points}
          stroke="#b134eb"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default LineChart;
