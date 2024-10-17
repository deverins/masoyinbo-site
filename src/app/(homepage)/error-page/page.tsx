import React from 'react';
import Link from 'next/link';
import logo from "/public/logo.png";
import Image from 'next/image';

const Custom500 = () => {
  return (
      <div className="flex items-center w-full justify-center text-center">
        <div className="dark:text-neutral-200 p-6 mt-24">
          <div className='flex justify-center'>
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="object-contain rounded-lg size-20 md:size-20 lg:size-24"
              />
            </Link>
          </div>
          {/* Responsive Circle Container */}
          <div className='font-bold text-background-light dark:text-neutral-200 dark:border-neutral-200 
                          border-2 md:border-4 border-background-light rounded-full p-3 inline-block 
                          w-24 h-24 md:w-32 md:h-32'>
            <h1 className="text-3xl md:text-5xl mt-4 md:mt-7">500</h1>
          </div>
          <p className="text-sm md:text-xl mt-4 font-medium">
            <span className='font-bold'>Oops!</span><br />
            Looks like the server failed to load your request.
          </p>
          <Link href="/">
            <p className="mt-6 font-semibold text-lg md:text-xl inline-block px-6 py-2 text-danger-dark hover:text-danger-dark">
              Try again?
            </p>
          </Link>
        </div>
      </div>
    //   <div className="flex items-center w-full justify-center text-center">
    //   <div className="dark:text-neutral-200 p-6 mt-24">
    //     <div className='flex justify-center'>
    //       <Link href="/">
    //         <Image
    //           src={logo}
    //           alt="logo"
    //           width={100}
    //           height={100}
    //           className="object-contain rounded-lg size-20 md:size-20 lg:size-24"
    //         />
    //       </Link>
    //     </div>
    //     {/* Responsive Circle Container */}
    //     <div className='font-bold text-background-light dark:text-neutral-200 dark:border-neutral-200 
    //                     border-2 md:border-4 border-background-light rounded-full p-3 inline-block 
    //                     w-24 h-24 md:w-32 md:h-32'>
    //       <h1 className="text-3xl md:text-5xl mt-4 md:mt-7">404</h1>
    //     </div>
    //     <p className="text-sm md:text-xl mt-4 font-medium">
    //       <span className='font-bold'>Oops!</span><br />
    //       We can't seem to find the page you're looking for.
    //     </p>
    //     <Link href="/">
    //       <p className="mt-6 font-semibold text-lg md:text-xl underline inline-block px-6 py-2 text-primary-light dark:text-neutral-200 dark:hover:text-neutral-300 hover:text-primary-light">
    //         Home
    //       </p>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default Custom500;
