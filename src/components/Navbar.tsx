"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ThemeToggle from './UI/ThemeToggle';
import logo from '/public/logo.png';
import { useAuth } from '@/hooks/AuthContext';
import Dialogbox from './DialogBox';
import { GlobeAltIcon } from '@heroicons/react/16/solid';

const Navbar = () => {
  const { isLoggedIn, userRole } = useAuth();

  const [selectedLanguage, setSelectedLanguage] = useState('En');

  // Function to handle language selection
  const setLanguageValue = (event: React.MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.dataset.value as string;
    setSelectedLanguage(value);
  };

  if (isLoggedIn && userRole === 'admin') {
    return null;
  }

  return (
    <nav className="bg-primary-light text-white sticky w-full top-0 z-10 p-3">
      <div className='flex justify-between items-center mx-4 sm:mx-8'>
        <div className='flex items-center'>
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={200}
              className="object-contain w-24 sm:w-32 md:w-40 lg:w-52"
              priority
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

          {/* Language selection with flag icon */}
          <div id='selection' className='relative cursor-pointer flex items-center gap-2'>
            <div className='flex items-center gap-2'>

              <GlobeAltIcon className="w-5 h-5" />
              <span className="text-sm sm:text-base">
                {selectedLanguage}
              </span>
            </div>
            <Dialogbox
              triggerDomId="selection"
              positions={{ ySide: 'bottom' }}
              closeOnClick
              className="absolute right-0 mt-2 w-auto md:w-48 bg-slate-100 text-black rounded-lg shadow-lg dark:bg-primary-lightBlack dark:bg-opacity-4 dark:bg-slate-900 dark:text-neutral-200 -mx-4 sm:-mx-8 -px-3 p-4"
            >
              <ul className="dark:text-neutral-200">
                <li
                  onClick={setLanguageValue}
                  data-value="En"
                  data-flag="/flags/eng.png"
                  className="p-2 dark:hover:bg-slate-700 hover:bg-gray-200 cursor-pointer rounded-lg flex items-center gap-2"
                >
                  <Image src="/flags/eng.png" alt="Eng flag" width={20} height={20} quality={100} />
                  English
                </li>
                <li
                  onClick={setLanguageValue}
                  data-value="Yoruba"
                  data-flag="/flags/yoruba.png"
                  className="p-2 dark:hover:bg-slate-700 hover:bg-gray-200 cursor-pointer rounded-lg flex items-center gap-2"
                >
                  <Image src="/flags/yoruba.png" alt="Yoruba flag" width={24} height={24} quality={100} />
                  Yoruba
                </li>
              </ul>
            </Dialogbox>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
