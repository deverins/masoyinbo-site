import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/api';
import { formatCurrency } from '@/utils/functions';
import Link from 'next/link';
import Loading from '../UI/Loading';

const ParticipantResult = () => {
  const [stats, setStats] = useState<any | null>(null);  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch stats from the API
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/get-performance-stats`);
        setStats(data.stats);
      } catch (err) {
        setError('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div><Loading /></div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="mt-16">
      {/* Desktop View */}
      <div className="hidden mobile:block mt-16">
         <h3 className='dark:text-neutral-200 text-md md:text-lg font-bold justify-center flex mb-5'>Participation Results</h3>
        <div className="flex justify-center w-full">
          <div className="rounded-lg flex flex-col justify-between">
            {/* Header Row */}
            <div className="grid grid-cols-3 gap-10 bg-gray-300 p-2 font-bold dark:bg-[rgba(255,255,255,0.1)] dark:bg-opacity-10 rounded-lg shadow-md max-w-full transition duration-300 dark:text-neutral-200">
              <div className="col-span-1 w-[100px] text-center">Participant Name</div>
              <div className="col-span-1 w-[150px] text-center">Episode</div>
              <div className="col-span-1 w-[150px] text-center">Amount Won</div>
            </div>

            {/* Data Rows */}
            {stats?.amountWonStats
              .sort((a:any, b:any) => b.amountWon - a.amountWon) 
              .map((item:any, index:any) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-14 py-4 mb-2 dark:text-neutral-300 rounded-lg shadow-md border-b border-gray-300"
                >
                  <div className="col-span-1 w-[100px] text-center">{item.count}</div>
                  <div className="col-span-1 w-[150px] text-center">
                    ₦{item.amountWon.toLocaleString()}
                  </div>
                  <div className="col-span-1 w-[150px] text-center">
                    <Link href={`/episodes/${item.episodeId}`} className="dark:text-neutral-300 underline">
                      Episode {item.episodeId}
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Mobile and Tablet View */}
      <div className="block mobile:hidden mt-16">
          <h3 className='dark:text-neutral-200 text-md md:text-lg font-bold justify-center flex'>Participation Results</h3>
        <div className="flex justify-center">
          <div className="p-4 rounded-lg justify-center">
            {stats?.amountWonStats
              .sort((a:any, b:any) => b.amountWon - a.amountWon) 
              .map((item:any, index:any) => (
                <div
                  key={index}
                  className="flex flex-col p-4 rounded-lg shadow-md border-b border-gray-300 transition-all duration-500"
                >
                  {/* Small screen columns */}
                  <div className="grid gap-4">
                    <div>
                      <h2 className="font-bold text-lg dark:text-neutral-200">Count</h2>
                      <p className="dark:text-neutral-300">{item.count}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg dark:text-neutral-200">Amount Won</h2>
                      <span className="dark:text-neutral-300">₦{item.amountWon.toLocaleString()}</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg dark:text-neutral-200">Episode Link</h2>
                      <Link href={`/episodes/${item.episodeId}`}>
                        <p className="dark:text-neutral-300 underline">Episode {item.episodeId}</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipantResult;
