import React from "react";

export const Header = (): JSX.Element => {
  return (
    <div className="ui-flex ui-items-center ui-justify-center ui-flex-col sm:ui-flex-row sm:ui-justify-between ui-mb-6">
      <div className="ui-flex ui-items-center ui-space-x-2">
        <h1 className="ui-text-2xl sm:ui-text-3xl lg:ui-text-4xl ui-font-display ui-font-bold ui-flex ui-items-center">
          <span className="ui-text-primary dark:ui-text-primary">TCG</span>{" "}
          <span className="ui-text-secondary dark:ui-text-gray-300">
            Price Guide
          </span>
          <span className="ui-inline-flex ui-items-center ui-px-1 ui-py-0.5 ui-text-xs sm:ui-text-2xs ui-font-semibold ui-text-white ui-bg-primary-dark ui-border ui-border-gray-700 ui-rounded ui-transition-colors ui-duration-200 ui-leading-none ui-ml-2 dark:ui-bg-gray-900 dark:ui-border-gray-500 ui-self-center">
            Beta
          </span>
        </h1>
      </div>
    </div>
  );
};
