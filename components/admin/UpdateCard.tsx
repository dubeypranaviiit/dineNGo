// 'use client';
// import Image from 'next/image';
// import { FaLeaf, FaHamburger, FaStar, FaEdit, FaTrash } from 'react-icons/fa';
// import { useState } from 'react';
// interface UpdateCardProps {
//     id:'string'
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   isSpecial?: boolean;
//   diet?: 'veg' | 'non-veg';
//   adminView?: boolean;
//   onEdit?: () => void;
//   onDelete?: () => void;
// }

// const UpdateCard: React.FC<UpdateCardProps> = ({ id, name, description, price, image, category, isSpecial, diet, onEdit, onDelete }) => {
//       const [showFull, setShowFull] = useState(false);
//       const shortDescription = description.length > 100 ? description.slice(0, 40) + "..." : description;
    
//   return (
//     <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
//       <div className="relative h-48 overflow-hidden">
//         <Image src={image || "/placeholder.jpg"} alt={name} width={250} height={150} className="w-full h-full object-cover" loading="lazy" />
//         {isSpecial && <div className="absolute top-2 right-2 bg-yellow-400 text-white p-2 rounded-full"><FaStar /></div>}
//       </div>
//       <div className="p-4">
//         <div className="flex items-center justify-between">
//           <h3 className="text-xl font-semibold">{name}</h3>
//           <div className={diet === "veg" ? "text-green-500" : "text-red-500"}>{diet === "veg" ? <FaLeaf /> : <FaHamburger />}</div>
//         </div>
//         {/* <p className="text-gray-600">{description}</p> */}
//         <p className="text-gray-600 mb-4">{showFull ? description : shortDescription}</p>
//         {description.length > 100 && (
//           <button
//             onClick={() => setShowFull(!showFull)}
//             className="text-amber-500 font-medium hover:underline"
//           >
//             {showFull ? "Read Less" : "Read More"}
//           </button>
//         )}
//         <div className="flex items-center justify-between mt-2">
//           <span className="text-lg font-bold text-green-600">${price.toFixed(2)}</span>
//           <span className="capitalize text-sm text-gray-500">{category}</span>
//         </div>
       
//           <div className="flex justify-between mt-3">
//             <button onClick={onEdit} className="text-blue-500"><FaEdit /></button>
//             <button onClick={onDelete} className="text-red-500"><FaTrash /></button>
//           </div>
      
//       </div>
//     </div>
//   );
// };

// export default UpdateCard;
'use client';
import Image from 'next/image';
import { FaLeaf, FaHamburger, FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

interface UpdateCardProps {
  _id: string;
  name: string;
  description?: string; // made optional ✅
  price?: number;       // made optional ✅
  image?: string;       // made optional ✅
  category?: string;    // made optional ✅
  isSpecial?: boolean;
  diet?: 'veg' | 'non-veg';
  adminView?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const UpdateCard: React.FC<UpdateCardProps> = ({
  _id,
  name,
  description = 'No description available', // ✅ default
  price = 0,                                // ✅ default
  image = '/placeholder.jpg',               // ✅ default
  category = 'Uncategorized',               // ✅ default
  isSpecial,
  diet,
  onEdit,
  onDelete,
}) => {
  const [showFull, setShowFull] = useState(false);
  const shortDescription =
    description.length > 100 ? description.slice(0, 40) + '...' : description;

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={250}
          height={150}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {isSpecial && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-white p-2 rounded-full">
            <FaStar />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{name}</h3>
          <div className={diet === 'veg' ? 'text-green-500' : 'text-red-500'}>
            {diet === 'veg' ? <FaLeaf /> : <FaHamburger />}
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          {showFull ? description : shortDescription}
        </p>

        {description.length > 100 && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="text-amber-500 font-medium hover:underline"
          >
            {showFull ? 'Read Less' : 'Read More'}
          </button>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-green-600">${price.toFixed(2)}</span>
          <span className="capitalize text-sm text-gray-500">{category}</span>
        </div>

        <div className="flex justify-between mt-3">
          <button onClick={() => onEdit && onEdit(_id)} className="text-blue-500">
            <FaEdit />
          </button>
          <button onClick={() => onDelete && onDelete(_id)} className="text-red-500">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCard;
