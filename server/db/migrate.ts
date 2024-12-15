import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from "../config";

const runMigrations = async () => {
  const migrationClient = postgres(config.database.url, { max: 1 });
  const db = drizzle(migrationClient);

  try {
    await migrate(db, { migrationsFolder: "server/db/migrations" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Error running migrations:", error);
    throw error;
  } finally {
    await migrationClient.end();
  }
};

runMigrations();
