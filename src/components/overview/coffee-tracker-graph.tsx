"use client";

import { format, monthDays } from "@formkit/tempo";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { InfoModal } from "./coffee-info-modal";

interface ContributionGraphProps {
  totalsByDate: { date: string; total: number }[];
  month: number;
}

export default function CoffeeTrackerGraph({
  totalsByDate,
  month,
}: ContributionGraphProps) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const totalDays = monthDays(new Date(currentYear, month - 1, 1));

  const currentMonthLabels = Array.from({ length: totalDays }, (_, i) =>
    format(new Date(currentYear, month - 1, i + 1), "YYYY-MM-DD"),
  );

  const currentMonthTotalsMap = new Map(
    totalsByDate.map(({ date, total }) => [date, total]),
  );

  const colorSteps = [
    "bg-gray-500 hover:bg-gray-600",
    "bg-green-500 hover:bg-green-600",
    "bg-yellow-500 hover:bg-yellow-600",
    "bg-red-500 hover:bg-red-600",
    "bg-purple-500 hover:bg-purple-600",
    "bg-pink-500 hover:bg-pink-600",
    "bg-blue-500 hover:bg-blue-600",
    "bg-indigo-500 hover:bg-indigo-600",
    "bg-teal-500 hover:bg-teal-600",
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="relative flex w-full flex-wrap items-center justify-center gap-2 md:justify-start">
        {currentMonthLabels.map((date, index) => (
          <Button
            onClick={() => setSelectedDate(date)}
            disabled={
              date === selectedDate ||
              currentMonthTotalsMap.get(date) === undefined
            }
            key={index}
            variant="outline"
            className={cn(
              "aspect-square size-8",
              colorSteps[currentMonthTotalsMap.get(date) ?? 0],
              isLoading && date === selectedDate && "animate-ping",
            )}
            title={`${date} - Total: ${currentMonthTotalsMap.get(date) ?? 0}`}
          />
        ))}
      </div>
      {selectedDate && (
        <InfoModal
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}
