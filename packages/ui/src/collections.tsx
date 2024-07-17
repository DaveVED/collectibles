"use client"
import { SelectUser } from "@repo/public-db/schema";
import { Search } from 'lucide-react';
import { OwnedCollections } from "./owned-collections";
import { OwnedCollectionsSearch } from "./owned-collections-serach";


interface CollectionProps {
    userProfile: SelectUser;
  }
  
  
export async function Collection({userProfile}: CollectionProps) {
  // Function to handle adding a new collection

  return (
    <div className="ui-mt-8">
        <OwnedCollections userProfile={userProfile}/>
        <OwnedCollectionsSearch />
  </div>
  );
}
