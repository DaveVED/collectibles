import { eq } from "drizzle-orm";
import { db } from ".";
import {
  collectionsTable,
  collectionTypesTable,
  SelectCollectionTypes,
  SelectUser,
  usersTable,
} from "./schema";

export async function getUserByEmail(
  email: string,
): Promise<SelectUser | undefined> {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    return result[0] as SelectUser;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return undefined;
  }
}

export async function getUserByName(
  name: string,
): Promise<SelectUser | undefined> {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.name, name));
    return result[0] as SelectUser;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return undefined;
  }
}

export async function getAvailableCollectionTypes(): Promise<any> {
  return db.select().from(collectionTypesTable);
}

export async function getUserCollections(userId: string): Promise<any> {
  const result = await db
    .select({
      collectionId: collectionsTable.id,
      collectionTypeId: collectionsTable.collection_type_id,
      userId: collectionsTable.user_id,
      createdAt: collectionsTable.created_at,
      active: collectionsTable.active,
      collectionTypeName: collectionTypesTable.name,
      collectionTypeLanguage: collectionTypesTable.language,
    })
    .from(collectionsTable)
    .leftJoin(
      collectionTypesTable,
      eq(collectionTypesTable.id, collectionsTable.collection_type_id),
    )
    .where(eq(collectionsTable.user_id, userId));

  return result;
}
