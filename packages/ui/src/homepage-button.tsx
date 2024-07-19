"use client"
import { SelectUser } from "@repo/public-db/schema";
import { signIn } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

export function HomepageButton({user}: {user: SelectUser | undefined}) {
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
    if (user?.name) {
        router.push(`/collector/${user.name}`);
    } else {
        e.preventDefault();
        await signIn("auth0");
    }

  };

  return (
    <button 
      onClick={handleSignIn} 
      className="ui-bg-purple-600 ui-text-white ui-font-semibold ui-py-2 ui-px-4 sm:ui-py-2 sm:ui-px-6 ui-rounded-full hover:ui-bg-purple-700 ui-transition ui-duration-300"
    >
      Get started today
    </button>
  );
}
