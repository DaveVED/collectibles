import React from "react";

interface SearchFormProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  selectedCategory: string;
  setIsDropdownOpen: (open: boolean) => void;
  isDropdownOpen: boolean;
  handleCategorySelect: (category: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  searchInput,
  setSearchInput,
  handleSubmit,
  selectedCategory,
  setIsDropdownOpen,
  isDropdownOpen,
  handleCategorySelect,
  dropdownRef,
}) => {
  return (
    <form
      className="ui-max-w-lg sm:ui-max-w-2xl lg:ui-max-w-2xl ui-mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="ui-flex ui-flex-col sm:ui-flex-row ui-items-stretch ui-px-4 lg:ui-px-8">
        <div
          className="ui-relative ui-mb-2 sm:ui-mb-0 sm:ui-mr-0"
          ref={dropdownRef}
        >
          <button
            id="dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="ui-flex-shrink-0 ui-z-10 ui-inline-flex ui-items-center ui-justify-between ui-w-full sm:ui-w-auto ui-py-2.5 ui-px-4 ui-text-sm ui-font-medium ui-text-gray-900 ui-bg-gray-100 ui-border ui-border-gray-300 ui-rounded-t-lg sm:ui-rounded-l-lg sm:ui-rounded-r-none sm:ui-border-r-0 ui-hover:bg-gray-200 ui-focus:ring-4 ui-focus:outline-none ui-focus:ring-gray-300"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span className="ui-truncate">{selectedCategory}</span>
            <svg
              className="ui-w-2.5 ui-h-2.5 ui-ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              className="ui-absolute ui-z-10 ui-mt-1 ui-bg-white ui-divide-y ui-divide-gray-100 ui-rounded-b-lg ui-shadow ui-w-full sm:ui-w-44"
              role="listbox"
            >
              <ul className="ui-py-2 ui-text-sm ui-text-gray-700">
                <li>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect("One Piece")}
                    className="ui-inline-flex ui-items-center ui-w-full ui-px-4 ui-py-2 ui-hover:bg-gray-100"
                    role="option"
                    aria-selected={selectedCategory === "One Piece"}
                  >
                    One Piece
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    disabled
                    className="ui-inline-flex ui-items-center ui-w-full ui-px-4 ui-py-2 ui-text-gray-400 ui-cursor-not-allowed"
                    aria-disabled="true"
                  >
                    Pokemon (Coming Soon)
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Search Input and Button */}
        <div className="ui-flex ui-flex-col sm:ui-flex-row ui-items-stretch ui-w-full">
          <div className="ui-relative ui-w-full">
            <input
              type="text"
              id="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="ui-block ui-w-full ui-p-2.5 ui-text-sm ui-text-gray-900 ui-bg-gray-50 ui-border ui-border-gray-300 ui-rounded sm:ui-rounded-r-none ui-focus:ring-blue-500 ui-focus:border-blue-500"
              placeholder="Enter card number (e.g., OP01-001)"
              required
            />
            <button
              type="submit"
              className="ui-absolute ui-top-0 ui-right-0 ui-p-2.5 ui-h-full ui-text-sm ui-font-medium ui-text-white ui-bg-blue-700 ui-rounded sm:ui-rounded-r-lg ui-border ui-border-blue-700 ui-border-l-0 ui-hover:bg-blue-800 ui-focus:ring-4 ui-focus:outline-none ui-focus:ring-blue-300"
            >
              <svg
                className="ui-w-4 ui-h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="ui-sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
