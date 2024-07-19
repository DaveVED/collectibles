"use client";
import { useState } from "react";
import { SelectUser } from "@repo/public-db/schema";
import { UserPropSession } from "./user-profile";
import { CollectionDetails } from "./collections";
import { AddCollectionButton } from "./add-collection-button";
import { DeleteCollectionModal } from "./delete-collection-modal";
import { X } from "lucide-react";

interface OwnedCollectionsProps {
  session: UserPropSession;
  userProfile: SelectUser;
  userCollections: CollectionDetails[];
  onSelectCollection: (name: string) => void;
  onAddCollection: (newCollection: CollectionDetails) => void;
}

export function OwnedCollections({
  session,
  userProfile,
  userCollections,
  onSelectCollection,
  onAddCollection,
}: OwnedCollectionsProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionDetails | null>(null);

  const canEdit = userProfile.email === session?.user?.email;

  const handleDeleteClick = (collection: CollectionDetails) => {
    setSelectedCollection(collection);
    setOpenDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCollection) {
      console.log(`Deleting collection with ID: ${selectedCollection.id}`);
      setOpenDeleteModal(false);
    }
  };

  return (
    <>
      <div className="ui-flex ui-items-center ui-justify-between ui-mb-4">
        <h2 className="ui-text-lg ui-font-semibold ui-text-gray-700 ui-mb-2">
          Owned Collections
        </h2>
        {canEdit && (
          <AddCollectionButton
            userProfile={userProfile}
            onAddCollection={onAddCollection}
          />
        )}
      </div>
      <div className="ui-flex ui-flex-wrap ui-gap-2 ui-mb-4">
        {userCollections.map((collection) => (
          <div
            key={collection.id}
            className="ui-bg-gray-200 ui-rounded-full ui-px-4 ui-py-2 ui-text-gray-700 ui-text-xs sm:ui-text-sm ui-flex ui-items-center ui-cursor-pointer hover:ui-bg-gray-300 relative"
            onClick={() => onSelectCollection(collection.collectionTypeName)}
          >
            <span className="ui-mr-2">{collection.collectionTypeName}</span>
            <span>
              {collection.collectionTypeLanguage === "Japanese" ? "🇯🇵" : "🇬🇧"}
            </span>
            {canEdit && (
              <button
                className="ui-ml-2 ui-text-gray-400 hover:ui-text-gray-600 absolute right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(collection);
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedCollection && (
        <DeleteCollectionModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDeleteConfirm}
          collectionName={selectedCollection.collectionTypeName}
        />
      )}
    </>
  );
}
