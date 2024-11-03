import { drizzle } from "drizzle-orm/node-postgres";

const url = process.env.SERVER_DB_URL;
if (!url) throw new Error("DB_URL not found");

export const db = drizzle(url);
