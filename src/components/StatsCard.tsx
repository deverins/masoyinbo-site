import { API_URL } from '@/constants/api';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Stats {
  totalEpisodes: number;
  totalAmountWon: number;
  totalAskedQuestions: number;
  totalRightQuestions: number;
  requestPool: number;
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
    return <div>{error}</div>;
  }

  return (
    stats && (
      <div className='mt-20 mx-0 lg:mx-20 md:mx-10'>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
            <div className="p-4 bg-secondary-cream rounded-lg shadow-md">
          <Link href= 'all-episodes'>
              <h3 className="text-lg font-semibold">Total Episodes</h3>
              <p className="text-2xl">{stats.totalEpisodes}</p>
          </Link>
            </div>
          <div className="p-4 bg-secondary-cream rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Amount Won</h3>
            <p className="text-2xl">₦{stats.totalAmountWon.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-secondary-cream rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Asked Questions</h3>
            <p className="text-2xl">{stats.totalAskedQuestions}</p>
          </div>
          <div className="p-4 bg-secondary-cream rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total Right Questions</h3>
            <p className="text-2xl">{stats.totalRightQuestions}</p>
          </div>
          <div className="p-4 bg-secondary-cream rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Request Pool</h3>
            <p className="text-2xl">{stats.requestPool.toLocaleString()}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default StatsCard;
