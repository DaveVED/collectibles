// AddCollectionButton.tsx
"use client";
import { useState } from 'react';
import { SelectUser } from "@repo/public-db/schema";
import { Plus } from 'lucide-react';
import { AddCollectionModal } from './add-collection-modal';

interface AddCollectionButtonProps {
  userProfile: SelectUser;
}

export function AddCollectionButton({ userProfile }: AddCollectionButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleAddCollection = () => {

    setOpenModal(true); 
  };

  return (
    <>
      <button
        onClick={handleAddCollection}
        className="ui-flex ui-items-center ui-bg-purple-500 ui-text-white ui-rounded-lg ui-px-4 ui-py-2 sm:ui-py-3 sm:ui-px-6 hover:ui-bg-purple-600 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-purple-500"
      >
        <Plus className="ui-mr-2" size={20} />
        <span className="hidden sm:inline">Add Collection</span>
      </button>
      <AddCollectionModal open={openModal} setOpen={setOpenModal} userProfile={userProfile} />
    </>
  );
}
