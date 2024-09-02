"use client"
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import ThemeToggle from './UI/ThemeToggle';
import logo from '/public/logo.png';

const Navbar = () => {

  return (
    <nav
      className=" bg-primary-light text-white sticky w-full top-0 z-10 p-3"
    >
      <div className='flex justify-between items-center mx-4 sm:mx-8'>
        <div className='flex items-center'>
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={200}
              className="object-contain w-24 sm:w-32 md:w-40 lg:w-52"
            />
          </Link>
        </div>
        <div className='flex items-center gap-4 sm:gap-8'>
          <Link href='/participate'>
            <button className='bg-secondary-cream text-black text-sm sm:text-base font-bold rounded-lg p-2 sm:p-3 hover:bg-secondary-saffron'>
              Participate
            </button>
          </Link>
          <ThemeToggle />
          <select className="cursor-pointer bg-transparent border-none outline-none text-sm sm:text-base">
            <option value="default" className=' text-text-light'>En</option>
            <option value="default" className=' text-text-light'>Yoruba</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
