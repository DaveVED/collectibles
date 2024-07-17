"use client"
import { SelectUser } from "@repo/public-db/schema";
import { Plus } from 'lucide-react';

interface AddCollectionButtonProps {
  userProfile: SelectUser;
}

export async function AddCollectionButton({ userProfile }: AddCollectionButtonProps) {
  const handleAddCollection = () => {
    console.log("Add Collection clicked");
  };

  return (
    <button
      className="ui-flex ui-items-center ui-bg-purple-500 ui-text-white ui-rounded-lg ui-px-4 ui-py-2 sm:ui-py-3 sm:ui-px-6 hover:ui-bg-purple-600 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-purple-500"
      onClick={handleAddCollection}
    >
      <Plus className="ui-mr-2" size={20} />
      <span className="hidden sm:inline">Add Collection</span>
    </button>
  );
}
