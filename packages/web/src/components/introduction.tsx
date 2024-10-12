import React from "react";

export const Introduction = (): JSX.Element => {
  return (
    <div className="max-w-lg sm:max-w-2xl lg:max-w-4xl mx-auto text-center mb-6 px-4 lg:px-12">
      <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300">
        Welcome to the{" "}
        <span className="font-semibold text-primary dark:text-primary-dark">
          TCG Price Guide
        </span>
        . Finding your card’s value is simple. Just select your card’s category,
        enter the card number, and hit search!
      </p>
    </div>
  );
};
