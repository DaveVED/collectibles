import React, { useState, useRef, useEffect } from "react";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Reusable hook to fetch card data
function useCardData(setPart: string | null, numberPart: string | null) {
  const { data, error, isLoading } = useSWR(
    setPart && numberPart ? `http://localhost:5001/v1/cards/${setPart}/${numberPart}` : null,
    fetcher
  );

  return {
    cardData: data,
    isLoading,
    isError: error,
  };
}

function App(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("One Piece");
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cardSet, setCardSet] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Using the custom hook for data fetching
  const { cardData, isLoading, isError } = useCardData(cardSet, cardNumber);

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Split input into set and card number parts
    const [setPart, numberPart] = searchInput.split("-");

    if (setPart && numberPart) {
      setCardSet(setPart.toLowerCase());
      setCardNumber(numberPart);
    } else {
      alert("Please enter the card number in the format OPXX-XXX");
    }
  };

  // Handler for selecting a category
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format input into OPXX-XXX pattern
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

  return (
    <div className="container py-8">
      {/* Header Section */}
      <div className="flex items-center justify-center flex-col sm:flex-row sm:justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold flex items-center">
            <span className="text-primary">TCG</span>{" "}
            <span className="text-secondary">Price Checker</span>
            <span className="inline-flex items-center px-1 py-[0.125rem] text-1xs sm:text-2xs font-semibold text-gray-700 border border-gray-700 rounded hover:bg-primary-dark hover:text-white transition-colors duration-200 leading-none ml-2">
              Beta
            </span>
          </h1>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-lg sm:max-w-2xl lg:max-w-4xl mx-auto text-center mb-6 px-4 lg:px-12">
        <p className="text-sm sm:text-base lg:text-lg text-gray-700">
          Welcome to the <span className="font-semibold text-primary">TCG Price Checker</span>. Finding your card’s value is simple. 
          Just select your card’s category, enter the card number, and hit search! 
          We’ll do the rest by fetching the latest market data for you.
        </p>
      </div>

      {/* Break Line */}
      <hr className="border-t border-gray-300 my-6 w-24 mx-auto" />

      {/* Form Section */}
      <form className="max-w-lg sm:max-w-2xl lg:max-w-2xl mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row items-stretch px-4 lg:px-8">
          <div className="relative mb-2 sm:mb-0 sm:mr-0" ref={dropdownRef}>
            <button
              id="dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex-shrink-0 z-10 inline-flex items-center justify-between w-full sm:w-auto py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-t-lg sm:rounded-l-lg sm:rounded-r-none sm:border-r-0 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span className="truncate">{selectedCategory}</span>
              <svg
                className="w-2.5 h-2.5 ml-2.5"
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
              <div className="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-b-lg shadow w-full sm:w-44" role="listbox">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect("One Piece")}
                      className="inline-flex items-center w-full px-4 py-2 hover:bg-gray-100"
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
                      className="inline-flex items-center w-full px-4 py-2 text-gray-400 cursor-not-allowed"
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
          <div className="flex flex-col sm:flex-row items-stretch w-full">
            <div className="relative w-full">
              <input
                type="text"
                id="search-input"
                value={searchInput}
                onChange={(e) => {
                  const formatted = formatInput(e.target.value);
                  setSearchInput(formatted);
                }}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded sm:rounded-r-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter card number (e.g., OP01-001)"
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded sm:rounded-r-lg border border-blue-700 border-l-0 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Down Arrow Icon */}
      <div className="flex justify-center mt-4">
        <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Search Results Section */}
      {isLoading && <div>Loading...</div>}
      {isError && <div className="text-red-600">Failed to load data</div>}
{/* Search Results Section */}
{/* Search Results Section */}
{cardData?.data && (
  <div className="max-w-lg sm:max-w-2xl lg:max-w-2xl mt-8 mx-auto p-4 bg-white shadow rounded">
    <h2 className="text-lg font-semibold mb-4">Search Results</h2>
    <div className="grid grid-cols-1 gap-6">
      {cardData.data.map((card: any, index: number) => (
        <div
          key={index}
          className="p-4 bg-gray-50 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start"
        >
          {/* Card Image */}
          <img
            src={
              index % 2 === 0
                ? "https://tcgplayer-cdn.tcgplayer.com/product/485087_in_200x200.jpg"
                : "https://tcgplayer-cdn.tcgplayer.com/product/485246_in_200x200.jpg"
            }
            alt={card.CardName}
            className="w-32 h-32 object-cover mb-4 sm:mb-0 sm:mr-4 rounded-lg"
          />

          {/* Card Details */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{card.CardName}</h3>
            <p className="text-sm text-gray-600 mb-1"><strong>Rarity:</strong> {card.Rarity}</p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Market Price:</strong> ${card.Price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-1"><strong>Set Name:</strong> {card.SetName}</p>

            {/* Source Link */}
            <a
              href={card.Source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm mt-2 inline-block"
            >
              View on TCG Player
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


    </div>
  );
}

export default App;
