import React from "react";

interface SearchResultsIndicatorProps {
  show: boolean;
}

export const SearchResultsIndicator: React.FC<SearchResultsIndicatorProps> = ({
  show,
}) => {
  if (!show) return null;

  return (
    <div className="flex justify-center mt-4">
      <svg
        className="w-6 h-6 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
};
