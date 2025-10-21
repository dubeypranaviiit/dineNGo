"use client";

import { useState } from "react";
import DishCard from "@/components/order/DishCard";
import { useItems } from "@/hooks/useItems";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

const Page = () => {
  const { items, isLoading, isError } = useItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [priceRange, setPriceRange] = useState([1, 200]);


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
  // Group dishes by category
  const categorizedMenu: { [key: string]: typeof items } = {};
  filteredMenu.forEach((dish) => {
    if (!categorizedMenu[dish.category]) {
      categorizedMenu[dish.category] = [];
    }
    categorizedMenu[dish.category].push(dish);
  });

  return (
    <section className="w-full flex flex-col px-4 py-16 gap-6">
      {/* Filter Bar */}
      <div className="w-full bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
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

        {/* Category Filter */}
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

        {/* Diet Filter */}
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

        {/* Price Filter */}
        <div className="flex flex-col items-center">
          <label className="text-sm text-gray-600 mb-1">
            Max Price: ₹{priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-40"
          />
        </div>
      </div>

      {/* Dish Display */}
      <div className="p-4 space-y-10">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading menu...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load menu items.</p>
        ) : Object.keys(categorizedMenu).length > 0 ? (
          Object.entries(categorizedMenu).map(([category, dishes]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold capitalize  text-center mb-4 border-b pb-2">
                {category.replace("-", " ")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {dishes.map((dish, index) => (
                  <DishCard
                   key={dish._id}
                   _id={dish._id}
                  name={dish.name}
                  description={dish.description}
                  image={dish.image}
                  price={dish.price}
                 category={dish.category}
                 isSpecial={dish.isSpecial}
                 diet={dish.diet}
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
