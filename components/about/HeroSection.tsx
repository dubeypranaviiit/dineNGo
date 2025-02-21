"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import gallery from "@/public/assets/images/gallery/gallery";
const HeroSection = () => {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <Image
        src={gallery.Rest2}
        alt="Restaurant Interior"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
            className="text-5xl md:text-7xl font-bold text-white mb-4"
          >
          DineNGo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white"
          >
            Where Culinary Dreams Come True
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
