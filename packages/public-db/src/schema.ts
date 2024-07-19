import {
  uuid,
  text,
  pgTable,
  timestamp,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
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

export const collectionTypesTable = pgTable("collection_types", {
  id: serial("id").primaryKey(),
  name: text("name"),
  language: text("language").unique(),
});

export const collectionsTable = pgTable("collections", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  collection_type_id: integer("collection_type_id")
    .references(() => collectionTypesTable.id)
    .notNull(),
  user_id: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  active: boolean("active").default(true),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertCollectiontypes = typeof collectionTypesTable.$inferInsert;
export type SelectCollectionTypes = typeof collectionTypesTable.$inferSelect;

export type InsertCollections = typeof collectionsTable.$inferInsert;
export type SelectCollections = typeof collectionsTable.$inferSelect;
