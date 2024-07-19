import React from "react";
import { HomepageButton } from "./homepage-button";
import { SelectUser } from "@repo/public-db/schema";

export function Homepage({user}: {user: SelectUser | undefined}) {
  return (
    <main className="ui-flex ui-items-center ui-justify-center ui-min-h-screen ui-bg-gradient-to-b ui-from-purple-600 ui-to-purple-800 ui-px-4 ui-sm:px-6 ui-lg:px-8 ui-h-screen ui-w-screen ui-overflow-hidden">
      <div className="ui-max-w-3xl ui-w-full ui-text-center ui-p-4 sm:ui-p-6 lg:ui-p-8 ui-bg-white ui-rounded-xl ui-shadow-xl">
        <div className="ui-flex ui-justify-center ui-mb-4 sm:ui-mb-6 lg:ui-mb-8">
          <svg
            className="ui-w-12 ui-h-12 sm:ui-w-16 sm:ui-h-16 ui-text-purple-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 12.93c-1.1.31-2.26.31-3.36 0-.26-.07-.52-.1-.79-.1-1.38 0-2.5 1.12-2.5 2.5 0 .28.22.5.5.5h8c.28 0 .5-.22.5-.5 0-1.38-1.12-2.5-2.5-2.5-.27 0-.53.03-.79.1zM14.5 10H14c-.55 0-1-.45-1-1s.45-1 1-1h.5v-.5c0-.55.45-1 1-1s1 .45 1 1V8h.5c.55 0 1 .45 1 1s-.45 1-1 1H16v.5c0 .55-.45 1-1 1s-1-.45-1-1V10zm-5.5 0c-.55 0-1-.45-1-1s.45-1 1-1h1V8H8.5c-.55 0-1-.45-1-1s.45-1 1-1h1V5.5c0-.55.45-1 1-1s1 .45 1 1V6h1c.55 0 1 .45 1 1s-.45 1-1 1h-1v1c0 .55-.45 1-1 1s-1-.45-1-1V10zm-.5 2h-2v-1c0-.55-.45-1-1-1s-1 .45-1 1v1H3.5c-.55 0-1 .45-1 1s.45 1 1 1H5v1c0 .55.45 1 1 1s1-.45 1-1v-1h1.5c.55 0 1-.45 1-1s-.45-1-1-1z" />
          </svg>
        </div>
        <h1 className="ui-text-3xl sm:ui-text-4xl lg:ui-text-5xl ui-font-extrabold ui-text-purple-800 ui-mb-2 sm:ui-mb-4 lg:ui-mb-6">
          Welcome to Collectibles
        </h1>
        <p className="ui-text-lg sm:ui-text-xl ui-text-gray-600 ui-mb-4 sm:ui-mb-6 lg:ui-mb-8">
          Your one-stop shop for managing your personal collections!
        </p>
        <HomepageButton user={user}/>
      </div>
    </main>
  );
}
