"use client";
import { API_URL } from '@/constants/api';
import { formatCurrency, Stats } from '@/types';
import { PlayIcon, UserGroupIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MdVerifiedUser } from 'react-icons/md';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    // Fetch stats from the API
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/v1/api/get-performance-stats`);
        setStats(data.stats);
      } catch (err) {
        setError('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    // Retrieve user details from local storage
    const storedUser = localStorage.getItem('userDetails');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserDetails(parsedUser);
    }

    fetchStats();
  }, []);

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        {userDetails && (
          <div className="bg-white p-6 dark:bg-[rgba(255,255,255,0.1)] dark:text-neutral-200 dark:backdrop-blur-lg shadow-md transition duration-300 dark:bg-opacity-10 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome, {userDetails.fullName}</h2>
            <p className='pt-8 font-bold text-xl flex md:justify-center lg:justify-center sm:justify-start xl:justify-center'>{userDetails.username}</p>
            <div className='flex items-center'>
                                    <MdVerifiedUser size={30} />
                                    <p className='ml-2'>Email: {userDetails.email}</p>
                                </div>
          </div>
        )}

        {/* Display stats if available */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Users */}
            <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md transition duration-300 pb-2">
              <Link href="/all-users">
                <h5 className="text-base md:text-lg font-semibold flex text-gray-800 dark:text-gray-200">
                  <UserGroupIcon className="size-6 mr-2 text-gray-400 leading-tight dark:text-gray-300" />
                  Total Users
                </h5>
                <p className="text-lg md:text-2xl font-semibold text-gray-500 dark:text-gray-100 mt-4">
                  {stats.totalUsers}
                </p>
              </Link>
            </div>
            {/* Total Participation Users */}
            <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md transition duration-300 pb-2">
              <Link href="/participation-users">
                <h5 className="text-base md:text-lg font-semibold flex text-gray-800 dark:text-gray-200">
                  <UserGroupIcon className="size-6 mr-2 text-gray-400 leading-tight dark:text-gray-300" />
                  Total Participant Users
                </h5>
                <p className="text-lg md:text-2xl font-semibold text-gray-500 dark:text-gray-100 mt-4">
                  {stats.totalParticipants}
                </p>
              </Link>
            </div>

            {/* Total Amount Episode */}
            <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md transition duration-300 pb-2">
              <Link href="/all-episodes">
                <h5 className="text-base md:text-lg font-semibold leading-tight flex text-gray-800 dark:text-gray-200">
                  <PlayIcon className="h-6 w-6 mr-2 text-gray-400 dark:text-gray-300" />
                  Total Episodes
                </h5>
                <p className="text-lg md:text-2xl font-semibold text-gray-500 dark:text-gray-100 mt-4">
                  {stats.totalEpisodes}
                </p>
              </Link>
            </div>

            {/* Awaiting Request */}
            <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md transition duration-300 pb-2">
              <Link href="/request-pool">
                <h5 className="text-base md:text-lg font-semibold flex text-gray-800 dark:text-gray-200">
                  <UserGroupIcon className="size-6 mr-2 text-gray-400 leading-tight dark:text-gray-300" />
                  Awaiting Participation Request
                </h5>
                <p className="text-lg md:text-2xl font-semibold text-gray-500 dark:text-gray-100 mt-4">
                  {stats.totalWaitingPaticipants}
                </p>
              </Link>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
