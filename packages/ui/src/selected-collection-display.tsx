"use client";

interface SelectedCollectionDisplayProps {
  collectionName: string;
}

export function SelectedCollectionDisplay({
  collectionName,
}: SelectedCollectionDisplayProps) {
  return (
    <div className="ui-mt-4 ui-text-lg ui-font-semibold ui-text-gray-700">
      Selected Collection: {collectionName}
    </div>
  );
}
