DO $$ BEGIN
 CREATE TYPE "public"."question_type" AS ENUM('text', 'paragraph', 'checkbox', 'multiplechoice', 'code', 'range', 'linearscale', 'dropdown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DROP TABLE "choices";--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "choices" jsonb DEFAULT '{}'::jsonb NOT NULL;