import { eq } from "drizzle-orm";
import { db } from ".";
import { NextAuthSelectUser, nextAuthUsersTable } from "./schema";

export async function getUserByEmail(
  email: string,
): Promise<NextAuthSelectUser | undefined> {
  try {
    console.log(`email is ${email}`);
    const result = await db
      .select()
      .from(nextAuthUsersTable)
      .where(eq(nextAuthUsersTable.email, email));
    return result[0] as NextAuthSelectUser;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return undefined;
  }
}
