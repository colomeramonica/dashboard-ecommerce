import React from "react";

const PieChart = ({ data, size }: { data: any[]; size: number }) => {
  const total = data.reduce(
    (sum: any, item: { value: any }) => sum + item.value,
    0,
  );
  const radius = size / 2;
  const center = size / 2;

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      x,
      y,
      "Z",
    ].join(" ");

    return d;
  };

  const slices = data.map(
    (
      item: { value: number; endAngle: any; color: string | undefined },
      index: number,
    ) => {
      const startAngle = index === 0 ? 0 : data[index - 1].endAngle;
      const endAngle = startAngle + (item.value / total) * 360;

      item.endAngle = endAngle;

      return (
        <path
          key={index}
          d={describeArc(center, center, radius, startAngle, endAngle)}
          fill={item.color}
        />
      );
    },
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <svg height={size} width={size}>
        {slices}
      </svg>
    </div>
  );
};

export default PieChart;
