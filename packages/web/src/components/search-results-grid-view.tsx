import React from "react";

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

interface OriginalViewProps {
  sortedCardData: Card[];
  handleImageClick: (imageUrl: string) => void;
}

export const SearchResultsGridView: React.FC<OriginalViewProps> = ({
  sortedCardData,
  handleImageClick,
}) => (
  <div className="max-w-lg sm:max-w-2xl lg:max-w-4xl mt-8 mx-auto p-4 bg-white dark:bg-gray-800 shadow rounded">
    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
      Search Results
    </h2>
    <div className="grid grid-cols-1 gap-6">
      {sortedCardData.map((card: Card, index: number) => (
        <div
          key={index}
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg flex flex-col sm:flex-row items-center sm:items-start hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          {/* Card Image */}
          <img
            src={card.ImageUrl || "https://via.placeholder.com/150"}
            alt={card.CardName}
            className="w-32 h-32 object-cover mb-4 sm:mb-0 sm:mr-4 rounded-lg cursor-pointer"
            onClick={() =>
              handleImageClick(
                card.ImageUrl || "https://via.placeholder.com/150"
              )
            }
          />

          {/* Card Details */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {card.CardName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              <strong>Rarity:</strong> {card.Rarity}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              <strong>Market Price:</strong> ${card.Price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              <strong>Set Name:</strong> {card.SetName}
            </p>

            {/* Source Link */}
            <a
              href={card.Source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-2 inline-block"
            >
              View on TCG Player
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);
