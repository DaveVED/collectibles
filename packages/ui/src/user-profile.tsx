import { SelectUser } from "@repo/public-db/schema";
import { UserProfileHeader } from "./user-profile-header";
import { Collection } from "./collections";

interface UserProfileProps {
  userProfile: SelectUser;
}


export async function UserProfile({ userProfile }: UserProfileProps) {
  // Function to handle adding a new collection


  return (
    <div className="ui-container ui-mx-auto ui-mt-16 ui-max-w-2xl ui-px-4">
      <UserProfileHeader userProfile={userProfile} />
      <Collection userProfile={userProfile}/>
    </div>
  );
}
