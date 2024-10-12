import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search as SearchIcon, Filter } from "lucide-react";

interface SearchFormProps {
  handleSubmit: (data: {
    searchInput: string;
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
  const [selectedOptionFirst, setSelectedOptionFirst] =
    useState<string>("One Piece");

  // State for the second dropdown
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [selectedOptionSecond, setSelectedOptionSecond] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Options for the second dropdown
  const options = ["Paramount War", "Romance Dawn"];

  // Filtered options based on search term
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Card code input state
  const [cardCode, setCardCode] = useState<string>("");

  // Search query state
  const [searchQuery, setSearchQuery] = useState<string>("");

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
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target as Node)
      ) {
        // Optionally close filters when clicking outside
        // Uncomment the next line if you want to close filters on outside click
        // setIsFiltersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdownFirst = () => setIsOpenFirst(!isOpenFirst);
  const toggleDropdownSecond = () => setIsOpenSecond(!isOpenSecond);

  const toggleFilters = () => {
    console.log("Toggle Filters Clicked"); // Debugging statement
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleOptionClickFirst = (option: string) => {
    // Only "One Piece" is selectable for now
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
      searchInput: searchQuery,
      category: selectedOptionFirst,
      setName: selectedOptionSecond,
      cardNumber: cardCode,
    });
  };

