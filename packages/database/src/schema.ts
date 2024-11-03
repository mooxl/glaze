import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const pokemon = pgTable("pokemon", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
});
