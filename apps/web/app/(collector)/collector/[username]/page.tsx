import { authOptions } from "@repo/lib/auth";
import { getUserByName, getUserCollections } from "@repo/public-db/queries";
import { UserProfile } from "@repo/ui/user-profile";
import { getServerSession } from "next-auth";

export default async function Collector({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);
  const { username } = params;
  const fetchedUser = await getUserByName(username);
  if (!fetchedUser) {
    return <div>User does not exist...</div>;
  }
  const userCollections = await getUserCollections(fetchedUser.id);
  return (
    <UserProfile
      userProfile={fetchedUser}
      session={session}
      userCollections={userCollections}
    />
  );
}
