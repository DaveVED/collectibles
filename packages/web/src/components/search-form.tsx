import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Filter } from "lucide-react";

interface SearchFormProps {
  handleSubmit: (data: {
    category: string;
    setName: string;
    cardNumber: string;
  }) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ handleSubmit }) => {
  // State for collapsible filters section
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(true); // Open by default

  // State for the first dropdown
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [selectedOptionFirst, setSelectedOptionFirst] = useState<string>("One Piece");

  // State for the second dropdown
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [selectedOptionSecond, setSelectedOptionSecond] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Options for the second dropdown
  const options = ["Paramount War", "Romance Dawn"];

  // Filtered options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Card code input state
  const [cardCode, setCardCode] = useState<string>("");

  // Refs for detecting clicks outside of dropdowns
  const dropdownFirstRef = useRef<HTMLDivElement>(null);
  const dropdownSecondRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null); // New ref for filters

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownFirstRef.current &&
        !dropdownFirstRef.current.contains(event.target as Node)
      ) {
        setIsOpenFirst(false);
      }
      if (
        dropdownSecondRef.current &&
        !dropdownSecondRef.current.contains(event.target as Node)
      ) {
        setIsOpenSecond(false);
      }
      // Optionally handle other outside clicks here
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdownFirst = () => setIsOpenFirst(!isOpenFirst);
  const toggleDropdownSecond = () => setIsOpenSecond(!isOpenSecond);
  const toggleFilters = () => setIsFiltersOpen(!isFiltersOpen);

  const handleOptionClickFirst = (option: string) => {
    if (option === "One Piece") {
      setSelectedOptionFirst(option);
    }
    setIsOpenFirst(false);
  };

  const handleOptionClickSecond = (option: string) => {
    setSelectedOptionSecond(option);
    setIsOpenSecond(false);
    setSearchTerm(""); // Reset search term after selection
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({
      category: selectedOptionFirst,
      setName: selectedOptionSecond,
      cardNumber: cardCode,
    });
  };

  return (
    <form className="py-6 px-4 sm:px-6 lg:px-8" onSubmit={onSubmit}>
      <div className="max-w-5xl mx-auto">
        {/* Filters Header */}
        <div
          className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 cursor-pointer"
          onClick={toggleFilters}
          ref={filtersRef}
          aria-expanded={isFiltersOpen}
          aria-controls="filters-section"
        >
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isFiltersOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* Collapsible Filters Section */}
        {isFiltersOpen && (
          <div id="filters-section">
            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* First Dropdown */}
              <div
                className="relative text-left md:col-span-2 lg:col-span-1"
                ref={dropdownFirstRef}
              >
                <button
                  type="button"
                  onClick={toggleDropdownFirst}
                  className={`w-full px-4 py-2 border rounded flex items-center justify-between font-medium text-sm ${
                    selectedOptionFirst ? "text-black" : "text-gray-500"
                  } bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {selectedOptionFirst}
                  </span>
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>

                {isOpenFirst && (
                  <div className="absolute mt-2 bg-white border rounded-lg w-full z-10 shadow-lg dark:bg-gray-800 dark:border-gray-600">
                    <ul className="text-sm text-gray-700 dark:text-gray-200">
                      {/* Selectable Option */}
                      <li
                        className="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-700"
                        onClick={() => handleOptionClickFirst("One Piece")}
                      >
                        One Piece
                      </li>
                      {/* Divider */}
                      <div className="border-t border-gray-100 dark:border-gray-600"></div>
                      {/* Coming Soon Header */}
                      <div className="py-2 text-center text-gray-500 text-sm dark:text-gray-400">
                        Coming Soon
                      </div>
                      {/* Non-selectable Option */}
                      <li
                        className="px-4 py-2 text-gray-400 cursor-not-allowed dark:text-gray-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Pokémon
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Second Dropdown with Search */}
              <div
                className="relative text-left lg:col-span-1"
                ref={dropdownSecondRef}
              >
                <button
                  type="button"
                  onClick={toggleDropdownSecond}
                  className={`w-full px-4 py-2 border rounded flex items-center justify-between font-medium text-sm ${
                    selectedOptionSecond ? "text-black" : "text-gray-500"
                  } bg-white border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {selectedOptionSecond || "Select a set"}
                  </span>
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>

                {isOpenSecond && (
                  <div className="absolute mt-2 bg-white border rounded-lg w-full z-10 shadow-lg dark:bg-gray-800 dark:border-gray-600">
                    {/* Search Input */}
                    <div className="p-3">
                      <div className="relative">
                        <input
                          type="text"
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search Sets"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Options List */}
                    <ul className="max-h-60 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                          <li key={option}>
                            <div
                              className="flex items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
                              onClick={() => handleOptionClickSecond(option)}
                            >
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                {option}
                              </span>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li>
                          <div className="flex items-center px-4 py-2 text-gray-500 dark:text-gray-400">
                            No results found
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Input Field for Card Code */}
              <div className="relative text-left lg:col-span-1">
                <input
                  type="text"
                  placeholder="Enter Card Code"
                  value={cardCode}
                  onChange={(e) => setCardCode(e.target.value)}
                  className="w-full px-4 py-2 border rounded text-sm text-gray-900 bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#4752c4] focus:ring-opacity-75"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};
