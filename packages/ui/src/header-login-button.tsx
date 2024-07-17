"use client";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export function HeaderLoginButton() {
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("auth0");
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="ui-flex ui-items-center ui-space-x-2"
    >
      <button
        type="submit"
        className="ui-btn ui-flex ui-items-center ui-space-x-2 ui-px-4 ui-py-2 ui-border ui-border-purple-700 ui-rounded-md ui-text-white ui-bg-purple-700 ui-hover:bg-purple-800 ui-transition-all ui-duration-200"
      >
        <LogIn className="ui-w-5 ui-h-5 ui-mr-2 ui-text-white" />
        <span className="ui-font-medium">Login</span>
      </button>
    </form>
  );
}
