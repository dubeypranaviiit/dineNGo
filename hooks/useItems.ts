
// import useSWR from "swr";
// import axios from "axios";

// interface ApiResponse<T> {
//   items: T[];
// }
// const fetcher = async <T>(url: string): Promise<T[]> => {
//   const res = await axios.get<ApiResponse<T>>(url);
//   return res.data.items;
// };

// export const useItems = <T = any>() => {
//   const { data, error, isLoading } = useSWR<T[]>("/api/item", (url: string) => fetcher<T>(url));

//   return {
//     items: data || [],
//     isLoading,
//     isError: error,
//   };
// };

import { useEffect, useState } from "react";
import { useItemStore } from "@/store/useItemStore";

export const useItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const items = useItemStore((state) => state.items);
  const loadItems = useItemStore((state) => state.loadItems);

  useEffect(() => {
    loadItems()
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { items, isLoading, isError };
};
