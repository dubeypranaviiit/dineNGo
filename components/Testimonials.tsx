"use client";
import React, { useEffect, useState } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";
interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/blog_pic_1.png",
    rating: 5,
    comment: "Amazing food and great ambiance! Highly recommend."
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/blog_pic_2.png",
    rating: 4,
    comment: "Loved the experience! The service was excellent."
  },
  {
    id: 3,
    name: "Michael Brown",
    avatar: "/blog_pic_3.png",
    rating: 5,
    comment: "A must-visit place for food lovers!"
  }
];

const Testimonials: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial>(testimonials[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => {
        const nextIndex = (testimonials.findIndex(t => t.id === prev.id) + 1) % testimonials.length;
        return testimonials[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Guests Say</h2>
        <div className="bg-gray-50 p-8 rounded-lg max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Image
              src={currentTestimonial.avatar}
              alt={currentTestimonial.name}
              width={500} // Set appropriate width
              height={400} 
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-semibold">{currentTestimonial.name}</h3>
              <div className="flex justify-center text-amber-500">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <FaQuoteLeft className="text-gray-200 text-4xl absolute -top-2 -left-2" />
            <p className="text-gray-600 italic pl-8">{currentTestimonial.comment}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
