"use client"
import { FaAward, FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
 import Image from "next/image";
//  import { chefs } from "@/public/data/data";
import chefs from "@/public/assets/images/chefs/chefs";

const ChefIntro = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Image
            src={chefs.chef1}
            alt="Head Chef"
            className="w-48 h-48 rounded-full mx-auto object-cover"
            loading="lazy"
          />
          <h2 className="text-3xl font-bold my-6">Alex </h2>
          <FaQuoteLeft className="text-4xl text-amber-600 mx-auto mb-4" />
          <p className="text-xl italic text-gray-700">
            "Cooking is not just about ingredients; it's about bringing people together and creating memories."
          </p>
          <div className="flex justify-center gap-4 my-6">
            {[...Array(3)].map((_, index) => (
              <FaAward key={index} className="text-amber-600 text-2xl" />
            ))}
          </div>
          <p className="text-gray-700">
            With over 15 years of experience in prestigious kitchens worldwide, Chef Alex brings his passion for innovative cuisine to every dish at DineNGo.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChefIntro;
