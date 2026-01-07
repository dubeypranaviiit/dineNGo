
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
