"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DishCard from "./DishCard"; // Import DishCard component
 import { menu } from "@/public/data/data";
const FeaturedDishes: React.FC = () => {
  const router = useRouter();
  
  // const dishes = [
  //   {
  //     id: 1,
  //     name: "Grilled Salmon",
  //     description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
  //     price: 29.99,
  //     image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927"
  //   },
  //   {
  //     id: 2,
  //     name: "Truffle Pasta",
  //     description: "Homemade pasta with black truffle and parmesan",
  //     price: 24.99,
  //     image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601"
  //   },
  //   {
  //     id: 3,
  //     name: "Wagyu Steak",
  //     description: "Premium Japanese Wagyu with seasonal vegetables",
  //     price: 89.99,
  //     image: "https://images.unsplash.com/photo-1546833998-877b37c3e18d"
  //   },
  //   {
  //     id: 4,
  //     name: "Sushi Platter",
  //     description: "Assorted fresh sushi with soy sauce and wasabi",
  //     price: 39.99,
  //     image: "https://images.unsplash.com/photo-1553621042-f6e147245754"
  //   },
  //   {
  //     id: 5,
  //     name: "Vegan Burger",
  //     description: "Plant-based patty with lettuce, tomato, and vegan mayo",
  //     price: 19.99,
  //     image: "https://images.unsplash.com/photo-1599021377136-d9264c76f811"
  //   }
  // ];

  const visibleDishes = menu.slice(0, 3);
  const showViewMore = menu.length > 4;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Dishes</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full">
          {visibleDishes.map((dish) => (
            <DishCard key={dish.id} {...dish} />
          ))}
        </div>

        {showViewMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => router.push("/menu")}
              className="px-6 py-3 text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDishes;
