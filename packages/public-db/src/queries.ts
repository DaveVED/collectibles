import { eq } from "drizzle-orm";
import { db } from ".";
import { SelectUser, usersTable } from "./schema";

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
