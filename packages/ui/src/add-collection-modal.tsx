// AddCollectionModal.tsx
"use client";
import * as Dialog from '@radix-ui/react-dialog';
import { SelectUser } from "@repo/public-db/schema";
import { X } from 'lucide-react';

interface AddCollectionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userProfile: SelectUser;
}

export const AddCollectionModal: React.FC<AddCollectionModalProps> = ({
  open,
  setOpen,
  userProfile,
}) => {

  const collections = [
    {
      id: '1',
      name: 'scarlet-and-violet',
      imageUrl: '/images/scarlet-and-violet.jpg',
    },
    {
      id: '2',
      name: 'romance-dawn',
      imageUrl: '/images/romance-dawn.jpg',
    },
  ];

  const handleAddCollection = (collectionId: string) => {
    console.log(`Add Collection clicked for collection id: ${collectionId}`);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="ui-hidden">Open Modal</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="ui-fixed ui-inset-0 ui-bg-black ui-bg-opacity-50 ui-z-50" />
        <div className="ui-fixed ui-inset-0 ui-flex ui-items-center ui-justify-center ui-p-4 ui-z-50">
          <Dialog.Content className="ui-bg-white ui-rounded-lg ui-shadow-lg ui-w-full sm:ui-w-3/4 lg:ui-w-1/2 ui-max-w-md ui-overflow-y-auto ui-max-h-screen">
            <div className="ui-sticky ui-top-0 ui-bg-white ui-px-6 ui-py-4">
              <div className="ui-flex ui-items-center ui-justify-between ui-mb-4">
                <Dialog.Close asChild>
                  <button>
                    <X size={24} className="ui-text-gray-500 hover:ui-text-gray-700" />
                  </button>
                </Dialog.Close>
                <span className="ui-text-xl ui-font-semibold">Add Collection</span>
              </div>
            </div>
            <div className="ui-flex ui-flex-wrap ui-gap-4 ui-px-6 ui-py-4">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => handleAddCollection(collection.id)}
                  className="ui-flex ui-items-center ui-justify-between ui-w-full ui-h-32 ui-bg-gray-100 ui-rounded-lg ui-px-4 ui-py-2 hover:ui-bg-gray-200 ui-focus:ui-outline-none"
                >
                  <span className="ui-text-gray-700">{collection.name}</span>
                  {/*<img
                    src={collection.imageUrl}
                    alt={collection.name}
                    className="ui-w-24 ui-h-24 ui-object-cover ui-rounded-lg"
                  />*/}
                </button>
              ))}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
