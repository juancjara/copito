import { defineConfig } from "drizzle-kit";

const dbUrl = new URL(process.env.DATABASE_URL!);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema",
  casing: "snake_case",
  dbCredentials: {
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port),
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1),
    ssl: false,
  },
});
