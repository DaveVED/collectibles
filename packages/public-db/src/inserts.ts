import { db } from ".";
import { InsertUser, usersTable } from "./schema";

export async function createUser(user: InsertUser): Promise<any> {
  return await db.insert(usersTable).values(user).returning();
}
