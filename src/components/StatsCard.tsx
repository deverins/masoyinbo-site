import { API_URL } from '@/constants/api';
import { CheckCircleIcon, PlayIcon, QuestionMarkCircleIcon, UserGroupIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Stats {
  totalEpisodes: number;
  totalAmountWon: number;
  totalAskedQuestions: {
    count: number;
    questions: string[];
  };
  totalRightQuestions: {
    count: number;
    correctAnswers: string[];
  };
  requestPool: {
    total: number;
    participants: {
      fullName: string;
      email: string;
      mobileNumber: string;
    }[];
  };
}

const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/v1/api/get-episode-stats?limit=4`);
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
      <div className='mt-20 mx-0 lg:mx-20 md:mx-10'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {/* Total Episodes */}
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md py-6">
            <Link href='all-episodes'>
              <h3 className="text-lg font-semibold flex justify-center items-center">
                Total Episodes
                <PlayIcon className="h-6 w-6 text-blue-500 " />
              </h3>
              <p className="text-2xl font-bold text-blue-500">{stats.totalEpisodes}</p>
            </Link>
          </div>

          {/* Total Amount Won */}
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md py-6">
            <h3 className="text-lg font-semibold flex justify-center items-center">
              Total Amount Won
              <div className="h-6 w-6 bg-green-500 rounded-full " > <span className='text-white'>&#x20A6;</span></div>
            </h3>
            <p className="text-2xl font-bold text-green-500">₦{stats.totalAmountWon.toLocaleString()}</p>
          </div>

          {/* Total Asked Questions */}
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md py-6">
            <h3 className="text-lg font-semibold flex justify-center items-center">
              Total Asked Questions
              <QuestionMarkCircleIcon className="h-6 w-6 text-secondary-saffronLight" />
            </h3>
            <p className="text-2xl font-bold text-secondary-saffronLight">{stats.totalAskedQuestions.count}</p>
          </div>

          {/* Total Right Questions */}
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md py-6">
            <h3 className="text-lg font-semibold flex justify-center items-center">
              Total Correct Answer
              <CheckCircleIcon className="h-6 w-6 text-teal-500 " />
            </h3>
            <p className="text-2xl font-bold text-teal-500">{stats.totalRightQuestions.count}</p>
          </div>
        </div>

        {/*larger screens centered card*/}
        <div className="flex justify-center">
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md w-96 py-6">
            <Link href='/request-pool'>
              <h3 className="text-lg font-semibold flex justify-center items-center">
                Participant Request
                <UserGroupIcon className="h-6 w-6 text-orange-500 " />
              </h3>
              <p className="text-2xl font-bold text-orange-500">{stats.requestPool.total.toLocaleString()}</p>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default StatsCard;