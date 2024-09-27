"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./UI/ThemeToggle";
import logo from "/public/logo.png";
import { FiEdit, FiTrash2, FiLogOut, FiPlusCircle, FiEdit3, FiMenu } from "react-icons/fi";
import { useRouter } from "next/navigation";

const AdminNav = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Function to check admin status
  const checkAdminStatus = () => {
    const userRole = localStorage.getItem("userRole");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true" && userRole === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      checkAdminStatus();

      const handleStorageChange = () => {
        checkAdminStatus();
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [isClient]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsAdmin(false);
    router.push("/admin/login");
  };

  if (!isClient) {
    return null;
  }

  return (
    <nav className="bg-primary-light text-white sticky w-full top-0 z-10 p-3">
      <div className="flex justify-between items-center mx-4 sm:mx-8">
        <div className="flex items-center">
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

        <div className="flex items-center gap-4 sm:gap-8">
          <ThemeToggle />

          {/* Conditional rendering based on admin status */}
          {isAdmin && (
            <div className="relative group">
              <button className=" text-neutral-200 text-sm sm:text-base font-bold rounded-lg p-2 sm:p-3 hover:bg-[#1c204a] dark:hover:bg-primary-lightBlack ">
                <FiMenu className="mr-2 text" size={24} />
              </button>
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 dark:bg-primary-lightBlack dark:backdrop-blur-lg dark:bg-opacity-10 dark:text-neutral-200">
                <ul className="py-2">
                  <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-lightBlack">
                    <FiPlusCircle className="mr-2" />
                    <Link href="/create-episode">Create Episode</Link>
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-lightBlack">
                    <FiEdit3 className="mr-2" />
                    <Link href="/add-episode-event">Create Episode Event</Link>
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-lightBlack">
                    <FiEdit className="mr-2" />
                    <Link href="/edit-episode-event">Edit Episode Event</Link>
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-lightBlack">
                    <FiTrash2 className="mr-2" />
                    <Link href="/delete-episode-event">Delete Episode Event</Link>
                  </li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-lightBlack">
                    <FiLogOut className="mr-2" />
                    <button onClick={handleLogout}>Log Out</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
