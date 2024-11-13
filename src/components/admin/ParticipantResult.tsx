import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/api';
import Link from 'next/link';
import Loading from '../UI/Loading';
import Modal from '../Modal';
import EachParticipant from './EachParticipant';

const ParticipantResult = () => {
  const [participantResultData, setParticipantResultData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
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

  const handleParticipantClick = async (item: any) => {
    try {
      const participantId = item.participantId;
      const { data } = await axios.get(`${API_URL}/api/get-participant/${participantId}`);
      setSelectedParticipant(data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching participant details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParticipant(null);
  };

  if (loading) return <div className='h-screen flex justify-center'><Loading /></div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="mt-16">
      <h3 className="dark:text-neutral-200 text-md md:text-lg font-bold justify-center flex mb-5">
        Participation Results
      </h3>

      {/* Desktop View */}
      <div className="hidden mobile:block mt-16">
        <div className="flex justify-center w-full">
          <div className="rounded-lg flex flex-col justify-between max-w-4xl w-full mx-auto">
            <div className="grid grid-cols-3 gap-10 bg-gray-300 p-2 font-bold dark:bg-[rgba(255,255,255,0.1)] dark:bg-opacity-10 rounded-lg shadow-md transition duration-300 dark:text-neutral-200">
              <div className="text-center">Participant Name</div>
              <div className="text-center">Episode</div>
              <div className="text-center">Amount Won</div>
            </div>
            {participantResultData
              .sort((a, b) => b.amountWon - a.amountWon)
              .map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-3 gap-14 py-4 mb-2 dark:text-neutral-300 rounded-lg shadow-md border-b border-gray-300"
                >
                  <div onClick={() => handleParticipantClick(item)} className="cursor-pointer text-center">
                    {item.participantFullName}
                  </div>
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
                      <div onClick={() => handleParticipantClick(item)} className="cursor-pointer dark:text-neutral-300">
                        {item.participantFullName}
                      </div>
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

      {/* Modal to Show Participant Details */}
      {isModalOpen && selectedParticipant && (
        <Modal
          trigger={isModalOpen}
          close={closeModal}
          side="right"
          backgroundColorClass="bg-slate-200 dark:bg-slate-900 rounded"
        >
          <div className="p-4 w-[80vw] max-w-[400px]">
            <EachParticipant participant={selectedParticipant} />
          </div>
        </Modal>
      )}
    </section>
  );
};

export default ParticipantResult;
