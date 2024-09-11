import { API_URL } from '@/constants/api';
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
    console.error(error)
  }

  return (
    stats && (
      <div className='mt-20 mx-0 lg:mx-20 md:mx-10'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md">
            <Link href='all-episodes'>
              <h3 className="text-lg font-semibold">Total Episodes</h3>
              <p className="text-2xl font-bold text-blue-500">{stats.totalEpisodes}</p>
            </Link>
          </div>
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md">
            <h3 className="text-lg font-semibold">Total Amount Won</h3>
            <p className=" text-2xl font-bold text-green-500">₦{stats.totalAmountWon.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md">
            <h3 className="text-lg font-semibold">Total Asked Questions</h3>
            <p className=" text-2xl font-bold text-secondary-saffronLight">{stats.totalAskedQuestions.count}</p>
          </div>
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md">
            <h3 className="text-lg font-semibold">Total Right Questions</h3>
            <p className=" text-2xl font-bold text-teal-500">{stats.totalRightQuestions.count}</p>
          </div>
          <div className="p-4 bg-secondary-cream rounded-lg text-center shadow-md">
            <Link href = '/request-pool'>
              <h3 className="text-lg font-semibold">Request Pool</h3>
              <p className="text-2xl font-bold text-orange-500">{stats.requestPool.total.toLocaleString()}</p>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default StatsCard;