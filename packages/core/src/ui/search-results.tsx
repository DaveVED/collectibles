import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

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

type SortableCardKeys =
  | Extract<
      {
        [K in keyof Card]: Card[K] extends string | number ? K : never;
      }[keyof Card],
      string
    >
  | "Flags";

interface SearchResultsProps {
  cardData: { data: Card[] };
}

export const SearchResults: React.FC<SearchResultsProps> = ({ cardData }) => {
  const [isAscending, setIsAscending] = useState(true);
  const [sortColumn, setSortColumn] = useState<SortableCardKeys | "CardNumber">(
    "CardNumber",
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handler to toggle sorting direction or change sort column
  const handleSort = (column: SortableCardKeys | "CardNumber") => {
    if (sortColumn === column) {
      setIsAscending(!isAscending);
    } else {
      setSortColumn(column);
      setIsAscending(true);
    }
  };

  // Handler to open modal with selected image
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Function to format Card Number
  const formatCardNumber = (SK: string, SetID: string) => {
    const cardNumber = SK.split("#")[1];
    const setIDPart = SetID.split("#")[1].toLowerCase();
    return `${setIDPart}-${cardNumber}`;
  };

  // Function to count active flags
  const countFlags = (card: Card) => {
    let count = 0;
    if (card.AlternateArt) count++;
    if (card.Manga) count++;
    if (card.Parallel) count++;
    return count;
  };

  // Sorting logic using useMemo for performance optimization
  const sortedCardData = useMemo(() => {
    return [...cardData.data].sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;

      if (sortColumn === "CardNumber") {
        valueA = formatCardNumber(a.SK, a.SetID);
        valueB = formatCardNumber(b.SK, b.SetID);
      } else if (sortColumn === "Flags") {
        valueA = countFlags(a);
        valueB = countFlags(b);
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
  }, [cardData.data, sortColumn, isAscending]);

  return (
    <div className="ui-relative ui-p-4">
      <div className="ui-w-full ui-overflow-x-auto ui-bg-white dark:ui-bg-gray-800 ui-rounded-lg ui-shadow-md">
        <table className="ui-min-w-full ui-text-left ui-bg-white dark:ui-bg-gray-800">
          <thead className="ui-bg-gray-100 dark:ui-bg-gray-700 ui-text-gray-900 dark:ui-text-gray-100 uppercase text-xs">
            <tr>
              {/* Image Column (Non-sortable) */}
              <th className="ui-px-6 ui-py-3">Image</th>

              {/* Sortable Columns */}
              <th
                className="ui-px-6 ui-py-3 ui-cursor-pointer"
                onClick={() => handleSort("CardNumber")}
              >
                <div className="ui-flex ui-items-center">
                  Card Number
                  <div className="ui-flex ui-flex-col ui-ml-2">
                    <ChevronUp
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "CardNumber" && isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "CardNumber" && !isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="ui-px-6 ui-py-3 ui-cursor-pointer"
                onClick={() => handleSort("CardName")}
              >
                <div className="ui-flex ui-items-center">
                  Card Name
                  <div className="ui-flex ui-flex-col ui-ml-2">
                    <ChevronUp
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "CardName" && isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "CardName" && !isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="ui-px-6 ui-py-3 ui-cursor-pointer"
                onClick={() => handleSort("Rarity")}
              >
                <div className="ui-flex ui-items-center">
                  Rarity
                  <div className="ui-flex ui-flex-col ui-ml-2">
                    <ChevronUp
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "Rarity" && isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "Rarity" && !isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="ui-px-6 ui-py-3 ui-cursor-pointer"
                onClick={() => handleSort("Flags")}
              >
                <div className="ui-flex ui-items-center">
                  Flags
                  <div className="ui-flex ui-flex-col ui-ml-2">
                    <ChevronUp
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "Flags" && isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "Flags" && !isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="ui-px-6 ui-py-3 ui-cursor-pointer"
                onClick={() => handleSort("Price")}
              >
                <div className="ui-flex ui-items-center">
                  Market Price
                  <div className="ui-flex ui-flex-col ui-ml-2">
                    <ChevronUp
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "Price" && isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "Price" && !isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="ui-px-6 ui-py-3 ui-cursor-pointer"
                onClick={() => handleSort("SetName")}
              >
                <div className="ui-flex ui-items-center">
                  Set Name
                  <div className="ui-flex ui-flex-col ui-ml-2">
                    <ChevronUp
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "SetName" && isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "SetName" && !isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="ui-px-6 ui-py-3 ui-cursor-pointer"
                onClick={() => handleSort("Source")}
              >
                <div className="ui-flex ui-items-center">
                  Source
                  <div className="ui-flex ui-flex-col ui-ml-2">
                    <ChevronUp
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "Source" && isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`ui-w-4 ui-h-4 ${
                        sortColumn === "Source" && !isAscending
                          ? "ui-text-blue-500"
                          : "ui-text-gray-400 dark:ui-text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCardData.map((card: Card, index: number) => (
              <tr
                key={index}
                className="ui-bg-gray-50 hover:ui-bg-gray-100 dark:ui-bg-gray-700 dark:hover:ui-bg-gray-600 ui-text-gray-900 dark:ui-text-gray-100 ui-border-b dark:ui-border-gray-600"
              >
                {/* Image Cell */}
                <td className="ui-px-6 ui-py-4">
                  <img
                    src={card.ImageUrl || "https://via.placeholder.com/150"}
                    alt={card.CardName}
                    className="ui-w-16 ui-h-16 ui-object-cover ui-cursor-pointer ui-rounded-lg"
                    onClick={() =>
                      handleImageClick(
                        card.ImageUrl || "https://via.placeholder.com/150",
                      )
                    }
                  />
                </td>

                {/* Card Number */}
                <td className="ui-px-6 ui-py-4">
                  {formatCardNumber(card.SK, card.SetID)}
                </td>

                {/* Card Name */}
                <td className="ui-px-6 ui-py-4">{card.CardName}</td>

                {/* Rarity */}
                <td className="ui-px-6 ui-py-4">{card.Rarity}</td>

                {/* Flags */}
                <td className="ui-px-6 ui-py-4">
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

                {/* Market Price */}
                <td className="ui-px-6 ui-py-4">${card.Price.toFixed(2)}</td>

                {/* Set Name */}
                <td className="ui-px-6 ui-py-4">{card.SetName}</td>

                {/* Source */}
                <td className="ui-px-6 ui-py-4">
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
      </div>

      {/* Modal for Enlarged Image */}
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
