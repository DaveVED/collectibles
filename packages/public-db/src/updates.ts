import { db } from ".";
import { InsertUser, usersTable } from "./schema";
import { eq } from "drizzle-orm";

export type UpdateUser = {
  id: string;
  name: string;
  bio: string;
  location: string;
};
export async function updateUserBasicDetails(user: UpdateUser): Promise<any> {
  if (!user.id) {
    throw new Error("User ID is required for updating a user");
  }

  return await db
    .update(usersTable)
    .set({
      name: user.name,
      bio: user.bio,
      location: user.location,
    })
    .where(eq(usersTable.id, user.id));
}
