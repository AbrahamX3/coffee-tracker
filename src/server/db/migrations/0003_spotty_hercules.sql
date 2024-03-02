CREATE TABLE IF NOT EXISTS "process" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "process_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "coffee" ADD COLUMN "processId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffee" ADD CONSTRAINT "coffee_processId_process_id_fk" FOREIGN KEY ("processId") REFERENCES "process"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
