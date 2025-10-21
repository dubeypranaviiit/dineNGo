
// import useSWR from "swr";
// import axios from "axios";

// const fetcher = (url: string) => axios.get(url).then(res => res.data.items);

// export const useItems = () => {
//   const { data, error, isLoading } = useSWR("/api/item", fetcher);
//   return {
//     items: data || [],
//     isLoading,
//     isError: error,
//   };
// };
// import useSWR from "swr";
// import axios from "axios";

// // Generic fetcher
// const fetcher = <T>(url: string) => axios.get<T>(url).then(res => res.data.items);

// export const useItems = <T = any>() => {
//   const { data, error, isLoading } = useSWR<T[]>("/api/item", url => fetcher<T>(url));

//   return {
//     items: data || [],
//     isLoading,
//     isError: error,
//   };
// };
import useSWR from "swr";
import axios from "axios";

interface ApiResponse<T> {
  items: T[];
}

// Generic fetcher
const fetcher = async <T>(url: string): Promise<T[]> => {
  const res = await axios.get<ApiResponse<T>>(url);
  return res.data.items;
};

export const useItems = <T = any>() => {
  const { data, error, isLoading } = useSWR<T[]>("/api/item", (url: string) => fetcher<T>(url));

  return {
    items: data || [],
    isLoading,
    isError: error,
  };
};

