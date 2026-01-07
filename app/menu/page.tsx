"use client";
import { useState, useEffect } from "react";
import DishCard from "@/components/DishCard";
import { useItemStore } from "@/store/useItemStore";
import { getCachedItems } from "@/utils/getCachedItems";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

interface Dish {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isSpecial?: boolean;
  diet: string;
}

const Page: React.FC = () => {
  const itemsFromStore = useItemStore((state) => state.items);
  const loadItems = useItemStore((state) => state.loadItems);


  const cachedItems = getCachedItems() || [];


  const mapToDish = (item: any): Dish => ({
    _id: item._id || item.id || "",
    name: item.name,
    description: item.description,
    image: item.image,
    price: item.price,
    category: item.category,
    isSpecial: item.isSpecial ?? false,
    diet: item.diet,
  });

  const initialItems: Dish[] = (itemsFromStore.length ? itemsFromStore : cachedItems).map(mapToDish);

  const [items, setItems] = useState<Dish[]>(initialItems);
  const [isLoading, setIsLoading] = useState(items.length === 0);
  const [isError, setIsError] = useState(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDiet, setSelectedDiet] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([40, 1000]);

  useEffect(() => {
    if (items.length === 0) {
      loadItems()
        .then(() => setItems((getCachedItems() || []).map(mapToDish)))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, []);

  
  const filteredMenu = items.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      dish.category.toLowerCase() === selectedCategory.toLowerCase();

    const normalizeDiet = (diet: string) =>
      diet.toLowerCase().includes("non") ? "non-veg" : "veg";

    const matchesDiet =
      selectedDiet === "all" || normalizeDiet(dish.diet) === selectedDiet;

    const matchesPrice =
      dish.price >= priceRange[0] && dish.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesDiet && matchesPrice;
  });

  const categorizedMenu: { [key: string]: Dish[] } = {};
  filteredMenu.forEach((dish) => {
    if (!categorizedMenu[dish.category]) categorizedMenu[dish.category] = [];
    categorizedMenu[dish.category].push(dish);
  });

  return (
    <section className="w-full flex flex-col px-4 py-16 gap-6">
      <div className="w-full bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search dishes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="appetizers">Appetizers</SelectItem>
            <SelectItem value="main">Main Course</SelectItem>
            <SelectItem value="desserts">Desserts</SelectItem>
            <SelectItem value="beverages">Beverages</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setSelectedDiet(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Diet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Diets</SelectItem>
            <SelectItem value="veg">Vegetarian</SelectItem>
            <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-600 mb-1">
            Max Price: ₹{priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-40"
          />
        </div>
      </div>
      <div className="p-4 space-y-10">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading menu...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load menu items.</p>
        ) : Object.keys(categorizedMenu).length > 0 ? (
          Object.entries(categorizedMenu).map(([category, dishes]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold capitalize text-center mb-4 border-b pb-2">
                {category.replace("-", " ")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {dishes.map((dish) => (
                  <DishCard
                    key={dish._id}
                    _id={dish._id}
                    name={dish.name}
                    description={dish.description}
                    image={dish.image}
                    price={dish.price}
                    category={dish.category}
                    isSpecial={dish.isSpecial ?? false}
                    diet={dish.diet === "veg" ? "veg" : "non-veg"}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No dishes found.</p>
        )}
      </div>
    </section>
  );
};

export default Page;
