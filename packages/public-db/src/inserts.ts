import { db } from ".";
import {
  collectionsTable,
  InsertCollections,
  InsertUser,
  usersTable,
} from "./schema";

export async function createUser(user: InsertUser): Promise<any> {
  return await db.insert(usersTable).values(user).returning();
}

export async function createUserCollection(
  collection: InsertCollections,
): Promise<any> {
  return await db.insert(collectionsTable).values(collection);
}
