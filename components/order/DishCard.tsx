"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

interface DishCardProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  diet: "veg" | "non-veg";
  isSpecial?: boolean; 
}

const DishCard: React.FC<DishCardProps> = ({
  _id,
  name,
  description,
  price,
  image,
  category,
  diet,
  isSpecial = false,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { items, addToCart, decrementItem } = useCartStore();
  const cartItem = items.find((i) => i._id === _id);
  const quantity = cartItem?.quantity || 0;
  const wordLimit = 25;
  const words = description.trim().split(" ");
  const isLong = words.length > wordLimit;
  const shortDescription = words.slice(0, wordLimit).join(" ") + "...";
  const handleAdd = () => addToCart({ _id, name, price, image });
  const handleRemove = () => decrementItem(_id);
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={image} alt={name} fill className="object-cover" />
        {isSpecial && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-yellow-500 text-white">Chef's Special</Badge>
          </div>
        )}
        <div className="absolute bottom-2 right-2">
          <Badge className={`text-white ${diet === "veg" ? "bg-green-600" : "bg-red-600"}`}>
            {diet.toUpperCase()}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">
          {expanded || !isLong ? description : shortDescription}
          {isLong && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((prev) => !prev);
              }}
              className="text-blue-600 ml-1 hover:underline text-xs"
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          )}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="font-medium text-gray-800">₹{price}</span>
          <Badge variant="outline" className="text-xs capitalize">
            {category}
          </Badge>
        </div>

        {quantity === 0 ? (
          <Button onClick={handleAdd} className="w-full mt-3 bg-green-600 hover:bg-green-700">
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between mt-3 border rounded-lg px-3 py-1">
            <Button onClick={handleRemove} className="bg-gray-200 hover:bg-gray-300 p-1">
              -
            </Button>
            <span className="font-semibold">{quantity}</span>
            <Button onClick={handleAdd} className="bg-gray-200 hover:bg-gray-300 p-1">
              +
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DishCard;
