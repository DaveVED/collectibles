import useSWR from "swr";
import { fetcher } from "./fetcher";

export const useCards = (setName: string | null, cardCode?: string | null) => {
  const formattedSetName = setName
    ? setName.toLowerCase().replace(/\s+/g, "-")
    : null;

  let url = null;
  if (formattedSetName) {
    if (cardCode) {
      url = `https://api-dev.collectibles.studio/v1/sets/name/${formattedSetName}/cards/code/${cardCode}`;
    } else {
      url = `https://api-dev.collectibles.studio/v1/sets/name/${formattedSetName}/cards`;
    }
  }

  const { data, error, isValidating } = useSWR(url, fetcher);

  return {
    data,
    isLoading: isValidating && !data,
    isError: error,
  };
};
