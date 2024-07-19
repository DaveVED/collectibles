"use client";

import { useEffect, useState } from "react";
import { Save } from 'lucide-react';

interface SelectedCollectionDisplayProps {
  collectionName: string;
}

type CardType = "Common" | "Uncommon" | "Rare" | "Super Rare" | "Secret Rare" | "Leader";

interface Item {
  cardId: string;
  cardName: string;
  cardType: CardType;
  userOwnsCard: boolean;
}

const cardTypeIcons: Record<CardType, string> = {
  "Common": "🃏",
  "Uncommon": "🔹",
  "Rare": "🔸",
  "Super Rare": "⭐",
  "Secret Rare": "💎",
  "Leader": "👑"
};

export function SelectedCollectionDisplay({
  collectionName,
}: SelectedCollectionDisplayProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`/api/collections/op/xxx`);
        if (!response.ok) {
          throw new Error(`Error fetching items: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data.cards);
        const preSelected = new Set<string>(data.cards.filter((item: Item) => item.userOwnsCard).map((item: Item) => item.cardId));
        setSelectedItems(preSelected);
      } catch (error) {
        setError(JSON.stringify(error));
      }
    }

    fetchItems();
  }, [collectionName]);

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        newSelectedItems.add(itemId);
      }
      return newSelectedItems;
    });
  };

  const handleSave = () => {
    const initialSelectedItems = new Set(items.filter((item) => item.userOwnsCard).map((item) => item.cardId));
    const newItems = Array.from(selectedItems).filter((item) => !initialSelectedItems.has(item));
    const removedItems = Array.from(initialSelectedItems).filter((item) => !selectedItems.has(item));

    console.log('New items:', newItems);
    console.log('Removed items:', removedItems);
  };

  return (
    <div className="ui-p-4 ui-relative">
      <div className="ui-mt-4 ui-text-lg ui-font-semibold ui-text-gray-700">
        Selected Collection: {collectionName}
      </div>
      <div className="ui-mt-4 ui-text-lg ui-font-semibold ui-text-gray-700">
        Items:
        {error ? (
          <div className="ui-text-red-500">Error: {error}</div>
        ) : (
          <div className="ui-grid ui-grid-cols-1 sm:ui-grid-cols-2 lg:ui-grid-cols-3 ui-gap-4 ui-mt-4">
            {items.map((item) => (
              <div key={item.cardId} className={`ui-flex ui-items-center ui-space-x-4 ui-p-2 ui-rounded ui-shadow hover:ui-shadow-md ui-transition-shadow ui-duration-150 ${item.userOwnsCard ? 'ui-bg-gray-200' : 'ui-bg-white'}`}>
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.cardId)}
                  onChange={() => handleCheckboxChange(item.cardId)}
                  className="ui-form-checkbox ui-h-4 ui-w-4 ui-text-blue-600 ui-transition ui-duration-150 ui-ease-in-out"
                />
                <div className="ui-flex ui-items-center ui-space-x-2">
                  <span>{cardTypeIcons[item.cardType]}</span>
                  <span className="ui-font-medium ui-text-gray-900">{item.cardName}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="ui-flex ui-justify-end ui-mt-4">
        <button
          onClick={handleSave}
          className="ui-flex ui-items-center ui-bg-purple-500 ui-text-white ui-rounded-lg ui-px-4 ui-py-2 sm:ui-py-3 sm:ui-px-6 hover:ui-bg-purple-600 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-purple-500"
        >
          <Save className="ui-mr-2 ui-w-5 ui-h-5" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}
