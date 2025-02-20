// components/Navbar.tsx
"use client"; // This makes sure it's a client component

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for the menu

const Navbar = () => {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Task Manager
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/tasks" className="hover:text-gray-300">Tasks</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 bg-blue-700 p-4 rounded-lg">
          <Link href="/" className="block hover:text-gray-300">Home</Link>
          <Link href="/tasks" className="hover:text-gray-300">Tasks</Link>
          <Link href="/about" className="block hover:text-gray-300">About</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
