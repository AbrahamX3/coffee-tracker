import { coffeeRouter } from "~/server/api/routers/coffee";
import { logRouter } from "~/server/api/routers/log";
import { noteRouter } from "~/server/api/routers/note";
import { processRouter } from "~/server/api/routers/process";
import { roasterRouter } from "~/server/api/routers/roaster";
import { varietalRouter } from "~/server/api/routers/varietal";
import { createTRPCRouter } from "~/server/api/trpc";
import { statsRouter } from "./routers/stats";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  log: logRouter,
  roaster: roasterRouter,
  note: noteRouter,
  coffee: coffeeRouter,
  varietal: varietalRouter,
  process: processRouter,
  stats: statsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
