"use client"
import TeamMemberCard from "./TeamMemberCard";
// import { chefs } from "@/public/data/data";
const teamMembers = [
  { name: "Chef Michael Anderson", role: "Executive Chef", bio: "15 years of excellence", image: "/chefs-2.jpg" },
  { name: "Sarah Williams", role: "Sous Chef", bio: "Specializes in French cuisine", image: "/chefs-3.jpg"},
  { name: "Lucky", role: "Cook", bio: "Specializes in French cuisine", image: "/chefs-2.jpg"}
];

const TeamSection = () => (
  <section className="container mx-auto px-4 py-16">
    <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
      {
      teamMembers.map((member, index) => <TeamMemberCard key={index} {...member} />)}
    </div>
  </section>
);

export default TeamSection;
