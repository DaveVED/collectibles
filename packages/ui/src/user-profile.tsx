import { SelectUser } from "@repo/public-db/schema";
import { UserProfileHeader } from "./user-profile-header";
import { Collection } from "./collections";
import { Session } from "next-auth";
import { CollectionDetails } from "./collections";

export type UserPropSession = Session | undefined | null;
interface UserProfileProps {
  userProfile: SelectUser;
  session: UserPropSession;
  userCollections: CollectionDetails[];
}

export function UserProfile({
  userProfile,
  session,
  userCollections,
}: UserProfileProps) {
  return (
    <div className="ui-container ui-mx-auto ui-mt-16 ui-max-w-2xl ui-px-4">
      <UserProfileHeader session={session} userProfile={userProfile} />
      <Collection
        session={session}
        userProfile={userProfile}
        userCollections={userCollections}
      />
    </div>
  );
}
