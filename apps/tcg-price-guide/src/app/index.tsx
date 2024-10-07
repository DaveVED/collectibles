// App.tsx
import React, { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import {
  Header,
  SearchForm,
  SearchResults,
  SearchResultsIndicator,
  DarkModeToggle,
} from "@collectibles/ui-internal/tcg-price-guide";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * Custom hook to fetch card data based on setPart and numberPart.
 * If setPart is provided without numberPart, fetches all cards in the set.
 * If both setPart and numberPart are provided, fetches a specific card.
 */
function useCardData(setPart: string | null, numberPart: string | null) {
  // Construct the URL based on the presence of setPart and numberPart
  const url =
    setPart && numberPart
      ? `https://api-dev.collectibles.studio/v1/cards/${setPart}/${numberPart}/`
      : setPart
      ? `https://api-dev.collectibles.studio/v1/sets/name/${setPart}/cards`
      : null;

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    cardData: data,
    isLoading,
    isError: error,
  };
}

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [cardSet, setCardSet] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { cardData, isLoading, isError } = useCardData(cardSet, cardNumber);

  const handleSubmit = (data: {
    searchInput: string;
    category: string;
    setName: string;
  }) => {
    const { searchInput, category, setName } = data;

    console.log("Search Input:", searchInput);
    console.log("Category:", category);
    console.log("Set Name:", setName);

    if (category === "One Piece") {
      if (setName) {
        if (!searchInput) {
          // When setName is provided and no searchInput, fetch all cards in the set
          const formattedSetName = setName.toLowerCase().replace(/\s+/g, "-"); // e.g., "Paramount War" -> "paramount-war"
          setCardSet(formattedSetName);
          setCardNumber(null);
          console.log(`Fetching all cards from set: ${formattedSetName}`);
        } else {
          // If both setName and searchInput are provided, fetch a specific card
          const [setPart, numberPart] = searchInput.split("-");

          if (setPart && numberPart) {
            setCardSet(setPart.toLowerCase());
            setCardNumber(numberPart);
            console.log(`Fetching card ${numberPart} from set: ${setPart.toLowerCase()}`);
          } else {
            alert("Please enter the card number in the format OPXX-XXX");
          }
        }
      } else {
        // When setName is not provided, parse searchInput to get setPart and numberPart
        const [setPart, numberPart] = searchInput.split("-");

        if (setPart && numberPart) {
          setCardSet(setPart.toLowerCase());
          setCardNumber(numberPart);
          console.log(`Fetching card ${numberPart} from set: ${setPart.toLowerCase()}`);
        } else {
          alert("Please enter the card number in the format OPXX-XXX");
        }
      }
    } else {
      // Handle other categories if needed
      alert("Unsupported category");
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-mode", "dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Implement any dropdown closing logic if necessary
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-darkBackground transition-colors duration-300 relative">
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className="container py-8 mt-4">
        <Header />

        <div className="max-w-lg sm:max-w-2xl lg:max-w-4xl mx-auto text-center mb-6 px-4 lg:px-12">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300">
            Welcome to the{" "}
            <span className="font-semibold text-primary dark:text-primary-dark">
              TCG Price Guide
            </span>
            . Finding your card’s value is simple. Just select your card’s
            category, enter the card number, and hit search!
          </p>
        </div>

        <hr className="border-t border-gray-300 my-6 w-24 mx-auto" />

        <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSubmit={handleSubmit}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {isError && (
          <div className="text-red-600 text-center mt-8">
            Failed to load data
          </div>
        )}

        {/* Search Results Indicator */}
        <SearchResultsIndicator show={!!cardData?.data} />

        {/* Search Results */}
        {cardData?.data && <SearchResults cardData={cardData} />}
      </div>
    </div>
  );
}

export default App;
