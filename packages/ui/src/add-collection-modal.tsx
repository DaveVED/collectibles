"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { SelectUser } from "@repo/public-db/schema";
import { X } from "lucide-react";
import { CollectionDetails } from "./collections";

interface AddCollectionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userProfile: SelectUser;
  onAddCollection: (newCollection: CollectionDetails) => void;
}

interface Collection {
  id: string;
  name: string;
  language: string;
  imageUrl?: string;
}

export const AddCollectionModal: React.FC<AddCollectionModalProps> = ({
  open,
  setOpen,
  userProfile,
  onAddCollection,
}) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>(
    [],
  );

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/api/collections/types");
        if (response.ok && response.status === 200) {
          const data = await response.json();
          setCollections(data.collections);
        } else {
          console.error("Failed to fetch collections: ", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      }
    };

    if (open) {
      fetchCollections();
    }
  }, [open]);

  useEffect(() => {
    const filterCollections = () => {
      let filtered = collections;
      if (searchQuery) {
        filtered = filtered.filter((collection) =>
          collection.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }
      if (selectedLanguage !== "All") {
        filtered = filtered.filter(
          (collection) => collection.language === selectedLanguage,
        );
      }
      setFilteredCollections(filtered);
    };

    filterCollections();
  }, [searchQuery, selectedLanguage, collections]);

  const handleAddCollection = async (collectionId: string) => {
    const response = await fetch("/api/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userProfile.id,
        collectionTypeId: collectionId,
      }),
    });

    if (response.ok) {
      const newCollection = await response.json();
      onAddCollection(newCollection);
      setOpen(false);
    } else {
      console.error("Failed to add collection:", response.status);
    }
  };

  const getLanguageIcon = (language: string) => {
    return language === "Japanese" ? "🇯🇵" : "🇬🇧";
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="ui-hidden">Open Modal</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="ui-fixed ui-inset-0 ui-bg-black ui-bg-opacity-50 ui-z-50" />
        <div className="ui-fixed ui-inset-0 ui-flex ui-items-center ui-justify-center ui-p-4 ui-z-50">
          <Dialog.Content className="ui-bg-white ui-rounded-lg ui-shadow-lg ui-w-full sm:ui-w-3/4 lg:ui-w-1/2 ui-max-w-md ui-overflow-y-auto ui-max-h-screen ui-my-8">
            <div className="ui-sticky ui-top-0 ui-bg-white ui-px-6 ui-py-4 ui-border-b ui-border-gray-200">
              <div className="ui-flex ui-items-center ui-justify-between ui-mb-4">
                <span className="ui-text-xl ui-font-semibold ui-text-center ui-w-full">
                  Add Collection
                </span>
                <Dialog.Close asChild>
                  <button className="ui-absolute ui-right-4 ui-top-4 ui-text-gray-500 hover:ui-text-gray-700">
                    <X size={24} />
                  </button>
                </Dialog.Close>
              </div>
              <div className="ui-flex ui-gap-4 ui-mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="ui-flex-1 ui-px-4 ui-py-2 ui-border ui-border-gray-300 ui-rounded-lg focus:ui-outline-none focus:ui-border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                  className="ui-px-4 ui-py-2 ui-border ui-border-gray-300 ui-rounded-lg focus:ui-outline-none focus:ui-border-blue-500"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="All">All Languages</option>
                  <option value="English">English</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>
            </div>
            <div className="ui-flex ui-flex-wrap ui-gap-4 ui-px-6 ui-py-4">
              {filteredCollections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => handleAddCollection(collection.id)}
                  className="ui-flex ui-items-center ui-justify-between ui-w-full ui-h-32 ui-bg-gray-100 ui-rounded-lg ui-px-4 ui-py-2 hover:ui-bg-gray-200 focus:ui-outline-none"
                >
                  <span className="ui-text-gray-700">{collection.name}</span>
                  <span className="ui-text-lg">
                    {getLanguageIcon(collection.language)}
                  </span>
                </button>
              ))}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
