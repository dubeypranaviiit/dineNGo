// // "use client";

// // import React, { useState } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { FaBars, FaTimes } from "react-icons/fa";
// // import CartIndicator from "./order/CartIndicator";
// // const Header: React.FC = () => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50 lg:h-[8%]">
// //       <div className="container mx-auto flex justify-between items-center py-4 px-6">
// //         {/* Logo */}
// //         <Link href="/">
// //           <Image
// //             src="/image.png" // Update this with your logo path
// //             alt="DineNGo Logo"
// //             width={120}
// //             height={30}
// //             className="cursor-pointer w-[50px]  rounded-full"
// //           />
// //         </Link>

// //         {/* Desktop Menu */}  
// //         <nav className="hidden md:flex space-x-8">
// //           <Link href="/" className="text-gray-700 text-2xl hover:text-amber-500">Home</Link>
// //           <Link href="/menu" className="text-gray-700 text-2xl hover:text-amber-500">Menu</Link>
// //              <Link href="/order-menu" className="text-gray-700 text-2xl hover:text-amber-500">Order</Link>
// //           <Link href="/about" className="text-gray-700 text-2xl hover:text-amber-500">About</Link>
// //           <Link href="/contact" className="text-gray-700 text-2xl hover:text-amber-500">Contact</Link>
// //           <Link href="/reservation" className="flex items-center">
// //             <button className="bg-amber-500 text-white px-6 py-2 mt-0 rounded-full hover:bg-amber-600 transition">
// //               Book a Table
// //             </button>
// //           </Link>
// //           <Link href="/cart" onClick={() => setIsOpen(false)}>
// //               <div className="mt-2">
// //                 <CartIndicator />
// //               </div>
// //             </Link>
// //         </nav>

// //         {/* Mobile Menu Button */}
// //         <button className="md:hidden text-gray-700  " onClick={() => setIsOpen(!isOpen)}>
// //           {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
// //         </button>
// //       </div>

// //       {/* Mobile Menu Dropdown */}
// //       {isOpen && (
// //         <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4">
// //           <nav className="flex flex-col space-y-4 px-6">
// //             <Link href="/" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Home</Link>
// //             <Link href="/menu" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Menu</Link>
// //             <Link href="/about" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>About</Link>
// //             <Link href="/contact" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Contact</Link>
// //             <Link href="/reservation">
// //               <button className="bg-amber-500 text-white px-6 py-2 rounded-full w-full hover:bg-amber-600 transition">
// //                 Book a Table
// //               </button>
// //             </Link>
// //              <Link href="/cart">
// //             <div className="ml-4">
// //               <CartIndicator />
// //             </div>
// //           </Link>
// //           </nav>
// //         </div>
// //       )}
// //     </header>
// //   );
// // };

// // export default Header;
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { FaBars, FaTimes } from "react-icons/fa";
// import CartIndicator from "./order/CartIndicator";
// import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { isSignedIn } = useUser();

//   return (
//     <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50 lg:h-[8%]">
//       <div className="container mx-auto flex justify-between items-center py-4 px-6">
//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src="/image.png"
//             alt="DineNGo Logo"
//             width={120}
//             height={30}
//             className="cursor-pointer w-[50px] rounded-full"
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden md:flex space-x-6 items-center">
//           <Link href="/" className="text-gray-700 text-2xl hover:text-amber-500">Home</Link>
//           <Link href="/menu" className="text-gray-700 text-2xl hover:text-amber-500">Menu</Link>
//           <Link href="/order-menu" className="text-gray-700 text-2xl hover:text-amber-500">Order</Link>
//           <Link href="/about" className="text-gray-700 text-2xl hover:text-amber-500">About</Link>
//           <Link href="/contact" className="text-gray-700 text-2xl hover:text-amber-500">Contact</Link>
//           <Link href="/reservation" className="flex items-center">
//             <button className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition">
//               Book a Table
//             </button>
//           </Link>

