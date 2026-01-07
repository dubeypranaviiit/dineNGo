"use client";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

const DishCard = ({
  name,
  description,
  price,
  image,
  category,
  diet,
  isSpecial = false, 
}: DishCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const wordLimit = 25;

  const words = description.trim().split(" ");
  const isLong = words.length > wordLimit;
  const shortDescription = words.slice(0, wordLimit).join(" ") + "...";

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
          <Badge
            className={`text-white ${diet === "veg" ? "bg-green-600" : "bg-red-600"}`}
          >
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
      </CardContent>
    </Card>
  );
};

export default DishCard;
