import React, { useState } from "react";
import { FaFilter, FaSortUp, FaSortDown, FaTimes } from "react-icons/fa";

interface Card {
  CardName: string;
  Rarity: string;
  Price: number;
  SetName: string;
  Source: string;
  SK: string;
  SetID: string;
  ImageUrl?: string;
  AlternateArt?: boolean;
  Manga?: boolean;
  Parallel?: boolean;
}

type SortableCardKeys = Extract<
  {
    [K in keyof Card]: Card[K] extends string | number ? K : never;
  }[keyof Card],
  string
>;

interface SearchResultsProps {
  cardData: { data: Card[] };
}

export const SearchResults: React.FC<SearchResultsProps> = ({ cardData }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [sortColumn, setSortColumn] = useState<SortableCardKeys | "CardNumber">(
    "CardNumber"
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");

  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleSort = (column: SortableCardKeys | "CardNumber") => {
    if (sortColumn === column) {
      setIsAscending(!isAscending);
    } else {
      setSortColumn(column);
      setIsAscending(true);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const formatCardNumber = (SK: string, SetID: string) => {
    const cardNumber = SK.split("#")[1];
    const setIDPart = SetID.split("#")[1].toLowerCase();
    return `${setIDPart}-${cardNumber}`;
  };

  // Apply filtering
  const filteredCardData = cardData.data.filter((card) =>
    card.CardName.toLowerCase().includes(filterText.toLowerCase())
  );

  // Sort card data
  const sortedCardData = [...filteredCardData].sort((a, b) => {
    let valueA: string | number;
    let valueB: string | number;

    if (sortColumn === "CardNumber") {
      valueA = formatCardNumber(a.SK, a.SetID);
      valueB = formatCardNumber(b.SK, b.SetID);
    } else {
      valueA = a[sortColumn] as string | number;
      valueB = b[sortColumn] as string | number;
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return isAscending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === "number" && typeof valueB === "number") {
      return isAscending ? valueA - valueB : valueB - valueA;
    } else {
      // Fallback for mixed types or undefined values
      return 0;
    }
  });

  // Table Design
  return (
    <div className="ui-relative ui-p-4">
      <div className="ui-w-full ui-overflow-x-auto ui-bg-white dark:ui-bg-gray-800 ui-rounded-lg ui-shadow-md">
        <table className="ui-min-w-full ui-text-left ui-bg-white dark:ui-bg-gray-800">
          <thead className="ui-bg-gray-100 dark:ui-bg-gray-700 ui-text-gray-900 dark:ui-text-gray-100">
            <tr>
              <th className="ui-px-4 ui-py-2">Image</th>
              <th
                className="ui-px-4 ui-py-2 ui-cursor-pointer"
                onClick={() => handleSort("CardNumber")}
              >
                <div className="ui-flex ui-items-center">
                  Card Number
                  {sortColumn === "CardNumber" && (
                    isAscending ? (
                      <FaSortUp className="ui-ml-1" />
                    ) : (
                      <FaSortDown className="ui-ml-1" />
                    )
                  )}
                </div>
              </th>
              <th className="ui-px-4 ui-py-2">
                <div className="ui-flex ui-items-center">
                  Card Name
                  <FaFilter
                    className="ui-ml-2 ui-cursor-pointer"
                    onClick={handleFilterToggle}
                  />
                  {sortColumn === "CardName" && (
                    isAscending ? (
                      <FaSortUp className="ui-ml-1" />
                    ) : (
                      <FaSortDown className="ui-ml-1" />
                    )
                  )}
                </div>
              </th>
              <th
                className="ui-px-4 ui-py-2 ui-cursor-pointer"
                onClick={() => handleSort("Rarity")}
              >
                <div className="ui-flex ui-items-center">
                  Rarity
                  {sortColumn === "Rarity" && (
                    isAscending ? (
                      <FaSortUp className="ui-ml-1" />
                    ) : (
                      <FaSortDown className="ui-ml-1" />
                    )
                  )}
                </div>
              </th>
              {/* New Column for Flags */}
              <th className="ui-px-4 ui-py-2">Flags</th>
              <th
                className="ui-px-4 ui-py-2 ui-cursor-pointer"
                onClick={() => handleSort("Price")}
              >
                <div className="ui-flex ui-items-center">
                  Market Price
                  {sortColumn === "Price" && (
                    isAscending ? (
                      <FaSortUp className="ui-ml-1" />
                    ) : (
                      <FaSortDown className="ui-ml-1" />
                    )
                  )}
                </div>
              </th>
              <th className="ui-px-4 ui-py-2">Set Name</th>
              <th className="ui-px-4 ui-py-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {sortedCardData.map((card: Card, index: number) => (
              <tr
                key={index}
                className="ui-bg-gray-50 hover:ui-bg-gray-100 dark:ui-bg-gray-700 dark:hover:ui-bg-gray-600 ui-text-gray-900 dark:ui-text-gray-100 ui-border-b dark:ui-border-gray-600"
              >
                <td className="ui-px-4 ui-py-2">
                  <img
                    src={card.ImageUrl || "https://via.placeholder.com/150"}
                    alt={card.CardName}
                    className="ui-w-16 ui-h-16 ui-object-cover ui-cursor-pointer ui-rounded-lg"
                    onClick={() =>
                      handleImageClick(
                        card.ImageUrl || "https://via.placeholder.com/150"
                      )
                    }
                  />
                </td>
                <td className="ui-px-4 ui-py-2">
                  {formatCardNumber(card.SK, card.SetID)}
                </td>
                <td className="ui-px-4 ui-py-2">{card.CardName}</td>
                <td className="ui-px-4 ui-py-2">{card.Rarity}</td>
                {/* Flags Column */}
                <td className="ui-px-4 ui-py-2">
                  {card.AlternateArt && (
                    <span className="ui-bg-blue-100 ui-text-blue-800 ui-text-xs ui-font-semibold ui-mr-1 ui-px-2 ui-py-0.5 ui-rounded dark:ui-bg-blue-200 dark:ui-text-blue-800">
                      Alt Art
                    </span>
                  )}
                  {card.Manga && (
                    <span className="ui-bg-green-100 ui-text-green-800 ui-text-xs ui-font-semibold ui-mr-1 ui-px-2 ui-py-0.5 ui-rounded dark:ui-bg-green-200 dark:ui-text-green-800">
                      Manga
                    </span>
                  )}
                  {card.Parallel && (
                    <span className="ui-bg-purple-100 ui-text-purple-800 ui-text-xs ui-font-semibold ui-mr-1 ui-px-2 ui-py-0.5 ui-rounded dark:ui-bg-purple-200 dark:ui-text-purple-800">
                      Parallel
                    </span>
                  )}
                </td>
                <td className="ui-px-4 ui-py-2">${card.Price.toFixed(2)}</td>
                <td className="ui-px-4 ui-py-2">{card.SetName}</td>
                <td className="ui-px-4 ui-py-2">
                  <a
                    href={card.Source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ui-text-blue-600 dark:ui-text-blue-400 hover:ui-underline"
                  >
                    View on TCG Player
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Filter Dropdown */}
        {filterOpen && (
          <div className="ui-absolute ui-top-16 ui-right-0 ui-bg-white dark:ui-bg-gray-700 ui-p-4 ui-shadow ui-rounded ui-mt-2 ui-z-10">
            <input
              type="text"
              placeholder="Filter by Card Name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="ui-w-full ui-px-3 ui-py-2 ui-border ui-rounded ui-text-gray-900 dark:ui-text-gray-100 ui-bg-gray-50 dark:ui-bg-gray-800 ui-border-gray-300 dark:ui-border-gray-600 focus:ui-outline-none"
            />
          </div>
        )}
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          className="ui-fixed ui-inset-0 ui-flex ui-items-center ui-justify-center ui-bg-black ui-bg-opacity-90 ui-z-50"
          onClick={handleCloseModal}
        >
          <img
            src={selectedImage}
            alt="Card"
            className="ui-max-w-full ui-max-h-full ui-object-contain"
          />
        </div>
      )}
    </div>
  );
};
