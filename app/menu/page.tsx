// "use client"
// import { useState } from "react";
// import DishCard from "@/components/DishCard";
// import { menu } from "@/public/data/data";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input"; // ShadCN Input for Search
// import { FaSearch } from "react-icons/fa"; // Search Icon

// const Page = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedDiet, setSelectedDiet] = useState("all");
//   const [priceRange, setPriceRange] = useState([0, 50]);
//   const filteredMenu = menu.filter((dish) => {
//     const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === "all" || dish.category === selectedCategory;
//     const matchesDiet = selectedDiet === "all" || dish.diet === selectedDiet;
//     const matchesPrice = dish.price >= priceRange[0] && dish.price <= priceRange[1];
//     return matchesSearch && matchesCategory && matchesDiet && matchesPrice;

//   });

//   return (
//     <section className="w-full h-screen">
//       {/* Filters */}

//    <div className="w-full  flex flex-col sm:mb-1 md:flex-row gap-2 md:mb-6 items-center justify-between mt-5 top-0 left-0 ">
//         {/* Search Bar */}
//         <div className="relative w-full md:w-96">
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <Input
//             type="text"
//             placeholder="Search dishes..."
//             className="pl-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Category Filter */}
//         <Select onValueChange={(value) => setSelectedCategory(value)}>
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Select Category" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Categories</SelectItem>
//             <SelectItem value="appetizers">Appetizers</SelectItem>
//             <SelectItem value="main">Main Course</SelectItem>
//             <SelectItem value="desserts">Desserts</SelectItem>
//             <SelectItem value="beverages">Beverages</SelectItem>
//           </SelectContent>
//         </Select>
//         {/* Diet Filter */}
//         <Select onValueChange={(value) => setSelectedDiet(value)}>
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Select Diet" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Diets</SelectItem>
//             <SelectItem value="veg">Vegetarian</SelectItem>
//             <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
//           </SelectContent>
//         </Select>
//         <div className="flex flex-col items-center">
//           <label className="text-gray-600 text-sm mb-1">Max Price: ${priceRange[1]}</label>
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={priceRange[1]}
//             onChange={(e) => setPriceRange([0, Number(e.target.value)])}
//             className="w-40"
//           />
//         </div>
//       </div>

    
   
      



//       {/* Dish Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
//         {filteredMenu.length > 0 ? (
//           filteredMenu.map((dish, index) => (
//             <DishCard
//               key={index}
//               name={dish.name}
//               description={dish.description}
//               image={dish.image}
//               price={dish.price}
//               category={dish.category}
//               isSpecial={dish.isSpecial}
//               diet={dish.diet}
//             />
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-600">No dishes found.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Page;

"use client";
import { useState } from "react";
import DishCard from "@/components/DishCard";
import { menu } from "@/public/data/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // ShadCN Input for Search
import { FaSearch } from "react-icons/fa"; // Search Icon

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10**6]);

  const filteredMenu = menu.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dish.category === selectedCategory;
    const matchesDiet = selectedDiet === "all" || dish.diet === selectedDiet;
    const matchesPrice = dish.price >= priceRange[0] && dish.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesDiet && matchesPrice;
  });

  return (
    <section className="w-full h-screen flex flex-col">
      {/* Sticky Filter Bar */}
      
      <div className="w-full bg-white shadow-md py-4 px-6 sticky top-0 left-0 z-50 flex flex-col sm:flex-row gap-2 md:gap-4 items-center justify-between">
        {/* Search Bar */}
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
          <SelectTrigger className="w-[200px]">
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
          <SelectTrigger className="w-[200px]">
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
          <label className="text-gray-600 text-sm mb-1">Max Price: ${priceRange[1]}</label>
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

      {/* Scrollable Dish Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((dish, index) => (
              <DishCard
                key={index}
                name={dish.name}
                description={dish.description}
                image={dish.image}
                price={dish.price}
                category={dish.category}
                isSpecial={dish.isSpecial}
                diet={dish.diet}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No dishes found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
