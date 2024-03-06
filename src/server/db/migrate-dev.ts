import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

void (async () => {
  console.log("--- Development Migrations Started ---");

  const sql: NeonQueryFunction<boolean, boolean> = neon(
    process.env.SHADOW_DATABASE_URL!,
  );

  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "./src/server/db/migrations" });
  console.log("--- Development Migrations Finished ---");
})();
