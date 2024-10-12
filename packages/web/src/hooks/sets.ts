import useSWR from "swr";
import { fetcher } from "./fetcher";

function useCardData(setPart: string | null, numberPart: string | null) {
    const url =
      setPart && numberPart
        ? `https://api-dev.collectibles.studio/v1/cards/${setPart}/${numberPart}`
        : null; // SWR handles null by not fetching
  
    const { data, error, isLoading } = useSWR(url, fetcher);
  
    return {
      cardData: data,
      isLoading,
      isError: error,
    };
  }