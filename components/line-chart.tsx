"use client";
import React from "react";

const LineChart = ({ data, size }: { data: number[]; size: number }) => {
  const height = size / 2 + 70;
  const numLines = 5;

  const maxDataValue = Math.max(...data);

  const points = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * size;
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
          x2={size}
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
          {Math.round(step * (numLines - i))} mil
        </text>,
      );
    }

    return lines;
  };

  return (
    <svg height={height} width={size}>
      {gridLines()}
      <polyline fill="none" points={points} stroke="#b134eb" strokeWidth="2" />
    </svg>
  );
};

export default LineChart;
