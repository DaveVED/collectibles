"use client";
import { useState } from "react";
import { SelectUser } from "@repo/public-db/schema";
import { UserPropSession } from "./user-profile";
import { OwnedCollections } from "./owned-collections";
import { OwnedCollectionsSearch } from "./owned-collections-search";
import { SelectedCollectionDisplay } from "./selected-collection-display";

export interface CollectionDetails {
  id: string;
  collectionTypeName: string;
  collectionTypeLanguage: string;
  collectionTypeId: number;
  userId: string;
  createdAt: string;
  active: boolean;
}

interface CollectionProps {
  session: UserPropSession;
  userProfile: SelectUser;
  userCollections: CollectionDetails[];
}

export function Collection({
  session,
  userProfile,
  userCollections: initialCollections,
}: CollectionProps) {
  const [userCollections, setUserCollections] =
    useState<CollectionDetails[]>(initialCollections);
  const [selectedCollectionName, setSelectedCollectionName] = useState<
    string | undefined
  >(undefined);

  const handleSelectCollection = (name: string) => {
    setSelectedCollectionName(name);
  };

  const handleAddCollection = (newCollection: CollectionDetails) => {
    setUserCollections((prevCollections) => [
      ...prevCollections,
      newCollection,
    ]);
  };

  return (
    <div className="ui-mt-8">
      <OwnedCollections
        session={session}
        userProfile={userProfile}
        userCollections={userCollections}
        onSelectCollection={handleSelectCollection}
        onAddCollection={handleAddCollection}
      />
      <OwnedCollectionsSearch />
      {selectedCollectionName && (
        <SelectedCollectionDisplay collectionName={selectedCollectionName} />
      )}
    </div>
  );
}
