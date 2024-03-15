DROP INDEX IF EXISTS "score_idx";--> statement-breakpoint
ALTER TABLE "coffee" ALTER COLUMN "roast" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "log" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "coffee" ADD COLUMN "estate" text;--> statement-breakpoint
ALTER TABLE "coffee" ADD COLUMN "sca" integer;--> statement-breakpoint
ALTER TABLE "coffee" ADD COLUMN "personal_sca" integer;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sca_idx" ON "coffee" ("sca");--> statement-breakpoint
ALTER TABLE "coffee" DROP COLUMN IF EXISTS "score";