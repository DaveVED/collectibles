"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface DeleteCollectionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  collectionName: string;
}

export const DeleteCollectionModal: React.FC<DeleteCollectionModalProps> = ({
  open,
  setOpen,
  onConfirm,
  collectionName,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="ui-fixed ui-inset-0 ui-bg-black ui-bg-opacity-50 ui-z-50" />
        <div className="ui-fixed ui-inset-0 ui-flex ui-items-center ui-justify-center ui-p-4 ui-z-50">
          <Dialog.Content className="ui-bg-white ui-rounded-lg ui-shadow-lg ui-w-full sm:ui-w-3/4 lg:ui-w-1/2 ui-max-w-md ui-overflow-y-auto ui-max-h-screen ui-my-8">
            <div className="ui-sticky ui-top-0 ui-bg-white ui-px-6 ui-py-4 ui-border-b ui-border-gray-200">
              <div className="ui-flex ui-items-center ui-justify-between ui-mb-4">
                <span className="ui-text-xl ui-font-semibold ui-text-center ui-w-full">
                  Confirm Deletion
                </span>
                <Dialog.Close asChild>
                  <button className="ui-absolute ui-right-4 ui-top-4 ui-text-gray-500 hover:ui-text-gray-700">
                    <X size={24} />
                  </button>
                </Dialog.Close>
              </div>
              <p className="ui-px-6 ui-py-4">
                Are you sure you want to delete the collection{" "}
                <strong>{collectionName}</strong>?
              </p>
              <div className="ui-flex ui-justify-end ui-gap-4 ui-px-6 ui-py-4">
                <button
                  onClick={() => setOpen(false)}
                  className="ui-bg-gray-300 ui-text-gray-700 ui-rounded-lg ui-px-4 ui-py-2 hover:ui-bg-gray-400 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="ui-bg-red-500 ui-text-white ui-rounded-lg ui-px-4 ui-py-2 hover:ui-bg-red-600 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
