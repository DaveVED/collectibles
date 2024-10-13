import useSWR from "swr";
import { fetcher } from "./fetcher";

export const useSetCards = (setName: string | null) => {
    const formattedSetName = setName
      ? setName.toLowerCase().replace(/\s+/g, "-")
      : null;
    const url = formattedSetName
      ? `https://api-dev.collectibles.studio/v1/sets/name/${formattedSetName}/cards`
      : null;
    const { data, error, isValidating } = useSWR(url, fetcher);
    return {
      setCardsData: data,
      isLoading: isValidating && !data,
      isError: error,
    };
  }