// "use client"
// import React, { useState } from "react";
// import Image from "next/image";
// import { FaLeaf, FaHamburger, FaSearch, FaStar } from "react-icons/fa";
// import { BiDrink } from "react-icons/bi";
// import { GiCupcake, GiHotMeal } from "react-icons/gi";
// interface DishCardProps {
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
// }

// const DishCard: React.FC<DishCardProps> = ({ name, description, price, image,category }) => {
//   const [showFull, setShowFull] = useState(false);
//   const shortDescription = description.length > 100 ? description.slice(0, 100) + "..." : description;
//   const CategoryIcon = ({ category }) => {
//     switch (category) {
//       case "appetizers":
//         return <GiHotMeal className="text-xl" />;
//       case "main":
//         return <FaHamburger className="text-xl" />;
//       case "desserts":
//         return <GiCupcake className="text-xl" />;
//       case "beverages":
//         return <BiDrink className="text-xl" />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
//       <Image
//         src={image || "/placeholder.jpg"} 
//         alt={name}
//         width={250}
//         height={150}
//         className="w-full h-44 object-cover"
//       />
//       <div className="p-6 bg-white">
//         <h3 className="text-xl font-semibold mb-2">{name}</h3>
//         <p className="text-gray-600 mb-4">
//           {showFull ? description : shortDescription}
//         </p>
//         {description.length > 100 && (
//           <button
//             onClick={() => setShowFull(!showFull)}
//             className="text-amber-500 font-medium hover:underline"
//           >
//             {showFull ? "Read Less" : "Read More"}
//           </button>
//         )}

//         <p className="text-amber-500 font-bold mt-2">${price.toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// export default DishCard;
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaLeaf, FaHamburger, FaStar } from "react-icons/fa";
import { BiDrink } from "react-icons/bi";
import { GiCupcake, GiHotMeal } from "react-icons/gi";

interface DishCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isSpecial?: boolean; // New prop for special dish
  diet?: "veg" | "non-veg"; // New prop for diet type
}

const DishCard: React.FC<DishCardProps> = ({ name, description, price, image, category, isSpecial, diet }) => {
  const [showFull, setShowFull] = useState(false);
  const shortDescription = description.length > 100 ? description.slice(0, 100) + "..." : description;

  // Category icon logic
  const CategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
      case "appetizers":
        return <GiHotMeal className="text-xl" />;
      case "main":
        return <FaHamburger className="text-xl" />;
      case "desserts":
        return <GiCupcake className="text-xl" />;
      case "beverages":
        return <BiDrink className="text-xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
      {/* Dish Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.jpg"} 
          alt={name}
          width={250}
          height={150}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {isSpecial && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-white p-2 rounded-full">
            <FaStar />
          </div>
        )}
      </div>

      {/* Dish Details */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          {/* Diet Icon */}
          <div className={`${diet === "veg" ? "text-green-500" : "text-red-500"}`}>
            {diet === "veg" ? <FaLeaf /> : <FaHamburger />}
          </div>
        </div>

        {/* Dish Description */}
        <p className="text-gray-600 mb-4">{showFull ? description : shortDescription}</p>
        {description.length > 100 && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="text-amber-500 font-medium hover:underline"
          >
            {showFull ? "Read Less" : "Read More"}
          </button>
        )}

        {/* Price and Category */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-green-600">${price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <CategoryIcon category={category} />
            <span className="capitalize text-sm text-gray-500">{category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
