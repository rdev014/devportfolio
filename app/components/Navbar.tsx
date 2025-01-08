'use client'; // Mark as Client Component

import React, { useState } from 'react';
import Link from 'next/link';
import SocialIcons from './SocialIcons';
import MobileMenu from './MobileMenu';
import { Bebas_Neue } from 'next/font/google';
// Load the Bebas Neue font
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const Navbar = () => {
;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Name */}
        <Link
          href="/"
          className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-500 uppercase tracking-wider neon-glow ${bebasNeue.className}`}
        >
          Rahul Dev
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Social Icons (Desktop) */}
        <div className="hidden md:flex">
          <SocialIcons />
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen} />
      </div>
    </nav>
  );
};

export default Navbar;