//           {/* Conditional Cart / SignUp */}
//           {isSignedIn ? (
//             <Link href="/cart">
//               <div className="mt-2">
//                 <CartIndicator />
//               </div>
//             </Link>
//           ) : (
//             <div className="flex gap-2">
//               <SignUpButton>
//                 <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//               <SignInButton>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
//                   Sign In
//                 </button>
//               </SignInButton>
//             </div>
//           )}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4">
//           <nav className="flex flex-col space-y-4 px-6">
//             <Link href="/" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Home</Link>
//             <Link href="/menu" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Menu</Link>
//             <Link href="/about" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>About</Link>
//             <Link href="/contact" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Contact</Link>
//             <Link href="/reservation">
//               <button className="bg-amber-500 text-white px-6 py-2 rounded-full w-full hover:bg-amber-600 transition">
//                 Book a Table
//               </button>
//             </Link>

//             {/* Conditional Cart / SignUp Mobile */}
//             {isSignedIn ? (
//               <Link href="/cart" onClick={() => setIsOpen(false)}>
//                 <div className="ml-4">
//                   <CartIndicator />
//                 </div>
//               </Link>
//             ) : (
//               <div className="flex flex-col gap-2 mt-2">
//                 <SignUpButton>
//                   <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition w-full">
//                     Sign Up
//                   </button>
//                 </SignUpButton>
//                 <SignInButton>
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition w-full">
//                     Sign In
//                   </button>
//                 </SignInButton>
//               </div>
//             )}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import CartIndicator from "./order/CartIndicator";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropdownOpen] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50 lg:h-[8%]">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/image.png"
            alt="DineNGo Logo"
            width={120}
            height={30}
            className="cursor-pointer w-[50px] rounded-full"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-gray-700 text-2xl hover:text-amber-500">Home</Link>
          <Link href="/menu" className="text-gray-700 text-2xl hover:text-amber-500">Menu</Link>

          {/* Order Dropdown */}
          <div
  className="relative"
  onMouseEnter={() => setOrderDropdownOpen(true)}
  onMouseLeave={() => setOrderDropdownOpen(false)}
>
  <button className="flex items-center text-gray-700 text-2xl hover:text-amber-500">
    Order <FaChevronDown className="ml-1" />
  </button>
  {orderDropdownOpen && (
    <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md w-48 flex flex-col">
      <Link
        href="/order-menu"
        className="px-4 py-2 hover:bg-amber-100"
      >
        Place Order
      </Link>
      <Link
        href="/order"
        className="px-4 py-2 hover:bg-amber-100"
      >
        My Orders
      </Link>
    </div>
  )}
</div>
       

          <Link href="/about" className="text-gray-700 text-2xl hover:text-amber-500">About</Link>
          <Link href="/contact" className="text-gray-700 text-2xl hover:text-amber-500">Contact</Link>
          <Link href="/reservation" className="flex items-center">
            <button className="bg-amber-500 text-white px-6 mb-2 py-1 rounded-full hover:bg-amber-600 transition">
              Book a Table
            </button>
          </Link>

          {/* Conditional Cart / SignUp */}
          {isSignedIn ? (
            <Link href="/cart">
              <div className="mt-2">
                <CartIndicator />
              </div>
            </Link>
          ) : (
            <div className="flex gap-2">
              <SignUpButton>
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                  Sign Up
                </button>
              </SignUpButton>
              <SignInButton>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4">
          <nav className="flex flex-col space-y-4 px-6">
            <Link href="/" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/menu" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Menu</Link>

            {/* Mobile Order Dropdown */}
            <div className="flex flex-col">
              <button
                onClick={() => setOrderDropdownOpen(!orderDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-amber-500"
              >
                Order <FaChevronDown className="ml-1" />
              </button>
              {orderDropdownOpen && (
                <div className="flex flex-col pl-4 mt-1">
                  <Link href="/order-menu" className="px-4 py-2 hover:bg-amber-100" onClick={() => setIsOpen(false)}>Place Order</Link>
                  <Link href="/order" className="px-4 py-2 hover:bg-amber-100" onClick={() => setIsOpen(false)}>My Orders</Link>
                </div>
              )}
            </div>

            <Link href="/about" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/reservation">
              <button className="bg-amber-500 text-white px-6 py-2 rounded-full w-full hover:bg-amber-600 transition">
                Book a Table
              </button>
            </Link>

            {isSignedIn ? (
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <div className="ml-4">
                  <CartIndicator />
                </div>
              </Link>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <SignUpButton>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition w-full">
                    Sign Up
                  </button>
                </SignUpButton>
                <SignInButton>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition w-full">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
