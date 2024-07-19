"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { SelectUser } from "@repo/public-db/schema";

interface HeaderLoggedInProps {
  sessionUser: Session["user"];
  user: SelectUser | undefined;
}

export function HeaderLoggedIn({ sessionUser, user }: HeaderLoggedInProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut();
  };

  const handleViewProfile = () => {
    if (user?.name) {
      toggleDropdown();
      router.push(`/collector/${user.name}`);
    }
  };

  const handleSettings = () => {
    toggleDropdown();
    router.push(`/settings`);
  };

  return (
    <div className="ui-flex ui-items-center ui-space-x-2 relative">
      {user?.image ? (
        <Image
          src={user.image}
          alt="User Avatar"
          width={40}
          height={40}
          className="ui-rounded-full ui-border ui-border-gray-300 cursor-pointer"
          onClick={toggleDropdown}
        />
      ) : (
        <UserIcon
          className="ui-w-10 ui-h-10 ui-text-gray-600 cursor-pointer"
          onClick={toggleDropdown}
        />
      )}
      {dropdownOpen && (
        <div className="ui-absolute ui-top-full ui-right-0 ui-mt-2 ui-w-56 ui-bg-white ui-border ui-border-gray-200 ui-rounded-md ui-shadow-lg">
          <button
            onClick={handleViewProfile}
            className="ui-w-full ui-text-left ui-px-4 ui-py-3 ui-flex ui-items-center ui-space-x-2 ui-bg-white hover:ui-bg-gray-100 focus:ui-outline-none focus:ui-bg-gray-100"
          >
            {sessionUser?.image ? (
              <Image
                src={user!.image!}
                alt="User Avatar"
                width={24}
                height={24}
                className="ui-rounded-full"
              />
            ) : (
              <UserIcon className="ui-w-6 ui-h-6 ui-text-gray-600" />
            )}
            <div>
              <p className="ui-font-medium">View Profile</p>
              <p className="ui-text-sm ui-text-gray-500">{user?.name}</p>
            </div>
          </button>
          <form onSubmit={handleSignOut} className="ui-w-full">
            <button
              type="submit"
              className="ui-w-full ui-text-left ui-px-4 ui-py-3 ui-flex ui-items-center ui-space-x-2 hover:ui-bg-gray-100 focus:ui-outline-none focus:ui-bg-gray-100"
            >
              <LogOutIcon className="ui-w-6 ui-h-6 ui-text-gray-600" />
              <p className="ui-font-medium">Log Out</p>
            </button>
          </form>
          <div className="ui-border-t ui-border-gray-200">
          <button
              onClick={handleSettings}
              className="ui-w-full ui-text-left ui-px-4 ui-py-3 ui-flex ui-items-center ui-space-x-2 hover:ui-bg-gray-100 focus:ui-outline-none focus:ui-bg-gray-100"
            >
              <SettingsIcon className="ui-w-6 ui-h-6 ui-text-gray-600" />
              <p className="ui-font-medium">Settings</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
