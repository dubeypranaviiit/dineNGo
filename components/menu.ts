import { DietType } from "./DishCards";

export interface Dish {
  id: number;
  name: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
  description: string;
  diet: DietType;
  isSpecial?: boolean;
}

export const menu: Dish[] = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    price: 250,
    image: "/images/paneer.png",
    ingredients: "Paneer, Tomato, Cream",
    category: "Main Course",
    description: "Delicious creamy paneer curry.",
    diet: "veg",
    isSpecial: true,
  },
  {
    id: 2,
    name: "Chicken Curry",
    price: 300,
    image: "/images/chicken.jpg",
    ingredients: "Chicken, Spices",
    category: "Main Course",
    description: "Spicy chicken curry.",
    diet: "non-veg",
    isSpecial: false,
  },
  {
    id: 3,
    name: "Veg Fried Rice",
    price: 180,
    image: "/images/veg-fried-rice.jpg",
    ingredients: "Rice, Veggies",
    category: "Main Course",
    description: "Flavorful fried rice with vegetables.",
    diet: "veg",
    isSpecial: false,
  },
];
