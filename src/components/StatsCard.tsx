import { API_URL } from '@/constants/api';
import { formatCurrency, Stats } from '@/types';
import { CheckCircleIcon, PlayIcon, QuestionMarkCircleIcon, UserGroupIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchStats();
  }, []);

  if (error) {
    console.error(error);
  }

  return (
    stats && (
      <div className="mt-20 px-4 lg:px-20 md:px-10">
        {/* Top row with 3 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Winable Amount */}
          <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md max-w-full overflow-hidden transition duration-300 pb-2">
            <h5 className="text-base md:text-lg font-semibold leading-tight flex text-gray-800 dark:text-gray-200">
              <div className="size-6 bg-gray-400 dark:bg-gray-600 rounded-full text-center mr-2">
                <span className="text-white">&#x20A6;</span>
              </div>
              Amount Available To Win
            </h5>
            <p className="text-lg md:text-2xl  font-semibold text-gray-500 dark:text-gray-100 mt-4">
              {formatCurrency(stats.totalAmountAvailable)}
            </p>
          </div>
          {/* Total Amount Won */}
          <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md max-w-full overflow-hidden transition duration-300 pb-2">
            <h5 className="text-base md:text-lg font-semibold leading-tight flex text-gray-800 dark:text-gray-200">
              <div className="size-6 bg-gray-400 dark:bg-gray-600 rounded-full text-center mr-2">
                <span className="text-white">&#x20A6;</span>
              </div>
              Total Amount Won
            </h5>
            <p className="text-lg md:text-2xl  font-semibold text-gray-500 dark:text-gray-100 mt-4">
              {formatCurrency(stats.totalAmountWon)}
            </p>
          </div>
          {/* Awaiting Request */}
          <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md max-w-full overflow-hidden transition duration-300 pb-2">
            <Link href="/request-pool">
              <h5 className="text-base md:text-lg font-semibold flex text-gray-800 dark:text-gray-200">
                <UserGroupIcon className="size-6 mr-2 text-gray-400 leading-tight dark:text-gray-300" />
                Awaiting Participation Request
              </h5>
              <p className="text-lg md:text-2xl  font-semibold text-gray-500 dark:text-gray-100 mt-4">
                {stats.totalWaitingPaticipants}
              </p>
            </Link>
          </div>
        </div>

        {/* Bottom row with 4 smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Total Episodes */}
          <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md max-w-full overflow-hidden transition duration-300 pb-2">
            <Link href="all-episodes">
              <h5 className="text-base md:text-lg leading-tight font-normal leading-1 flex text-gray-800 dark:text-gray-200">
                <PlayIcon className="h-6 w-6 mr-2 text-gray-400 dark:text-gray-300" />
                Total Episodes
              </h5>
              <p className="text-lg md:text-xl  font-semibold text-gray-500 dark:text-gray-100 mt-2">
                {stats.totalEpisodes}
              </p>
            </Link>
          </div>

          {/* Total Asked Questions */}
          <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md max-w-full overflow-hidden transition duration-300 pb-2">
            <h5 className="text-base md:text-lg leading-tight font-normal leading-1 flex text-gray-800 dark:text-gray-200">
              <QuestionMarkCircleIcon className="h-6 w-6 mr-2 text-gray-400 dark:text-gray-300" />
              Total Asked Questions
            </h5>
            <p className="text-lg md:text-xl  font-semibold text-gray-500 dark:text-gray-100 mt-2">
              {stats.totalQuestions}
            </p>
          </div>

          {/* Total Correct Answers */}
          <div className="px-2 pt-4 h-auto bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md max-w-full overflow-hidden transition duration-300 pb-2">
            <h5 className="text-base md:text-lg font-normal leading-tight leading-1 flex text-gray-800 dark:text-gray-200">
              <CheckCircleIcon className="h-6 w-6 mr-2 text-gray-400 dark:text-gray-300" />
              Total Correct Answers
            </h5>
            <p className="text-lg md:text-xl  font-semibold text-gray-500 dark:text-gray-100 mt-2">
              {stats.totalCorrectAnwers}
            </p>
          </div>

          {/* Amount Lost to Codemix */}
          <div className="px-2 pt-4 h-auto leading-tight bg-white dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md max-w-full overflow-hidden transition duration-300 pb-2">
            <h5 className="text-base md:text-lg font-normal leading-1 flex text-gray-800 dark:text-gray-200">
              <CheckCircleIcon className="h-6 w-6 mr-2 text-gray-400 dark:text-gray-300" />
              Amount Lost to Codemix
            </h5>
            <p className="text-lg md:text-xl  font-semibold text-gray-500 dark:text-gray-100 mt-2">
              {formatCurrency(stats.codemixData[0]?.totalAmountLost || 0)}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default StatsCard;
