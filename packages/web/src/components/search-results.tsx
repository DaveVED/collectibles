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
    <div className="relative p-4">
      <div className="w-full overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <table className="min-w-full text-left bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 uppercase text-xs">
            <tr>
              {/* Image Column (Non-sortable) */}
              <th className="px-6 py-3">Image</th>

              {/* Sortable Columns */}
              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("CardNumber")}
              >
                <div className="flex items-center">
                  Card Number
                  <div className="flex flex-col ml-2">
                    <ChevronUp
                      className={`w-4 h-4 ${
                        sortColumn === "CardNumber" && isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`w-4 h-4 ${
                        sortColumn === "CardNumber" && !isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("CardName")}
              >
                <div className="flex items-center">
                  Card Name
                  <div className="flex flex-col ml-2">
                    <ChevronUp
                      className={`w-4 h-4 ${
                        sortColumn === "CardName" && isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`w-4 h-4 ${
                        sortColumn === "CardName" && !isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("Rarity")}
              >
                <div className="flex items-center">
                  Rarity
                  <div className="flex flex-col ml-2">
                    <ChevronUp
                      className={`w-4 h-4 ${
                        sortColumn === "Rarity" && isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`w-4 h-4 ${
                        sortColumn === "Rarity" && !isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("Flags")}
              >
                <div className="flex items-center">
                  Flags
                  <div className="flex flex-col ml-2">
                    <ChevronUp
                      className={`w-4 h-4 ${
                        sortColumn === "Flags" && isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`w-4 h-4 ${
                        sortColumn === "Flags" && !isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("Price")}
              >
                <div className="flex items-center">
                  Market Price
                  <div className="flex flex-col ml-2">
                    <ChevronUp
                      className={`w-4 h-4 ${
                        sortColumn === "Price" && isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`w-4 h-4 ${
                        sortColumn === "Price" && !isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("SetName")}
              >
                <div className="flex items-center">
                  Set Name
                  <div className="flex flex-col ml-2">
                    <ChevronUp
                      className={`w-4 h-4 ${
                        sortColumn === "SetName" && isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`w-4 h-4 ${
                        sortColumn === "SetName" && !isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th
                className="px-6 py-3 cursor-pointer"
                onClick={() => handleSort("Source")}
              >
                <div className="flex items-center">
                  Source
                  <div className="flex flex-col ml-2">
                    <ChevronUp
                      className={`w-4 h-4 ${
                        sortColumn === "Source" && isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <ChevronDown
                      className={`w-4 h-4 ${
                        sortColumn === "Source" && !isAscending
                          ? "text-blue-500"
                          : "text-gray-400 dark:text-gray-500"
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
                className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 border-b dark:border-gray-600"
              >
                {/* Image Cell */}
                <td className="px-6 py-4">
                  <img
                    src={card.ImageUrl || "https://via.placeholder.com/150"}
                    alt={card.CardName}
                    className="w-16 h-16 object-cover cursor-pointer rounded-lg"
                    onClick={() =>
                      handleImageClick(
                        card.ImageUrl || "https://via.placeholder.com/150",
                      )
                    }
                  />
                </td>

                {/* Card Number */}
                <td className="px-6 py-4">
                  {formatCardNumber(card.SK, card.SetID)}
                </td>

                {/* Card Name */}
                <td className="px-6 py-4">{card.CardName}</td>

                {/* Rarity */}
                <td className="px-6 py-4">{card.Rarity}</td>

                {/* Flags */}
                <td className="px-6 py-4">
                  {card.AlternateArt && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-1 px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                      Alt Art
                    </span>
                  )}
                  {card.Manga && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold mr-1 px-2 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
                      Manga
                    </span>
                  )}
                  {card.Parallel && (
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold mr-1 px-2 py-0.5 rounded dark:bg-purple-200 dark:text-purple-800">
                      Parallel
                    </span>
                  )}
                </td>

                {/* Market Price */}
                <td className="px-6 py-4">${card.Price.toFixed(2)}</td>

                {/* Set Name */}
                <td className="px-6 py-4">{card.SetName}</td>

                {/* Source */}
                <td className="px-6 py-4">
                  <a
                    href={card.Source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
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
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50"
          onClick={handleCloseModal}
        >
          <img
            src={selectedImage}
            alt="Card"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};
