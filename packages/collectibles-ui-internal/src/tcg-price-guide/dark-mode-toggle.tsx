import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <div className="ui-fixed ui-bottom-4 ui-left-1/2 ui-transform ui--translate-x-1/2 sm:ui-top-4 sm:ui-bottom-auto sm:ui-left-auto sm:ui-right-4 sm:ui-translate-x-0 ui-z-50">
      <input
        type="checkbox"
        id="dark-toggle"
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className="ui-hidden"
      />
      <label
        htmlFor="dark-toggle"
        className="ui-bg-gray-200 dark:ui-bg-gray-700 ui-w-12 ui-h-6 ui-flex ui-items-center ui-justify-between ui-p-1 ui-rounded-full ui-cursor-pointer ui-relative sm:ui-w-14 sm:ui-h-8"
      >
        <FaMoon className="ui-text-gray-500 dark:ui-text-yellow-300 ui-text-sm sm:ui-text-base" />
        <FaSun className="ui-text-yellow-500 dark:ui-text-gray-300 ui-text-sm sm:ui-text-base" />
        <span
          className={`ball ui-w-5 ui-h-5 ui-bg-white ui-rounded-full ui-absolute ui-left-0.5 ui-top-0.5 ui-transform ui-transition-transform ui-duration-300 sm:ui-w-6 sm:ui-h-6 ${
            isDarkMode ? "ui-translate-x-6 sm:ui-translate-x-6" : ""
          }`}
        ></span>
      </label>
    </div>
  );
};
