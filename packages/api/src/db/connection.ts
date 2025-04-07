import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: "postgresql://admin:password@127.0.0.1:5432/copito", // process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, casing: "snake_case" });
