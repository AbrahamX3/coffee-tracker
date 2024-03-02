import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { type BuildQueryResult } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "~/env.js";
import * as schema from "./schema";

export const connection: NeonQueryFunction<boolean, boolean> = neon(
  env.NODE_ENV === "production" ? env.DATABASE_URL : env.SHADOW_DATABASE_URL,
);

export const db = drizzle(connection, { schema });

type DB = typeof db;
type DbSchemas = NonNullable<DB["_"]["schema"]>;

export type SchemaRelations<
  TTableName extends keyof DbSchemas,
  TExcludeRelations extends keyof NonNullable<
    DbSchemas[TTableName]["relations"]
  > = never,
> = Exclude<
  keyof NonNullable<DbSchemas[TTableName]["relations"]>,
  TExcludeRelations
>;

export type SchemaWithRelations<
  TTableName extends keyof DbSchemas,
  TInclude extends SchemaRelations<TTableName> = never,
> = BuildQueryResult<
  DbSchemas,
  DbSchemas[TTableName],
  { with: { [Key in TInclude]: true } }
>;
