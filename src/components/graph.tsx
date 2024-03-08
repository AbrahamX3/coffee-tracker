import { format, monthDays } from "@formkit/tempo";
import { cn } from "~/lib/utils";
interface ContributionGraphProps {
  totalsByDate: { date: string; total: number }[];
  month: number;
}

export default function ContributionGraph({
  totalsByDate,
  month,
}: ContributionGraphProps) {
  // Get the current month and year
  const currentDate = new Date();
  const totalDays = monthDays(currentDate);

  const currentYear = currentDate.getFullYear();
  const currentMonth = month; // Months are zero-indexed

  const currentMonthLabels = Array.from({ length: totalDays }, (_, i) =>
    format(new Date(currentYear, currentMonth - 1, i + 1), "YYYY-MM-DD"),
  );

  const currentMonthTotalsMap = new Map(
    totalsByDate.map(({ date, total }) => [date, total]),
  );

  // Define colors based on total values
  const getColorClass = (total: number): string => {
    switch (total) {
      case 0:
        return "bg-gray-500";
      case 1:
        return "bg-green-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-red-500";
      default:
        return "bg-gray-500"; // Default color for other totals
    }
  };

  return (
    <div className="relative flex w-full flex-wrap gap-2">
      {currentMonthLabels.map((date, index) => (
        <div
          key={index}
          className={cn(
            "mr-1 aspect-square size-8",
            getColorClass(currentMonthTotalsMap.get(date) ?? 0),
          )}
          title={`${date} - Total: ${currentMonthTotalsMap.get(date) ?? 0}`}
        />
      ))}
    </div>
  );
}
