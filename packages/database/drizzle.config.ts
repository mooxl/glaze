import { defineConfig } from "drizzle-kit";

const url = process.env.SERVER_DB_URL;
if (!url) throw new Error("DB_URL not found");

export default defineConfig({
	out: "./drizzle",
	schema: "./src/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url,
	},
});
