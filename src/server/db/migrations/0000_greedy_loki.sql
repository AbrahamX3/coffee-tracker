DO $$ BEGIN
 CREATE TYPE "roast" AS ENUM('LIGHT', 'LIGHT_MEDIUM', 'MEDIUM', 'MEDIUM_DARK', 'DARK');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coffee" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"roasterId" integer NOT NULL,
	"processId" integer NOT NULL,
	"region" text NOT NULL,
	"altitude" integer,
	"score" integer,
	"roast" "roast",
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp,
	"active" boolean DEFAULT true,
	CONSTRAINT "coffee_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coffeeOnNote" (
	"coffeeId" integer NOT NULL,
	"notesId" integer NOT NULL,
	CONSTRAINT "coffeeOnNote_coffeeId_notesId_pk" PRIMARY KEY("coffeeId","notesId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coffeeOnVarietal" (
	"coffeeId" integer NOT NULL,
	"varietalId" integer NOT NULL,
	CONSTRAINT "coffeeOnVarietal_coffeeId_varietalId_pk" PRIMARY KEY("coffeeId","varietalId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "log" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"coffeeId" integer NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "note" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "note_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "process" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "process_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roaster" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"instagram" text,
	"website" text,
	CONSTRAINT "roaster_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "varietal" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "varietal_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "date_idx" ON "log" ("date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session" ("userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffee" ADD CONSTRAINT "coffee_roasterId_roaster_id_fk" FOREIGN KEY ("roasterId") REFERENCES "roaster"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffee" ADD CONSTRAINT "coffee_processId_process_id_fk" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffeeOnNote" ADD CONSTRAINT "coffeeOnNote_coffeeId_coffee_id_fk" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffeeOnNote" ADD CONSTRAINT "coffeeOnNote_notesId_note_id_fk" FOREIGN KEY ("notesId") REFERENCES "note"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffeeOnVarietal" ADD CONSTRAINT "coffeeOnVarietal_coffeeId_coffee_id_fk" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffeeOnVarietal" ADD CONSTRAINT "coffeeOnVarietal_varietalId_varietal_id_fk" FOREIGN KEY ("varietalId") REFERENCES "varietal"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "log" ADD CONSTRAINT "log_coffeeId_coffee_id_fk" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
