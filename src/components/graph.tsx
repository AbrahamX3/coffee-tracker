"use client";

import { format, monthDays } from "@formkit/tempo";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { InfoModal } from "./info-modal";
import { Button } from "./ui/button";
interface ContributionGraphProps {
  totalsByDate: { date: string; total: number }[];
  month: number;
}

export default function ContributionGraph({
  totalsByDate,
  month,
}: ContributionGraphProps) {
  const currentDate = new Date();
  const totalDays = monthDays(currentDate);

  const currentYear = currentDate.getFullYear();
  const currentMonth = month;

  const currentMonthLabels = Array.from({ length: totalDays }, (_, i) =>
    format(new Date(currentYear, currentMonth - 1, i + 1), "YYYY-MM-DD"),
  );

  const currentMonthTotalsMap = new Map(
    totalsByDate.map(({ date, total }) => [date, total]),
  );

  const colorSteps = [
    "bg-gray-500 hover:bg-gray-600",
    "bg-green-500 hover:bg-green-600",
    "bg-yellow-500 hover:bg-yellow-600",
    "bg-red-500 hover:bg-red-600",
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);
  return (
    <>
      <div className="relative flex w-full flex-wrap gap-2">
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
              "mr-1 aspect-square size-8",
              colorSteps[currentMonthTotalsMap.get(date) ?? 0],
              isLoading && date === selectedDate && "animate-ping",
            )}
            title={`${date} - Total: ${currentMonthTotalsMap.get(date) ?? 0}`}
          />
        ))}
      </div>
      <InfoModal
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
}