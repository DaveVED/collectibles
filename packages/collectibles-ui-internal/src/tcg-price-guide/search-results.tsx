import React from "react";

interface Card {
  CardName: string;
  Rarity: string;
  Price: number;
  SetName: string;
  Source: string;
}

interface SearchResultsProps {
  cardData: { data: Card[] };
}

export const SearchResults: React.FC<SearchResultsProps> = ({ cardData }) => {
  return (
    <div className="ui-max-w-lg sm:ui-max-w-2xl lg:ui-max-w-2xl ui-mt-8 ui-mx-auto ui-p-4 ui-bg-white dark:ui-bg-gray-800 ui-shadow ui-rounded">
      <h2 className="ui-text-lg ui-font-semibold ui-mb-4 ui-text-gray-900 dark:ui-text-gray-100">
        Search Results
      </h2>
      <div className="ui-grid ui-grid-cols-1 ui-gap-6">
        {cardData.data.map((card: Card, index: number) => (
          <div
            key={index}
            className="ui-p-4 ui-bg-gray-50 dark:ui-bg-gray-700 ui-rounded-lg ui-shadow-lg ui-flex ui-flex-col sm:ui-flex-row ui-items-center sm:ui-items-start"
          >
            {/* Card Image */}
            <img
              src="https://via.placeholder.com/150" // Replace with actual image URL
              alt={card.CardName}
              className="ui-w-32 ui-h-32 ui-object-cover ui-mb-4 sm:ui-mb-0 sm:ui-mr-4 ui-rounded-lg"
            />

            {/* Card Details */}
            <div className="ui-flex-1">
              <h3 className="ui-text-xl ui-font-bold ui-text-gray-900 dark:ui-text-gray-100 ui-mb-2">
                {card.CardName}
              </h3>
              <p className="ui-text-sm ui-text-gray-600 dark:ui-text-gray-300 ui-mb-1">
                <strong>Rarity:</strong> {card.Rarity}
              </p>
              <p className="ui-text-sm ui-text-gray-600 dark:ui-text-gray-300 ui-mb-1">
                <strong>Market Price:</strong> ${card.Price.toFixed(2)}
              </p>
              <p className="ui-text-sm ui-text-gray-600 dark:ui-text-gray-300 ui-mb-1">
                <strong>Set Name:</strong> {card.SetName}
              </p>

              {/* Source Link */}
              <a
                href={card.Source}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-text-blue-600 dark:ui-text-blue-400 hover:ui-underline ui-text-sm ui-mt-2 ui-inline-block"
              >
                View on TCG Player
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
