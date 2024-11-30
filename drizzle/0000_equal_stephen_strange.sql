CREATE TABLE IF NOT EXISTS "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"user_id" integer NOT NULL,
	"description" text,
	"habit_type" "habit_type" NOT NULL,
	"goal_type" "goal_type" NOT NULL,
	"start_date" date NOT NULL,
	"target_days" integer,
	"end_date" date,
	"is_active" boolean NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "users" USING btree ("id");