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
    <div
      className="
        z-50
        lg:fixed lg:top-4 lg:right-4
        flex justify-end
        p-2
      "
    >
      <input
        type="checkbox"
        id="dark-toggle"
        checked={isDarkMode}
        onChange={toggleDarkMode}
        className="hidden"
      />
      <label
        htmlFor="dark-toggle"
        className="
          bg-gray-200 dark:bg-gray-700
          flex items-center justify-between
          p-1 rounded-full cursor-pointer relative
          transition-colors duration-300
          w-10 h-5
          sm:w-12 sm:h-6
        "
      >
        <FaMoon className="text-gray-500 dark:text-yellow-300 text-xs sm:text-sm" />
        <FaSun className="text-yellow-500 dark:text-gray-300 text-xs sm:text-sm" />
        <span
          className={`bg-white rounded-full absolute top-0.5 left-0.5 transform transition-transform duration-300
            ${isDarkMode ? "translate-x-5 sm:translate-x-6" : ""}
            w-4 h-4 sm:w-5 sm:h-5
          `}
        ></span>
      </label>
    </div>
  );
};
