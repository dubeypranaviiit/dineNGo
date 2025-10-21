// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import DishCard from "./DishCard"; // Import DishCard component
//  import { menu } from "@/public/data/data";
// const FeaturedDishes: React.FC = () => {
//   const router = useRouter();
  

//   const visibleDishes = menu.slice(0, 3);
//   const showViewMore = menu.length > 4;

//   return (
//     <section className="py-20 px-4 bg-white">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-4xl font-bold text-center mb-12">Featured Dishes</h2>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full">
//           {visibleDishes.map((dish) => (
//             <DishCard key={dish.id} {...dish} />
//           ))}
//         </div>

//         {showViewMore && (
//           <div className="text-center mt-8">
//             <button
//               onClick={() => router.push("/menu")}
//               className="px-6 py-3 text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition"
//             >
//               View More
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedDishes;
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DishCards from "./DishCards";
import { menu } from "./menu";

const FeaturedDishes: React.FC = () => {
  const router = useRouter();
  const visibleDishes = menu.slice(0, 3);
  const showViewMore = menu.length > 3;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 w-full">
          {visibleDishes.map((dish) => (
            <DishCards key={dish.id} {...dish} />
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
