import { coffeeRouter } from "~/server/api/routers/coffee";
import { logRouter } from "~/server/api/routers/log";
import { noteRouter } from "~/server/api/routers/note";
import { roasterRouter } from "~/server/api/routers/roaster";
import { varietalRouter } from "~/server/api/routers/varietal";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  log: logRouter,
  roaster: roasterRouter,
  note: noteRouter,
  coffeee: coffeeRouter,
  varietal: varietalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
