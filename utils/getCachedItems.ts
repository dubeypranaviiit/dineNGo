export const getCachedItems = () => {
  if (typeof window === "undefined") return null; 

  const CACHE_KEY = "items_cache";
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { items, timestamp } = JSON.parse(cached);
      const CACHE_TIME = 15 * 60 * 1000; 
      if (Date.now() - timestamp < CACHE_TIME) {
        return items;
      }
    }
  } catch (err) {
    console.error("Failed to read cached items:", err);
  }
  return null;
};
