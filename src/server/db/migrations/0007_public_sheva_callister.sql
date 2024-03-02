ALTER TABLE "coffeeOnNote" DROP CONSTRAINT "coffeeOnNote_coffeeId_coffee_id_fk";
--> statement-breakpoint
ALTER TABLE "coffeeOnVarietal" DROP CONSTRAINT "coffeeOnVarietal_coffeeId_coffee_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffeeOnNote" ADD CONSTRAINT "coffeeOnNote_coffeeId_coffee_id_fk" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffeeOnVarietal" ADD CONSTRAINT "coffeeOnVarietal_coffeeId_coffee_id_fk" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
