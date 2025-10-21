"use client";

import React from "react";

const stats = [
  { label: "Years of Excellence", value: "12" },
  { label: "Signature Dishes", value: "50+" },
  { label: "Happy Customers", value: "10k+" },
];

const OurStory: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-6 text-gray-800">Our Story</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          Since 2010, we've been crafting unforgettable dining experiences with passion and dedication to culinary excellence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300"
            >
              <p className="text-5xl font-bold text-amber-500">{stat.value}</p>
              <p className="text-gray-700 text-lg mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
