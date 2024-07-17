import { getUserByName } from "@repo/public-db/queries";
import { UserProfile } from "@repo/ui/user-profile";

export default async function Collector({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const fetchedUser = await getUserByName(username);
  if (!fetchedUser) {
    return <div>User does not exist...</div>;
  }
  return <UserProfile userProfile={fetchedUser} />;
}
