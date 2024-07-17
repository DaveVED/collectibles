"use client";
import Image from "next/image";
import { SelectUser } from "@repo/public-db/schema";
import { Edit3, MapPin, Calendar, Users, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { EditProfileModal } from "./edit-profile-modal";

interface UserProfileHeaderProps {
  userProfile: SelectUser;
}

export function UserProfileHeader({
  userProfile,
}: UserProfileHeaderProps) {
  const [open, setOpen] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(userProfile.joined));

  return (
    <div className="ui-flex ui-flex-col ui-items-center ui-bg-white ui-shadow-sm ui-rounded-lg ui-p-4 sm:ui-p-6 ui-gap-4 sm:ui-gap-6 ui-w-full sm:ui-flex-row">
      <div className="ui-flex-shrink-0 ui-flex ui-flex-col ui-items-center">
        <Image
          src={userProfile.image!}
          className="ui-rounded-lg ui-w-24 ui-h-24 sm:ui-w-28 sm:ui-h-28 md:ui-w-32 md:ui-h-32"
          alt="Picture of the author"
          width={150}
          height={150}
        />
      </div>
      <div className="ui-flex-grow ui-flex ui-flex-col ui-items-center sm:ui-items-start">
        <div className="ui-flex ui-flex-col ui-items-center sm:ui-flex-row ui-justify-between ui-w-full">
          <button
            onClick={() => setOpen(true)}
            className="ui-text-gray-500 hover:ui-text-gray-700 ui-flex ui-items-center ui-mb-2 sm:ui-mb-0 sm:ui-order-2 sm:ui-ml-2"
          >
            <Edit3 size={20} />
            <span className="ui-ml-2">Edit Profile</span>
          </button>
          <span className="ui-text-lg sm:ui-text-xl md:ui-text-2xl ui-font-semibold ui-text-gray-700 ui-mt-1 sm:ui-mt-0">
            @{userProfile.name}
          </span>
        </div>
        <div className="ui-text-sm sm:ui-text-base md:ui-text-lg ui-text-gray-600 ui-mt-1 sm:ui-mt-2">
          {userProfile.bio}
        </div>
        <div className="ui-flex ui-flex-col sm:ui-flex-row ui-justify-between ui-items-center ui-text-gray-600 ui-w-full ui-mt-4">
          <div className="ui-flex ui-items-center ui-mb-2 sm:ui-mb-0 sm:ui-mr-4">
            <Users className="ui-w-4 ui-h-4 ui-mr-2" />
            <span>123</span>
            <UserPlus className="ui-w-4 ui-h-4 ui-ml-4 ui-mr-2" />
            <span>456</span>
          </div>
          <div className="ui-flex ui-items-center">
            <MapPin className="ui-w-4 ui-h-4 ui-mr-2" />
            <span>{userProfile.location}</span>
            <Calendar className="ui-w-4 ui-h-4 ui-ml-4 ui-mr-2" />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
      </div>
      <EditProfileModal open={open} setOpen={setOpen} userProfile={userProfile} />
    </div>
  );
}
