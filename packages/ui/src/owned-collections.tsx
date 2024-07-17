import { SelectUser } from "@repo/public-db/schema";
import { AddCollectionButton } from "./add-collection-button";

interface OwnedCollectionsProps {
  userProfile: SelectUser;
}

const collections = [
    {
      name: 'scarlet-and-violet',
      imageUrl: '/images/scarlet-and-violet.jpg', 
    },
    {
      name: 'romance-dawn',
      imageUrl: '/images/romance-dawn.jpg',
    },
  ];

  
export async function OwnedCollections({ userProfile }: OwnedCollectionsProps) {

  return (
    <>
      <div className="ui-flex ui-items-center ui-justify-between ui-mb-4">
        <h2 className="ui-text-lg ui-font-semibold ui-text-gray-700 ui-mb-2">Owned Collections</h2>
        <AddCollectionButton userProfile={userProfile}/>
      </div>
      <div className="ui-flex ui-flex-wrap ui-gap-2 ui-mb-4">
        {collections.map((collection) => (
          <div
            key={collection.name}
            className="ui-bg-gray-200 ui-rounded-full ui-px-4 ui-py-2 ui-text-gray-700 ui-text-xs sm:ui-text-sm"
          >
            {collection.name}
          </div>
        ))}
      </div>
    </>
  );
}
