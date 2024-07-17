import { uuid, text, pgTable, timestamp} from "drizzle-orm/pg-core";
import { nextAuthUsersTable } from "@repo/next-auth-db/schema";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  name: text("name").unique().notNull(),
  email: text("email").unique().notNull(),
  image: text("image"),
  bio: text("bio"),
  location: text("location"),
  joined: timestamp("joined").notNull().defaultNow(),
  next_auth_id: uuid("next_auth_id").references(() => nextAuthUsersTable.id),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
