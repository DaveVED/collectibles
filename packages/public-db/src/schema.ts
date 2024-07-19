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

export const opCardTypesTable = pgTable("op_card_types", {
  id: serial("id").primaryKey(),
  type_name: text("type_name").unique()
});

export const opCardsTable = pgTable("op_cards", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  name: text("name"),
  card_type_id: integer("card_type_id").references(() => opCardTypesTable.id),
  collection_type_id: integer("collection_type_id").references(() => collectionTypesTable.id),
});

export const userCardsTable = pgTable("users_cards", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  user_id: uuid("user_id").references(() => usersTable.id),
  card_id: uuid("card_id").references(() => opCardsTable.id),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertCollectiontypes = typeof collectionTypesTable.$inferInsert;
export type SelectCollectionTypes = typeof collectionTypesTable.$inferSelect;

export type InsertCollections = typeof collectionsTable.$inferInsert;
export type SelectCollections = typeof collectionsTable.$inferSelect;

export type InsertOpCardTypes = typeof opCardTypesTable.$inferInsert;
export type SelectOpCardTypes = typeof opCardTypesTable.$inferSelect;

export type InsertOpCards = typeof opCardsTable.$inferInsert;
export type SelectOpCards= typeof opCardsTable.$inferSelect;

export type InsertUserCards= typeof userCardsTable.$inferInsert;
export type SelectUserCards= typeof userCardsTable.$inferSelect;