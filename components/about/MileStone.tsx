"use client"
import gallery from "@/public/assets/images/gallery/gallery";
import { motion } from "framer-motion";
// import { Milestone } from "lucide-react";
import Image from "next/image";
const milestones = [
  { year: "2010", title: "Grand Opening", description: "First opened our doors to the public" },
  { year: "2015", title: "Michelin Star", description: "Received our first Michelin star" },
  { year: "2018", title: "Expansion", description: "Opened our exclusive wine cellar" },
  { year: "2022", title: "Innovation", description: "Launched seasonal tasting menus" }
];

const Milestone: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Image
            src={gallery.Rest1}
            alt="Historical Restaurant"
            className="rounded-lg shadow-xl"
            loading="lazy"
          />
          <div>
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2010, DineNGo has been at the forefront of culinary innovation, blending traditional techniques with modern creativity.
            </p>
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <div className="text-xl font-bold text-amber-600">{milestone.year}</div>
                <div>
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Milestone;
