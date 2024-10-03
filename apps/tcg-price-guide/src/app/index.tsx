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

function useCardData(setPart: string | null, numberPart: string | null) {
  const { data, error, isLoading } = useSWR(
    setPart && numberPart
      ? `https://api-dev.collectibles.studio/v1/cards/${setPart}/${numberPart}/`
      : null,
    fetcher,
  );

  return {
    cardData: data,
    isLoading,
    isError: error,
  };
}

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("One Piece");
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cardSet, setCardSet] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { cardData, isLoading, isError } = useCardData(cardSet, cardNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [setPart, numberPart] = searchInput.split("-");

    if (setPart && numberPart) {
      setCardSet(setPart.toLowerCase());
      setCardNumber(numberPart);
    } else {
      alert("Please enter the card number in the format OPXX-XXX");
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
        setIsDropdownOpen(false);
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

      <div className="container py-8">
        <Header />

        <div className="max-w-lg sm:max-w-2xl lg:max-w-4xl mx-auto text-center mb-6 px-4 lg:px-12">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300">
            Welcome to the{" "}
            <span className="font-semibold text-primary dark:text-primary-dark">
              TCG Price Checker
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
          selectedCategory={selectedCategory}
          setIsDropdownOpen={setIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
          handleCategorySelect={setSelectedCategory}
          dropdownRef={dropdownRef}
        />

        {isLoading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        )}
        {isError && (
          <div className="text-red-600 text-center mt-8">
            Failed to load data
          </div>
        )}

        <SearchResultsIndicator show={!!cardData?.data} />

        {cardData?.data && <SearchResults cardData={cardData} />}
      </div>
    </div>
  );
}

export default App;
