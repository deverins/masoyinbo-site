"use client";
import React from "react";
import arrow from "/public/arrow-up.png";
import logo from "/public/logo.png";
import Image from "next/image";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <footer className="bg-primary-light mt-16 bottom-0">
        <div className="mt-8 font-bold border dark:border-neutral-200 border-gray-500">
        </div>
        <div className="bg-primary-light py-3 flex justify-between items-center lg:px-8 px-4 md:px-2">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="object-contain w-24 sm:w-32 md:w-40 lg:w-52"
            priority
          />
          <p className="text-neutral-200">©2024 másòyìnbó</p>
          <button
            className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center"
            onClick={scrollToTop}
          >
            <Image src={arrow} alt="Up Arrow" className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;