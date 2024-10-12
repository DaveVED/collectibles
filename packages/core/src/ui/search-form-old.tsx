import React, { useState, useEffect, useRef } from "react";

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

interface Command {
  name: string;
  placeholder: string;
}

export const SearchFormOld: React.FC<SearchFormProps> = ({
  searchInput,
  setSearchInput,
  handleSubmit,
  selectedCategory,
  setIsDropdownOpen,
  isDropdownOpen,
  handleCategorySelect,
  dropdownRef,
}) => {
  // Internal state for query builder
  const [isCommandMode, setIsCommandMode] = useState(false);
  const [commandSuggestions, setCommandSuggestions] = useState<Command[]>([]);
  const [filteredCommands, setFilteredCommands] = useState<Command[]>([]);
  const [showCommandDropdown, setShowCommandDropdown] = useState(false);
  const [highlightedCommandIndex, setHighlightedCommandIndex] = useState(0);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [additionalInput, setAdditionalInput] = useState("");
  const commandInputRef = useRef<HTMLInputElement>(null);

  // Define available commands
  const commands: Command[] = [
    { name: "cardCode", placeholder: "Enter card code..." },
    // Add more commands here as needed
    // { name: "userName", placeholder: "Enter user name..." },
    // { name: "date", placeholder: "Enter date..." },
  ];

  // Format the search input (existing functionality)
  const formatInput = (value: string) => {
    let formatted = value.replace(/[^a-zA-Z0-9-]/g, "").toUpperCase();
    if (formatted.length === 4 && !formatted.includes("-")) {
      formatted = `${formatted}-`;
    } else if (formatted.length > 4 && !formatted.includes("-")) {
      formatted = `${formatted.slice(0, 4)}-${formatted.slice(4, 7)}`;
    }
    const parts = formatted.split("-");
    if (parts.length > 2) {
      formatted = `${parts[0].slice(0, 4)}-${parts[1].slice(0, 3)}`;
    }
    if (formatted.length > 8) {
      formatted = formatted.slice(0, 8);
    }
    return formatted;
  };

  // Handle input changes for the main search input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(formatInput(value));

    const colonIndex = value.lastIndexOf(":");
    if (colonIndex !== -1) {
      const query = value.slice(colonIndex + 1).toLowerCase();
      const filtered = commands.filter((cmd) => cmd.name.startsWith(query));
      setFilteredCommands(filtered);
      setShowCommandDropdown(filtered.length > 0);
      setHighlightedCommandIndex(0);
      setIsCommandMode(true);
    } else {
      setShowCommandDropdown(false);
      setIsCommandMode(false);
      setSelectedCommand(null);
      setAdditionalInput("");
    }
  };

  // Handle keyboard navigation in command dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showCommandDropdown) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedCommandIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedCommandIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands.length > 0) {
          selectCommand(filteredCommands[highlightedCommandIndex]);
        }
      } else if (e.key === "Escape") {
        setShowCommandDropdown(false);
      }
    }
  };

  // Handle command selection
  const selectCommand = (command: Command) => {
    const value = searchInput;
    const colonIndex = value.lastIndexOf(":");
    const newValue = value.slice(0, colonIndex + 1) + command.name + " ";
    setSearchInput(newValue);
    setShowCommandDropdown(false);
    setIsCommandMode(false);
    setSelectedCommand(command);
    setAdditionalInput("");
    // Focus on the additional input after command selection
    setTimeout(() => {
      if (commandInputRef.current) {
        commandInputRef.current.focus();
      }
    }, 100);
  };

  // Handle clicks outside the command dropdown to close it
  const commandDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandDropdownRef.current &&
        !commandDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCommandDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle additional input changes
  const handleAdditionalInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAdditionalInput(e.target.value);
  };

  return (
    <form
      className="ui-max-w-lg sm:ui-max-w-2xl lg:ui-max-w-2xl ui-mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="ui-flex ui-flex-col sm:ui-flex-row ui-items-stretch ui-px-4 lg:ui-px-8">
        {/* Category Dropdown */}
        <div
          className="ui-relative ui-mb-2 sm:ui-mb-0 sm:ui-mr-0 ui-flex-grow"
          ref={dropdownRef}
        >
          <button
            id="dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="ui-flex-shrink-0 ui-z-10 ui-inline-flex ui-items-center ui-justify-between ui-w-full sm:ui-w-auto ui-py-2.5 ui-px-4 ui-text-sm ui-font-medium ui-text-gray-900 ui-bg-gray-100 ui-border ui-border-gray-300 ui-rounded-t-lg sm:ui-rounded-l-lg sm:ui-border-r-0 ui-rounded-r-lg sm:ui-rounded-r-none ui-hover:bg-gray-200 ui-focus:ring-4 ui-focus:outline-none ui-focus:ring-gray-300"
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
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="ui-block ui-w-full ui-p-2.5 ui-text-sm ui-text-gray-900 ui-bg-gray-50 ui-border ui-border-gray-300 ui-rounded-none sm:ui-rounded-l-none sm:ui-border-r-0 ui-rounded-l-lg sm:ui-rounded-l-none ui-focus:ring-blue-500 ui-focus:border-blue-500"
              placeholder="Enter card number (e.g., OP01-001) or type ':' for commands"
              required
            />
            <button
              type="submit"
              className="ui-absolute ui-top-0 ui-right-0 ui-p-2.5 ui-h-full ui-text-sm ui-font-medium ui-text-white ui-bg-blue-700 ui-rounded-r-lg ui-border ui-border-blue-700 ui-border-l-0 ui-hover:bg-blue-800 ui-focus:ring-4 ui-focus:outline-none ui-focus:ring-blue-300"
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
            {/* Command Suggestions Dropdown */}
            {showCommandDropdown && (
              <div
                ref={commandDropdownRef}
                className="ui-absolute ui-z-20 ui-left-0 ui-right-0 ui-mt-1 ui-bg-white ui-rounded-md ui-shadow-lg ui-max-h-60 ui-overflow-y-auto"
              >
                <ul className="ui-p-2">
                  {filteredCommands.map((cmd, index) => (
                    <li key={cmd.name}>
                      <button
                        type="button"
                        onClick={() => selectCommand(cmd)}
                        className={`ui-w-full ui-text-left ui-px-4 ui-py-2 ui-text-sm ui-rounded-md ${
                          highlightedCommandIndex === index
                            ? "ui-bg-blue-500 ui-text-white"
                            : "ui-hover:bg-gray-100"
                        }`}
                      >
                        {cmd.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Input for Selected Command */}
      {selectedCommand && (
        <div className="ui-mt-4 ui-px-4 lg:ui-px-8">
          <label
            htmlFor="additional-input"
            className="ui-block ui-text-sm ui-font-medium ui-text-gray-700"
          >
            {selectedCommand.placeholder}
          </label>
          <input
            type="text"
            id="additional-input"
            value={additionalInput}
            onChange={handleAdditionalInputChange}
            ref={commandInputRef}
            className="ui-mt-1 ui-block ui-w-full ui-p-2.5 ui-text-sm ui-text-gray-900 ui-bg-gray-50 ui-border ui-border-gray-300 ui-rounded-md ui-focus:ring-green-500 ui-focus:border-green-500"
            placeholder={selectedCommand.placeholder}
            required
          />
        </div>
      )}
    </form>
  );
};
