import type { Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema/*",
  out: "./server/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
