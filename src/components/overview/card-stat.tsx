import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface CardStatsProps {
  title: string;
  total: string;
  icon: React.ReactNode;
}

export function CardStat({ title, total, icon }: CardStatsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium tabular-nums">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
      </CardContent>
    </Card>
  );
}
