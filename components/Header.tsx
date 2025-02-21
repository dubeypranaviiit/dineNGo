"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/image.png" // Update this with your logo path
            alt="DineNGo Logo"
            width={150}
            height={50}
            className="cursor-pointer w-[50px]  rounded-full"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-amber-500">Home</Link>
          <Link href="/menu" className="text-gray-700 hover:text-amber-500">Menu</Link>
          <Link href="/about" className="text-gray-700 hover:text-amber-500">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-amber-500">Contact</Link>
          <Link href="/reservation">
            <button className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition">
              Book a Table
            </button>
          </Link>
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
            <Link href="/about" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-500" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/reservation">
              <button className="bg-amber-500 text-white px-6 py-2 rounded-full w-full hover:bg-amber-600 transition">
                Book a Table
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
