import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/api';
import Link from 'next/link';
import Loading from '../UI/Loading';

const ParticipantResult = () => {
  const [participantResultData, setParticipantResultData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch stats from the API
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/get-participants-result`);
        setParticipantResultData(data.participantResultData);
      } catch (err) {
        setError('Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <section className="mt-16">
      {/* Desktop View */}
      <div className="hidden mobile:block mt-16">
        <h3 className='dark:text-neutral-200 text-md md:text-lg font-bold justify-center flex mb-5'>Participation Results</h3>
        <div className="flex justify-center w-full">
          <div className="rounded-lg flex flex-col justify-between max-w-4xl w-full mx-auto"> {/* Set max width and center */}
            {/* Header Row */}
            <div className="grid grid-cols-3 gap-10 bg-gray-300 p-2 font-bold dark:bg-[rgba(255,255,255,0.1)] dark:bg-opacity-10 rounded-lg shadow-md transition duration-300 dark:text-neutral-200">
              <div className="text-center">Participant Name</div>
              <div className="text-center">Episode</div>
              <div className="text-center">Amount Won</div>
            </div>

            {/* Data Rows */}
            {participantResultData
              .sort((a, b) => b.amountWon - a.amountWon)
              .map((item, index) => (
                <div
                  key={item._id}
                  className="grid grid-cols-3 gap-14 py-4 mb-2 dark:text-neutral-300 rounded-lg shadow-md border-b border-gray-300"
                >
                  <div className="text-center">{item.participantFullName}</div>
                  <div className="text-center">
                    <Link href={`/episodes/${item._id}`} className="dark:text-neutral-300 underline">
                      Episode {item.episodeNumber}
                    </Link>
                  </div>
                  <div className="text-center">₦{item.amountWon.toLocaleString()}</div>
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
            {participantResultData
              .sort((a, b) => b.amountWon - a.amountWon)
              .map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col p-4 rounded-lg shadow-md border-b border-gray-300 transition-all duration-500"
                >
                  <div className="grid gap-4">
                    <div>
                      <h2 className="font-bold text-lg dark:text-neutral-200">Participant Name</h2>
                      <p className="dark:text-neutral-300">{item.participantFullName}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg dark:text-neutral-200">Episode</h2>
                      <Link href={`/episodes/${item._id}`}>
                        <p className="dark:text-neutral-300 hover:underline">Episode {item.episodeNumber}</p>
                      </Link>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg dark:text-neutral-200">Amount Won</h2>
                      <span className="dark:text-neutral-300">₦{item.amountWon.toLocaleString()}</span>
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
