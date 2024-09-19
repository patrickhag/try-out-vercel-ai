ALTER TABLE "questions" ALTER COLUMN "choices" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "choices" DROP NOT NULL;