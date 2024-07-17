import { uuid, text, timestamp, pgSchema } from "drizzle-orm/pg-core";

const schema = pgSchema("next_auth");

export const nextAuthUsersTable = schema.table("users", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified"),
  image: text("image"),
});

export type NextAuthInsertUser = typeof nextAuthUsersTable.$inferInsert;
export type NextAuthSelectUser = typeof nextAuthUsersTable.$inferSelect;
