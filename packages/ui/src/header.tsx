import { HeaderLoginButton } from "./header-login-button";
import { HeaderLoggedIn } from "./header-logged-in";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@repo/lib/auth";
import { getUserByEmail } from "@repo/public-db/queries";
import { SelectUser } from "@repo/public-db/schema";

export async function Header() {
  const session = await getServerSession(authOptions);
  let user: SelectUser | undefined = undefined;
  if (session && session.user && session.user.email) {
    user = await getUserByEmail(session.user.email);
  }
  const loggedInuser = session?.user;
  return (
    <header className="ui-sticky ui-top-0 ui-z-50 ui-flex ui-items-center ui-justify-between ui-w-full ui-h-16 ui-px-4 ui-border-b ui-border-gray-200 ui-bg-white ui-shadow-md">
      <div className="ui-flex ui-items-center ui-justify-center ui-w-full" />
      <div className="ui-flex ui-items-center ui-justify-end ui-space-x-4 ui-pr-4">
        {loggedInuser ? (
          <HeaderLoggedIn user={user} sessionUser={session.user} />
        ) : (
          <HeaderLoginButton />
        )}
      </div>
    </header>
  );
}
