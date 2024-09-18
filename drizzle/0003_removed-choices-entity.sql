DROP TABLE "choices";--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "choices" jsonb;--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN IF EXISTS "orderIndex";