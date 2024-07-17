"use client";

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import Image from 'next/image';
import { SelectUser } from "@repo/public-db/schema";
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EditProfileModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userProfile: SelectUser;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  setOpen,
  userProfile,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile.bio || '');
  const [location, setLocation] = useState(userProfile.location || '');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSave = async () => {
    // Check if any field has changed
    if (name !== userProfile.name || bio !== userProfile.bio || location !== userProfile.location) {
      // Logic to save updated profile details
      const result = await updateUserProfile({ id: userProfile.id, name, bio, location });
      if (result?.message === 'User already exists') {
        setError('User already exists. Please choose a different username.');
      } else if (result?.message === 'User not found') {
        setError('User not found. Please try again.');
      } else {
        router.push(`/collector/${name}`);
        setOpen(false);
      }
    }
  };

  const updateUserProfile = async (updatedProfile: { id: string, name: string, bio: string, location: string }) => {
    console.log(`Before update: ${JSON.stringify(userProfile)}`);
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`After update: ${JSON.stringify(data)}`);
        return data;
      } else {
        const errorData = await response.json();
        return errorData;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
                <span className="ui-text-xl ui-font-semibold">Edit Profile</span>
                <button onClick={handleSave} className="ui-px-4 ui-py-2 ui-bg-purple-500 ui-text-white ui-rounded hover:ui-bg-purple-600">
                  Save
                </button>
              </div>
            </div>
            {error && <div className="ui-mb-4 ui-text-red-500 ui-px-6">{error}</div>}
            <div className="ui-flex ui-flex-col ui-items-center ui-mb-4 ui-px-6">
              <Image
                src={userProfile.image!}
                className="ui-rounded-lg ui-w-24 ui-h-24 sm:ui-w-28 sm:ui-h-28 md:ui-w-32 md:ui-h-32"
                alt="Profile Picture"
                width={150}
                height={150}
              />
            </div>
            <div className="ui-mb-4 ui-px-6">
              <label className="ui-block ui-text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ui-mt-1 ui-block ui-w-full ui-px-4 ui-py-2 ui-border ui-rounded"
                placeholder="Name"
              />
            </div>
            <div className="ui-mb-4 ui-px-6">
              <label className="ui-block ui-text-gray-700">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="ui-mt-1 ui-block ui-w-full ui-px-4 ui-py-2 ui-border ui-rounded"
                placeholder="Bio"
              />
            </div>
            <div className="ui-mb-4 ui-px-6">
              <label className="ui-block ui-text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="ui-mt-1 ui-block ui-w-full ui-px-4 ui-py-2 ui-border ui-rounded"
                placeholder="Location"
              />
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
