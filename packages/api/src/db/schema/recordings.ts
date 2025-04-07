import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers.js";

export const statusEnum = pgEnum("status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

export const recordings = pgTable("recordings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fileName: varchar({ length: 256 }).notNull(),
  duration: integer(),
  size: integer(),
  radioName: varchar({ length: 256 }).notNull(),
  streamUrl: varchar({ length: 256 }).notNull(),
  status: statusEnum("status").notNull().default("pending"),
  ...timestamps,
});

export type Recordings = typeof recordings.$inferSelect;
