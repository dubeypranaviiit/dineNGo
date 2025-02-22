import { motion } from "framer-motion";
 import Image from "next/image";
interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ name, role, bio, image }) => {
  return (
   
         <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-lg shadow-lg "
   
    >
      <Image src={image} alt={name} width={300} height={300} className="w-full h-64 object-cover transition-transform group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity flex items-end p-6">
        <div className="text-white">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-gray-300">{role?role:"No role found"}</p>
          <p className="mt-2 text-sm">{bio}</p>
        </div>
      </div>
    </motion.div>

   
  );
};

export default TeamMemberCard;
