CREATE TYPE "public"."status" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TABLE "recordings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recordings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"file_name" varchar(256) NOT NULL,
	"duration" integer,
	"size" integer,
	"radio_name" varchar(256) NOT NULL,
	"stream_url" varchar(256) NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
