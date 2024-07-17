"use client"
import { Search } from 'lucide-react';



  
export async function OwnedCollectionsSearch() {
  // Function to handle adding a new collection

  return (
    <div className="ui-relative ui-w-full ui-mb-4">
    <input
      type="text"
      className="ui-w-full ui-py-2 ui-pl-10 ui-pr-4 ui-border ui-border-gray-300 ui-rounded-lg focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-purple-500"
      placeholder="Search collections..."
    />
    <Search className="ui-absolute ui-left-3 ui-top-1/2 ui-transform ui--translate-y-1/2 ui-text-gray-400" size={20} />
  </div>
  );
}
