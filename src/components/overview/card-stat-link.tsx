"use client";

import { useRouter } from "next/navigation";
import { Icons } from "~/components/general/icons";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface CardStatsProps {
  title: string;
  total: string;
  icon: Icons;
  url: string;
}

export default function CardStatLink({
  title,
  total,
  icon,
  url,
}: CardStatsProps) {
  const router = useRouter();
  const Icon = Icons[icon];
  return (
    <Card
      className="cursor-pointer transition duration-150 ease-in-out hover:scale-105"
      onClick={() => router.push(url)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium tabular-nums">
          {title}
        </CardTitle>
        <Icon className="h-6 w-6" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
      </CardContent>
    </Card>
  );
}
