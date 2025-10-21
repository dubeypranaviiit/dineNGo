"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import admin from "@/public/admin/admin";
const Hero: React.FC = () => {
  return (
    <div className="relative h-screen">
    
      <div className="absolute inset-0">
        <Image
          src={admin.bg_rest}
          alt="Restaurant interior"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Welcome to DineNGo
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Experience culinary excellence in every bite
          </p>

     
          <div className="space-x-4">
            <Link href="/reservation">
              <button className="bg-amber-500 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition duration-300">
                Book a Table
              </button>
            </Link>
            <Link href="/menu">
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition duration-300">
                View Menu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
