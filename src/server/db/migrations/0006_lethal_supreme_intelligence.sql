ALTER TABLE "coffeeOnNote" DROP CONSTRAINT "coffeeOnNote_notesId_varietal_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coffeeOnNote" ADD CONSTRAINT "coffeeOnNote_notesId_note_id_fk" FOREIGN KEY ("notesId") REFERENCES "note"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
