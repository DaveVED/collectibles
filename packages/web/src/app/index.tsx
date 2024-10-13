import React, { useState, useEffect } from "react";
import {
  DarkModeToggle,
  Header,
  Introduction,
  IntroductionDivider,
  Loading,
  SearchForm,
  SearchResults,
  SearchResultsIndicator,
  Toast,
} from "../components";
import { useCardData, useSetCards } from "../hooks";

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [setPart, setSetPart] = useState<string | null>(null);
  const [numberPart, setNumberPart] = useState<string | null>(null);
  const [setName, setSetName] = useState<string | null>(null);

  // State for Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  const { cardData, isLoading, isError } = useCardData(setPart, numberPart);
  const {
    setCardsData,
    isLoading: isSetCardsLoading,
    isError: isSetCardsError,
  } = useSetCards(setName);

  // Close Toast
  const closeToast = () => {
    setToastMessage(null);
    setToastType(null);
  };

  // Effect for handling Toast messages
  useEffect(() => {
    if (cardData?.data || setCardsData?.data) {
      setToastMessage("Data fetched successfully!");
      setToastType("success");
    }
    if (isError || isSetCardsError) {
      setToastMessage("An error occurred while fetching data.");
      setToastType("error");
    }
  }, [cardData, setCardsData, isError, isSetCardsError]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-mode", "dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.removeAttribute("data-mode");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleSubmit = (data: {
    category: string;
    setName: string;
    cardNumber: string;
  }) => {
    const { category, setName, cardNumber } = data;

    if (category === "One Piece") {
      if (setName && cardNumber) {
        const [setPart, numberPart] = cardNumber.split("-");
        if (setPart && numberPart) {
          setSetPart(setPart);
          setNumberPart(numberPart);
          setSetName(null);
        }
      } else if (setName && !cardNumber) {
        const formattedSetName = setName.toLowerCase().replace(/\s+/g, "-");
        setSetName(formattedSetName);
        setSetPart(null);
        setNumberPart(null);
      }
    }
  };

  // Combined loading and error states
  const isAnyLoading = isLoading || isSetCardsLoading;
  const isAnyError = isError || isSetCardsError;
  const combinedData = cardData || setCardsData; // Updated here

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-darkBackground transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && toastType && (
        <Toast message={toastMessage} type={toastType} onClose={closeToast} />
      )}

      {/* Main content area */}
      <div className="flex-grow container py-8">
        <DarkModeToggle
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />
        <Header />
        <Introduction />
        <IntroductionDivider />
        <SearchForm handleSubmit={handleSubmit} />
        <SearchResultsIndicator show={!!combinedData?.data} />

        {/* Loading Indicator */}
        {isAnyLoading && <Loading />}

        {/* Error Message */}
        {isAnyError && (
          <div className="text-red-500 text-center py-4">
            An error occurred while fetching data.
          </div>
        )}

        {/* Search Results */}
        {combinedData?.data && <SearchResults cardData={combinedData} />}
      </div>
      {/* Footer */}
    </div>
  );
}

export default App;
