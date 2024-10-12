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
    <div className="ui-fixed ui-top-4 ui-right-4 ui-z-50">
      <input
        type="checkbox"
        id="dark-toggle"
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className="ui-hidden"
      />
      <label
        htmlFor="dark-toggle"
        className="
          ui-bg-gray-200 dark:ui-bg-gray-700
          ui-flex ui-items-center ui-justify-between
          ui-p-1 ui-rounded-full ui-cursor-pointer ui-relative
          ui-transition-colors ui-duration-300
          ui-w-10 ui-h-5
          sm:ui-w-12 sm:ui-h-6
        "
      >
        <FaMoon className="ui-text-gray-500 dark:ui-text-yellow-300 ui-text-xs sm:ui-text-sm" />
        <FaSun className="ui-text-yellow-500 dark:ui-text-gray-300 ui-text-xs sm:ui-text-sm" />
        <span
          className={`ui-bg-white ui-rounded-full ui-absolute ui-top-0.5 ui-left-0.5 ui-transform ui-transition-transform ui-duration-300
            ${isDarkMode ? "ui-translate-x-5 sm:ui-translate-x-6" : ""}
            ui-w-4 ui-h-4 sm:ui-w-5 sm:ui-h-5
          `}
        ></span>
      </label>
    </div>
  );
};
