import React from "react";

export const Header = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center flex-col sm:flex-row sm:justify-between mb-6">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold flex items-center">
          <span className="text-primary dark:text-primary">TCG</span>{" "}
          <span className="text-secondary dark:text-gray-300">
            Price Guide
          </span>
          <span className="inline-flex items-center px-1 py-0.5 text-xs sm:text-2xs font-semibold text-white bg-primary-dark border border-gray-700 rounded transition-colors duration-200 leading-none ml-2 dark:bg-gray-900 dark:border-gray-500 self-center">
            Beta
          </span>
        </h1>
      </div>
    </div>
  );
};
