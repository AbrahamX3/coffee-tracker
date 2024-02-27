import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "~/env.js";
import * as schema from "./schema";

export const connection: NeonQueryFunction<boolean, boolean> = neon(
  env.NODE_ENV === "production" ? env.DATABASE_URL : env.SHADOW_DATABASE_URL,
);

export const db = drizzle(connection, { schema });
