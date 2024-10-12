import React, { useState, useEffect } from "react";
import {
  UI,
} from "@repo/core";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useCardData(setPart: string | null, numberPart: string | null) {
  const url =
    setPart && numberPart
      ? `https://api-dev.collectibles.studio/v1/cards/${setPart}/${numberPart}`
      : null; // SWR handles null by not fetching

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    cardData: data,
    isLoading,
    isError: error,
  };
}

function useSetCards(setName: string | null) {
  const formattedSetName = setName
    ? setName.toLowerCase().replace(/\s+/g, "-")
    : null;
  const url = formattedSetName
    ? `https://api-dev.collectibles.studio/v1/sets/name/${formattedSetName}/cards`
    : null;

  const { data, error, isValidating } = useSWR(url, fetcher);

  return {
    setCardsData: data,
    isLoading: isValidating && !data,
    isError: error,
  };
}

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(true);
  // States for setPart and numberPart
  const [setPart, setSetPart] = useState<string | null>(null);
  const [numberPart, setNumberPart] = useState<string | null>(null);
  const [setName, setSetName] = useState<string | null>(null);

  const { cardData, isLoading, isError } = useCardData(setPart, numberPart);
  const {
    setCardsData,
    isLoading: isSetCardsLoading,
    isError: isSetCardsError,
  } = useSetCards(setName);
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
    searchInput: string;
    category: string;
    setName: string;
    cardNumber: string;
  }) => {
    const { searchInput, category, setName, cardNumber } = data;

    /* Only Option Right now */
    if (category === "One Piece") {
      if (setName && cardNumber) {
        /* We know the set name and card number use the cards API */
        const [setPart, numberPart] = cardNumber.split("-");
        /* Todo later we'll create a mapping for set-name and card number for the endpoint. */
        if (setPart && numberPart) {
          setSetPart(setPart);
          setNumberPart(numberPart);
          setSetName(null);
        }
      } else if (setName && !cardNumber) {
        console.log("HERE DUDE");
        const formattedSetName = setName.toLowerCase().replace(/\s+/g, "-"); // e.g., "Paramount War" -> "paramount-war"
        setSetName(formattedSetName);
        setSetPart(null);
        setNumberPart(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-darkBackground transition-colors duration-300 relative">
      {/* Setup Dark mode option */}
      <UI.DarkModeToggle
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="container py-8">
        {/* Intro Section. Simple Header and breif Description */}
        <UI.Header />
        <UI.Introduction />

        {/* Breake Point */}
        <UI.IntroductionDivider />

        {/* Search Form */}
        <UI.SearchForm handleSubmit={handleSubmit} />

        {/* Search Results Indicator */}
        <UI.SearchResultsIndicator show={!!cardData?.data} />

        {/* Search Results */}
        {cardData?.data && <UI.SearchResults cardData={cardData} />}
        {setCardsData?.data && <UI.SearchResults cardData={setCardsData} />}
      </div>
    </div>
  );
}

export default App;
