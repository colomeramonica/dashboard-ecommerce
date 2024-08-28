"use client";
import React, { useEffect, useState } from "react";

const PieChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const [size, setSize] = useState(0);

  const total = data.reduce((sum, { value }) => sum + value, 0);
  const colors = ["#a134eb", "#345eeb", "#eb349b", "#ff6b6b", "#1e90ff", "#53f522"];

  let cumulativeValue = 0;

  useEffect(() => {
    const updateSize = () => {
      const parentSize =
        document.getElementById("chart-container")?.offsetWidth || 0;

      setSize(Math.min(parentSize, 250)); // Limita o tamanho máximo do gráfico a 250px
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const radius = size / 2;
  const center = radius;

  const slices = data.map(({ value, label }, index) => {
    const startAngle = (cumulativeValue / total) * 2 * Math.PI;
    const sliceAngle = (value / total) * 2 * Math.PI;
    const endAngle = startAngle + sliceAngle;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    // Calculate the midpoint angle for the label
    const midAngle = startAngle + sliceAngle / 2;
    const labelX = center + (radius / 1.5) * Math.cos(midAngle);
    const labelY = center + (radius / 1.5) * Math.sin(midAngle);

    cumulativeValue += value;

    return (
      <g key={index}>
        <path
          d={`M${center}, ${center} L${x1}, ${y1} A${radius}, ${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`}
          fill={colors[index % colors.length]}
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text
          x={labelX}
          y={labelY}
          fill="#000"
          fontSize="10"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      </g>
    );
  });

  return (
    <div
      className="flex items-center justify-center w-full h-full"
      id="chart-container"
    >
      <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
        {slices}
      </svg>
    </div>
  );
};

export default PieChart;