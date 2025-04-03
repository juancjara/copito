import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers.js";

export const sample = pgTable("sample", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 256 }),
  ...timestamps,
});