  return (
    <form className="ui-py-6 ui-px-4 sm:ui-px-6 lg:ui-px-8" onSubmit={onSubmit}>
      <div className="ui-max-w-5xl ui-mx-auto">
        {/* Filters Header */}
        <div
          className="ui-flex ui-items-center ui-justify-between ui-px-4 ui-py-2 ui-bg-gray-100 dark:ui-bg-gray-700 ui-rounded-lg ui-mb-4 cursor-pointer"
          onClick={toggleFilters}
          ref={filtersRef}
          aria-expanded={isFiltersOpen}
          aria-controls="filters-section"
        >
          <div className="ui-flex ui-items-center ui-gap-2 ui-text-lg ui-font-semibold ui-text-gray-800 dark:ui-text-gray-200">
            <Filter className="ui-w-5 ui-h-5" />
            <span>Filters</span>
          </div>
          <ChevronDown
            className={`ui-w-5 ui-h-5 ui-transition-transform ${
              isFiltersOpen ? "ui-rotate-180" : "ui-rotate-0"
            }`}
          />
        </div>

        {/* Collapsible Filters Section */}
        {isFiltersOpen && (
          <div id="filters-section">
            {/* Filters Grid */}
            <div className="ui-grid ui-grid-cols-1 md:ui-grid-cols-2 lg:ui-grid-cols-3 ui-gap-4">
              {/* First Dropdown */}
              <div
                className="ui-relative ui-text-left md:ui-col-span-2 lg:ui-col-span-1"
                ref={dropdownFirstRef}
              >
                <button
                  type="button"
                  onClick={toggleDropdownFirst}
                  className={`ui-w-full ui-px-4 ui-py-2 ui-border ui-rounded ui-flex ui-items-center ui-justify-between ui-font-medium ui-text-sm ${
                    selectedOptionFirst ? "ui-text-black" : "ui-text-gray-500"
                  } ui-bg-white ui-border-gray-300 hover:ui-bg-gray-50 dark:ui-bg-gray-800 dark:ui-border-gray-600 dark:ui-text-white`}
                >
                  <span className="ui-overflow-hidden ui-text-ellipsis ui-whitespace-nowrap">
                    {selectedOptionFirst}
                  </span>
                  <ChevronDown className="ui-ml-2 ui-w-4 ui-h-4" />
                </button>

                {isOpenFirst && (
                  <div className="ui-absolute ui-mt-2 ui-bg-white ui-border ui-rounded-lg ui-w-full ui-z-10 ui-shadow-lg dark:ui-bg-gray-800 dark:ui-border-gray-600">
                    <ul className="ui-text-sm ui-text-gray-700 dark:ui-text-gray-200">
                      {/* Selectable Option */}
                      <li
                        className="ui-px-4 ui-py-2 hover:ui-bg-gray-100 hover:ui-cursor-pointer dark:hover:ui-bg-gray-700"
                        onClick={() => handleOptionClickFirst("One Piece")}
                      >
                        One Piece
                      </li>
                      {/* Divider */}
                      <div className="ui-border-t ui-border-gray-100 dark:ui-border-gray-600"></div>
                      {/* Coming Soon Header */}
                      <div className="ui-py-2 ui-text-center ui-text-gray-500 ui-text-sm dark:ui-text-gray-400">
                        Coming Soon
                      </div>
                      {/* Non-selectable Option */}
                      <li
                        className="ui-px-4 ui-py-2 ui-text-gray-400 ui-cursor-not-allowed dark:ui-text-gray-600"
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
                className="ui-relative ui-text-left lg:ui-col-span-1"
                ref={dropdownSecondRef}
              >
                <button
                  type="button"
                  onClick={toggleDropdownSecond}
                  className={`ui-w-full ui-px-4 ui-py-2 ui-border ui-rounded ui-flex ui-items-center ui-justify-between ui-font-medium ui-text-sm ${
                    selectedOptionSecond ? "ui-text-black" : "ui-text-gray-500"
                  } ui-bg-white ui-border-gray-300 hover:ui-bg-gray-50 dark:ui-bg-gray-800 dark:ui-border-gray-600 dark:ui-text-white`}
                >
                  <span className="ui-overflow-hidden ui-text-ellipsis ui-whitespace-nowrap">
                    {selectedOptionSecond || "Select a set"}
                  </span>
                  <ChevronDown className="ui-ml-2 ui-w-4 ui-h-4" />
                </button>

                {isOpenSecond && (
                  <div className="ui-absolute ui-mt-2 ui-bg-white ui-border ui-rounded-lg ui-w-full ui-z-10 ui-shadow-lg dark:ui-bg-gray-800 dark:ui-border-gray-600">
                    {/* Search Input */}
                    <div className="ui-p-3">
                      <div className="ui-relative">
                        <div className="ui-absolute ui-inset-y-0 ui-left-0 ui-flex ui-items-center ui-pl-3 ui-pointer-events-none">
                          <SearchIcon className="ui-w-4 ui-h-4 ui-text-gray-500 dark:ui-text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="ui-block ui-w-full ui-p-2 ui-pl-10 ui-text-sm ui-text-gray-900 ui-border ui-border-gray-300 ui-rounded-lg ui-bg-gray-50 focus:ui-ring-blue-500 focus:ui-border-blue-500 dark:ui-bg-gray-700 dark:ui-border-gray-500 dark:ui-placeholder-gray-400 dark:ui-text-white dark:focus:ui-ring-blue-500 dark:focus:ui-border-blue-500"
                          placeholder="Search Sets"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Options List */}
                    <ul className="ui-max-h-60 ui-overflow-y-auto ui-text-sm ui-text-gray-700 dark:ui-text-gray-200">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                          <li key={option}>
                            <div
                              className="ui-flex ui-items-center ui-px-4 ui-py-2 ui-rounded hover:ui-bg-gray-100 dark:hover:ui-bg-gray-700 hover:ui-cursor-pointer"
                              onClick={() => handleOptionClickSecond(option)}
                            >
                              <span className="ui-text-sm ui-font-medium ui-text-gray-900 dark:ui-text-gray-300">
                                {option}
                              </span>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li>
                          <div className="ui-flex ui-items-center ui-px-4 ui-py-2 ui-text-gray-500 dark:ui-text-gray-400">
                            No results found
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Input Field for Card Code */}
              <div className="ui-relative ui-text-left lg:ui-col-span-1">
                <input
                  type="text"
                  placeholder="Enter Card Code"
                  value={cardCode}
                  onChange={(e) => setCardCode(e.target.value)}
                  className="ui-w-full ui-px-4 ui-py-2 ui-border ui-rounded ui-text-sm ui-text-gray-900 ui-bg-white ui-border-gray-300 focus:ui-ring-blue-500 focus:ui-border-blue-500 dark:ui-bg-gray-700 dark:ui-border-gray-600 dark:ui-placeholder-gray-400 dark:ui-text-white dark:focus:ui-ring-blue-500 dark:focus:ui-border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="ui-mt-6 ui-max-w-5xl ui-mx-auto">
          <div className="ui-relative">
            <div className="ui-absolute ui-inset-y-0 ui-left-0 ui-flex ui-items-center ui-pl-3 ui-pointer-events-none">
              <SearchIcon className="ui-w-5 ui-h-5 ui-text-gray-500 dark:ui-text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ui-block ui-w-full ui-p-4 ui-pl-10 ui-text-sm ui-text-gray-900 ui-border ui-border-gray-300 ui-rounded-lg ui-bg-gray-50 focus:ui-ring-blue-500 focus:ui-border-blue-500 dark:ui-bg-gray-700 dark:ui-border-gray-600 dark:ui-placeholder-gray-400 dark:ui-text-white dark:focus:ui-ring-blue-500 dark:focus:ui-border-blue-500"
            />
            <button
              type="submit"
              className="ui-text-white ui-absolute ui-right-2.5 ui-bottom-2.5 ui-bg-blue-700 hover:ui-bg-blue-800 focus:ui-ring-4 focus:ui-outline-none focus:ui-ring-blue-300 ui-font-medium ui-rounded-lg ui-text-sm ui-px-4 ui-py-2 dark:ui-bg-blue-600 dark:hover:ui-bg-blue-700 dark:ui-focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
