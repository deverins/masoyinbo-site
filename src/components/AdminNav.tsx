"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./UI/ThemeToggle";
import logo from "/public/logo.png";
import { FiEdit, FiTrash2, FiLogOut, FiPlusCircle, FiEdit3, FiMenu } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";
import { GrUserAdmin } from "react-icons/gr";

const AdminNav = () => {
  const { isLoggedIn, userRole, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(userRole === "admin");
  const [episodeId, setEpisodeId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleLoginStatusChange = () => {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const storedUserRole = localStorage.getItem("userRole");

      setIsAdmin(storedUserRole === "admin" && storedIsLoggedIn);
    };

    const storedEpisodeId = localStorage.getItem("episodeIdToSelect");
    setEpisodeId(storedEpisodeId);

    window.addEventListener("loginStatusChanged", handleLoginStatusChange);

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (!isLoggedIn || userRole !== "admin") {
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

          {isAdmin && (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="text-neutral-200 text-sm sm:text-base font-bold rounded-lg p-2 sm:p-3 hover:bg-[#1c204a] dark:hover:bg-primary-darkBlack"
              >
                <FiMenu size={24} />
              </button>

              {/* Dropdown menu, only shown when isMenuOpen is true */}
              {isMenuOpen && (
                <div className="absolute transform -translate-x-1/2 mt-2 w-[184px] bg-white text-black rounded-lg shadow-lg dark:bg-primary-lightBlack dark:backdrop-blur-lg dark:bg-opacity-5 dark:text-neutral-200">
                  <ul className="py-2">
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-light">
                      <GrUserAdmin className="mr-2" />
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-light">
                      <FiPlusCircle className="mr-2" />
                      <Link href="/create-episode">Create Episode</Link>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-light">
                      <FiEdit className="mr-2" />
                      <Link href={`/episode/${episodeId}`}>Edit Episode Event</Link>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-light">
                      <FiTrash2 className="mr-2" />
                      <Link href={`/episode/${episodeId}`}>Delete Episode Event</Link>
                    </li>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-primary-light">
                      <FiLogOut className="mr-2" />
                      <button onClick={handleLogout}>Log Out</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;