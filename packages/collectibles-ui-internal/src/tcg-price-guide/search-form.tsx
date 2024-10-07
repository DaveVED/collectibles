// SearchForm.tsx
import React, { useState } from "react";

interface SearchFormProps {
  handleSubmit: (data: {
    searchInput: string;
    category: string;
    setName: string;
  }) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  handleSubmit,
  searchInput,
  setSearchInput,
}) => {
  // State for Set Name filter
  const [setName, setSetName] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>(["Paramount War"]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(true);

  // Handle input change for Set Name filter
  const handleSetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSetName(value);
    if (value) {
      const filtered = ["Paramount War"].filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setFilteredOptions(["Paramount War"]);
      setShowOptions(false);
    }
  };

  // Handle selecting an option from Set Name filter
  const handleOptionClick = (option: string) => {
    setSetName(option);
    setShowOptions(false);
  };

  // Local onSubmit handler
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({
      searchInput,
      category: "One Piece", // Since it's disabled and fixed
      setName,
    });
  };

  return (
    <form className="ui-max-w-md ui-mx-auto ui-p-4" onSubmit={onSubmit}>
      {/* Filters Section */}
      <div className="ui-mb-6 ui-border ui-border-gray-200 ui-rounded-lg dark:ui-border-gray-700">
        {/* Filters Header */}
        <button
          type="button"
          className="ui-w-full ui-flex ui-items-center ui-justify-between ui-p-4 ui-bg-gray-100 ui-border-b ui-border-gray-200 ui-rounded-t-lg dark:ui-bg-gray-700 dark:ui-border-gray-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          <div className="ui-flex ui-items-center">
            {/* Standard Filter Icon (Funnel) */}
            <svg
              className="ui-w-6 ui-h-6 ui-text-gray-600 dark:ui-text-gray-300 ui-mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h18M7 8h10M5 12h14M9 16h6M4 20h16"
              />
            </svg>
            <h2 className="ui-text-base ui-font-semibold ui-text-gray-900 dark:ui-text-white">
              Filters
            </h2>
          </div>
          {/* Toggle Icon */}
          <svg
            className={`ui-w-5 ui-h-5 ui-transition-transform ${
              showFilters ? "ui-transform ui-rotate-180" : ""
            } ui-text-gray-600 dark:ui-text-gray-300`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Filters Content */}
        {showFilters && (
          <div className="ui-p-4">
            <div className="ui-flex ui-flex-col ui-space-y-4 md:ui-flex-row md:ui-space-y-0 md:ui-space-x-4">
              {/* Category Dropdown (Disabled) */}
              <div className="ui-flex-1">
                <label
                  htmlFor="category"
                  className="ui-block ui-mb-1 ui-text-sm ui-font-medium ui-text-gray-700 dark:ui-text-gray-300"
                >
                  Category
                </label>
                <select
                  id="category"
                  disabled
                  className="ui-block ui-w-full ui-p-2 ui-text-sm ui-text-gray-500 ui-bg-gray-100 ui-border ui-border-gray-300 ui-rounded-lg dark:ui-bg-gray-600 dark:ui-border-gray-500"
                >
                  <option>One Piece</option>
                </select>
              </div>

              {/* Set Name Filter */}
              <div className="ui-flex-1 ui-relative">
                <label
                  htmlFor="setName"
                  className="ui-block ui-mb-1 ui-text-sm ui-font-medium ui-text-gray-700 dark:ui-text-gray-300"
                >
                  Set Name?
                </label>
                <input
                  type="text"
                  id="setName"
                  className="ui-block ui-w-full ui-p-2 ui-text-sm ui-text-gray-900 ui-border ui-border-gray-300 ui-rounded-lg ui-bg-white dark:ui-bg-gray-700 dark:ui-border-gray-600 dark:ui-placeholder-gray-400 dark:ui-text-white"
                  placeholder="Type to search..."
                  value={setName}
                  onChange={handleSetNameChange}
                  onFocus={() => {
                    if (setName) setShowOptions(true);
                  }}
                  onBlur={() => {
                    // Delay to allow click event to register
                    setTimeout(() => setShowOptions(false), 100);
                  }}
                />
                {showOptions && filteredOptions.length > 0 && (
                  <ul className="ui-absolute ui-z-10 ui-w-full ui-bg-white ui-border ui-border-gray-300 ui-rounded-lg dark:ui-bg-gray-700 dark:ui-border-gray-600">
                    {filteredOptions.map((option) => (
                      <li
                        key={option}
                        className="ui-p-2 ui-text-sm ui-text-gray-700 ui-cursor-pointer ui-hover:bg-gray-100 dark:ui-text-gray-300 dark:ui-hover:bg-gray-600"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="ui-mb-6">
        <label
          htmlFor="default-search"
          className="ui-mb-2 ui-text-sm ui-font-medium ui-text-gray-900 ui-sr-only dark:text-white"
        >
          Search
        </label>
        <div className="ui-relative">
          <div className="ui-absolute ui-inset-y-0 ui-start-0 ui-flex ui-items-center ui-ps-3 ui-pointer-events-none">
            <svg
              className="ui-w-4 ui-h-4 ui-text-gray-500 dark:ui-text-gray-400"
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
          </div>
          <input
            type="search"
            id="default-search"
            className="ui-block ui-w-full ui-p-4 ui-ps-10 ui-text-sm ui-text-gray-900 ui-border ui-border-gray-300 ui-rounded-lg ui-bg-gray-50 ui-focus:ring-blue-500 ui-focus:border-blue-500 dark:ui-bg-gray-700 dark:ui-border-gray-600 dark:ui-placeholder-gray-400 dark:ui-text-white dark:ui-focus:ring-blue-500 dark:ui-focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required={!setName} // Make required only if setName is not provided
            value={searchInput} // Controlled input
            onChange={(e) => setSearchInput(e.target.value)} // Updates the input state
          />
          <button
            type="submit"
            className="ui-text-white ui-absolute ui-end-2.5 ui-bottom-2.5 ui-bg-blue-700 ui-hover:bg-blue-800 ui-focus:ring-4 ui-focus:outline-none ui-focus:ring-blue-300 ui-font-medium ui-rounded-lg ui-text-sm ui-px-4 ui-py-2 dark:ui-bg-blue-600 dark:hover:ui-bg-blue-700 dark:ui-focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
