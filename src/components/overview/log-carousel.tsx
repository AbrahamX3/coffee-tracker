import { type LogsData } from "~/app/(public)/page";
import CoffeeTrackerGraph from "~/components/overview/coffee-tracker-graph";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { months } from "~/lib/constants";

interface StatCarousel {
  logs: LogsData;
}

export default function LogCarousel({ logs }: StatCarousel) {
  return (
    <Carousel
      opts={{
        startIndex: new Date().getMonth(),
        loop: true,
      }}
      className="m-6"
    >
      <CarouselContent className="mx-auto p-4">
        {months.slice(0, new Date().getMonth() + 1).map((month) => (
          <CarouselItem key={month.id}>
            <h1 className="pb-2 text-3xl font-bold leading-relaxed tracking-wide">
              {month.month}
            </h1>
            <CoffeeTrackerGraph
              totalsByDate={logs}
              month={month.id}
              key={month.month}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
