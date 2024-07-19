
import { authOptions } from "@repo/lib/auth";
import { getUserByEmail } from "@repo/public-db/queries";
import { SelectUser } from "@repo/public-db/schema";
import { Homepage } from "@repo/ui/homepage";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  let user: SelectUser | undefined;
  if (session?.user?.email) {
    user = await getUserByEmail(session.user.email);
  }
  return <Homepage user={user}/>
}
