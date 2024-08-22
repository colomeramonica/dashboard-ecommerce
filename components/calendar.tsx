import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [days, setDays] = useState<Dayjs[]>([]);

  useEffect(() => {
    const startDay = currentDate.startOf("month").startOf("week");
    const endDay = currentDate.endOf("month").endOf("week");

    const date = startDay.clone().subtract(1, "day");
    const daysArray: Dayjs[] = [];

    while (date.isBefore(endDay, "day")) {
      daysArray.push(date.add(1, "day").clone());
    }

    setDays(daysArray);
  }, [currentDate]);

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <button
          className="text-xl font-bold p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
        >
          {"<"}
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          className="text-xl font-bold p-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setCurrentDate(currentDate.add(1, "month"))}
        >
          {">"}
        </button>
      </header>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Renderizando os dias */}
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex justify-center items-center h-20 p-2 rounded-lg ${
              day.isSame(currentDate, "month")
                ? "bg-blue-100"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {day.format("D")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
