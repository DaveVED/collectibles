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
import { useCards } from "../hooks";

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [setName, setSetName] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState<string | null>(null);

  // State for Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  const { data, isLoading, isError } = useCards(setName, cardNumber);

  // Close Toast
  const closeToast = () => {
    setToastMessage(null);
    setToastType(null);
  };

  // Effect for handling Toast messages
  useEffect(() => {
    if (data?.data) {
      setToastMessage("Data fetched successfully!");
      setToastType("success");
    }
    if (isError) {
      setToastMessage("An error occurred while fetching data.");
      setToastType("error");
    }
  }, [data, isError]);

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

  // Helper function to format set names
  const formatSetName = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

  const handleSubmit = (data: {
    category: string;
    setName: string;
    cardNumber: string;
  }) => {
    const { category, setName: inputSetName, cardNumber: inputCardNumber } = data;

    if (category === "One Piece") {
      const formattedSetName = formatSetName(inputSetName);
      setSetName(formattedSetName);
      setCardNumber(inputCardNumber || null);
    }
  };

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
        <SearchResultsIndicator show={!!data?.data} />

        {/* Loading Indicator */}
        {isLoading && <Loading />}

        {/* Error Message */}
        {isError && (
          <div className="text-red-500 text-center py-4">
            An error occurred while fetching data.
          </div>
        )}

        {/* Search Results */}
        {data?.data && <SearchResults cardData={data} />}
      </div>
      {/* Footer */}
    </div>
  );
}

export default App;
