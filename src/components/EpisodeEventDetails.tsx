import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/api';
import VideoPreview from './VideoPreview';
import {
  Episode,
  EpisodeEvent,
  EpisodeEventsApiResponse,
  formatCurrency,
  formatDate,
  formatType,
} from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

const EpisodeEventDetails: React.FC = () => {
  const [events, setEvents] = useState<EpisodeEvent[]>([]);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noEventsError, setNoEventsError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [isLogin, setIsLogin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLogin(true);
      setUserRole(user.role);
    }
  }, []);


  useEffect(() => {
    const episodeId = localStorage.getItem('episodeIdToSelect');
    if (!episodeId) {
      setLoading(false);
      setError('Episode ID not found.');
      return;
    }

    const fetchEvents = async () => {
      try {
        const endpoint = `${API_URL}/v1/api/episode-events-by-episodeId?id=${episodeId}`;
        const response = await axios.get<EpisodeEventsApiResponse>(endpoint);
        const { data, status } = response;

        if (status === 200) {
          setEvents(data.events);
          setEpisode(data.episode);

          if (data.events.length && userRole === 'admin') {
            setNoEventsError('No added episode events.');
          } else {
            setNoEventsError(null);
          }
        }
      } catch (error: any) {
        console.error('Error fetching events:', error);

        // Handle 404 error
        if (error.response?.status === 404) {
          setError('Episode event not found.');
        } else {
          setError('Failed to fetch events.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userRole]);

  // Group events by participant
  const groupedEvents = events.reduce(
    (acc: { [key: string]: EpisodeEvent[] }, event) => {
      const participantName = event.participantFullName || 'Unknown Participant';
      if (!acc[participantName]) {
        acc[participantName] = [];
      }
      acc[participantName].push(event);
      return acc;
    },
    {}
  );

  const episodeLink = episode?.episodeLink;
  const totalAmountAvailable = episode ? episode.availableAmountToWin : 0;
  const amountWon = episode ? episode.amountWon : 0;

  return (
    <div className="mx-4 mt-6">
      {/* Desktop/Tablet View */}
      <div className="hidden 870px:block">
        <div ref={containerRef} className="rounded-lg p-2 mt-6 max-w-6xl mx-auto">
          {loading ? (
            <div className="loader mt-20 mx-auto ease-linear rounded-full border-4 border-t-4 border-gray-200 border-t-secondary h-12 w-12 animate-spin" />
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : Object.keys(groupedEvents).length ? (
            Object.entries(groupedEvents).map(([participantFullName, events]) => (
              <div key={participantFullName} className="mb-4 w-full">

                <div className="flex flex-col items-center">
                  {episodeLink && (
                    <VideoPreview
                      videoLink={episodeLink}
                      title={`Episode ${episode?.episodeNumber}`}
                      episodeId={episode?._id}
                    />
                  )}
                  <div className="mt-4 w-full max-w-[560px] mb-10">
                    <div className="dark:text-neutral-300 font-semibold">Episode number: {episode?.episodeNumber}</div>
                    <div className="dark:text-neutral-300 font-semibold">Participant Name: {participantFullName}</div>
                    <div className="dark:text-neutral-300 font-semibold">Total Amount Available: {formatCurrency(totalAmountAvailable)}</div>
                    <div className="text-md dark:text-neutral-300 font-semibold">
                      Amount won: {formatCurrency(amountWon)}
                    </div>
                    <div className="dark:text-neutral-300 font-semibold">Episode Date: {formatDate(episode?.episodeDate ?? '')}</div>
                  </div>
                  <div className=' text-center dark:text-neutral-200 mb-4'>
                    <h2>Episode event</h2>
                  </div>
                  <div className="overflow-auto w-full rounded-lg">
                    <div className="grid grid-cols-6 gap-4 bg-gray-300 p-2 font-bold dark:bg-[rgba(255,255,255,0.1)] dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg shadow-md max-w-full overflow-hidden transition duration-300 dark:text-neutral-200">
                      <div className="col-span-1 w-[100px] text-center">Type</div>
                      <div className="col-span-1 w-[150px]">Question</div>
                      <div className="col-span-1 w-[120px] text-center">Response</div>
                      <div className="col-span-1 w-[150px] text-center">Correct Answer</div>
                      <div className="col-span-1 w-[100px] text-center">Amount</div>
                      <div className="col-span-1 w-[100px] text-center">Balance</div>
                    </div>
                    {events.map((event, index) => (
                      <div key={index} className="grid grid-cols-6 gap-4 py-4 mb-2 dark:text-neutral-300">
                        <div className="col-span-1 w-[100px] text-center flex items-center justify-center">
                          <span className={`inline-block flex-none size-2 items-center ml-2 ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'} rounded-full`} />
                          <span className="ml-2 cap1stL">{formatType(event.type)}</span>
                        </div>
                        <div className="col-span-1 w-[150px] max-h-36 overflow-x-auto overflow-y-auto no-scrollbar cap1stL">
                          {event.question}
                        </div>
                        <div className="col-span-1 cap1stL w-[120px] text-center">{event.response}</div>
                        <div className="col-span-1 cap1stL w-[150px] text-center">{event.correctAnswer}</div>
                        <div className="col-span-1 cap1stL w-[100px] text-center">{formatCurrency(event.amount)}</div>
                        <div className="col-span-1 w-[100px] text-center">{formatCurrency(event.balance)}</div>

                        {/* Edit and Delete Buttons */}
                        <div className="flex justify-end mt-4 gap-1 w-full">
                          <button
                            // onClick={() => handleEdit(index)} 
                            className="bg-blue-500 text-white hover:bg-blue-600 p-1 rounded w-[60px] flex items-center justify-center">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            // onClick={() => handleDelete(index)}
                            className="bg-red-500 text-white hover:bg-red-600 p-1 rounded w-[60px] flex items-center justify-center">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-secondary-dark">No events found.</p>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="block 870px:hidden mt-6">
        <div ref={containerRef} className="p-4 rounded mt-6">
          {loading ? (
            <div className="loader mt-20 mx-auto ease-linear rounded-full border-4 border-t-4 border-gray-200 border-t-secondary h-12 w-12 animate-spin" />
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : Object.keys(groupedEvents).length > 0 ? (
            Object.entries(groupedEvents).map(([participantFullName, events]) => (
              <div key={participantFullName} className="mb-4">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-center">
                    {episodeLink && (
                      <VideoPreview
                        videoLink={episodeLink}
                        title={`Episode ${episode?.episodeNumber}`}
                        episodeId={episode?._id}
                      />
                    )}
                  </div>
                  <div className="mt-4 mb-4 pl-16">
                    <div className="dark:text-neutral-300 font-semibold">Episode number: {episode?.episodeNumber}</div>
                    <div className="text-md dark:text-neutral-300 font-semibold">
                      Participant Name: {participantFullName}
                    </div>
                    <div className="text-md dark:text-neutral-300 font-semibold">
                      Total Amount Available: {formatCurrency(totalAmountAvailable)}
                    </div>
                    <div className="text-md dark:text-neutral-300 font-semibold">
                      Amount won: {formatCurrency(amountWon)}
                    </div>
                    <div className="text-sm dark:text-neutral-300 font-semibold">
                      Episode Date: {formatDate(episode?.episodeDate ?? '')}
                    </div>
                  </div>
                  <div className=' text-center dark:text-neutral-200 mb-4'>
                    <h2>Episode event</h2>
                  </div>
                  {/* Responsive grid for events */}
                  <div className="p-4 rounded-lg justify-center">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className="flex flex-col p-4 rounded-lg shadow-md border-b border-gray-300 transition-all duration-500"
                      >
                        {/* Large Screens (Above 865px): Display all in two columns */}
                        <div className="hidden lg:grid grid-cols-2 gap-4">
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-200">Type</h2>
                            <span className={`inline-block flex-none size-2 items-center ml-2 ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'} rounded-full`} />
                            <span className="ml-2 lowercase dark:text-neutral-300">{formatType(event.type)}</span>
                          </div>
                          {event.type !== 'CODE_MIX' && (
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-200">Question</h2>
                              <p className="dark:text-neutral-300">{event.question}</p>
                            </div>
                          )}
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-200">Response</h2>
                            <p className="dark:text-neutral-300">{event.response}</p>
                          </div>
                          {event.type !== 'CODE_MIX' && (
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-200">Correct Answer</h2>
                              <p className="dark:text-neutral-300">{event.correctAnswer}</p>
                            </div>
                          )}
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-200">Amount</h2>
                            <p className="dark:text-neutral-300">{formatCurrency(event.amount)}</p>
                          </div>
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-200">Balance</h2>
                            <p className="dark:text-neutral-300">{formatCurrency(event.balance)}</p>
                          </div>
                        </div>

                        {/* Mid-sized Screens (865px to 600px): Display pairs in rows */}
                        <div className="hidden md:grid lg:hidden grid-cols-1 gap-4">
                          <div className="flex justify-between">
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-200">Type</h2>
                              <span className={`inline-block flex-none size-2 items-center ml-2 ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'} rounded-full`} />
                              <span className="ml-2 lowercase dark:text-neutral-300">{formatType(event.type)}</span>
                            </div>
                            {event.type !== 'CODE_MIX' && (
                              <div>
                                <h2 className="font-bold text-lg dark:text-neutral-200">Question</h2>
                                <p className="dark:text-neutral-300">{event.question}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between">
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-200">Response</h2>
                              <p className="dark:text-neutral-300">{event.response}</p>
                            </div>
                            {event.type !== 'CODE_MIX' && (
                              <div>
                                <h2 className="font-bold text-lg dark:text-neutral-200">Correct Answer</h2>
                                <p className="dark:text-neutral-300">{event.correctAnswer}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between">
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-200">Amount</h2>
                              <p className="dark:text-neutral-300">{formatCurrency(event.amount)}</p>
                            </div>
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-200">Balance</h2>
                              <p className="dark:text-neutral-300">{formatCurrency(event.balance)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Small Screens (Below 600px): Display everything in one column */}
                        <div className="grid md:hidden grid-cols-1 gap-4">
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-200">Type</h2>
                            <span className={`inline-block flex-none size-2 items-center ml-2 ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'} rounded-full`} />
                            <span className="ml-2 lowercase dark:text-neutral-300">{formatType(event.type)}</span>
                          </div>
                          {event.type !== 'CODE_MIX' && (
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-200">Question</h2>
                              <p className="dark:text-neutral-300">{event.question}</p>
                            </div>
                          )}
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-200">Response</h2>
                            <p className="dark:text-neutral-300">{event.response}</p>
                          </div>
                          {event.type !== 'CODE_MIX' && (
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-200">Correct Answer</h2>
                              <p className="dark:text-neutral-300">{event.correctAnswer}</p>
                            </div>
                          )}
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-200">Amount</h2>
                            <p className="dark:text-neutral-300">{formatCurrency(event.amount)}</p>
                          </div>
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-200">Balance</h2>
                            <p className="dark:text-neutral-300">{formatCurrency(event.balance)}</p>
                          </div>
                        </div>
                        {/* Edit and Delete Buttons */}
                        <div className="flex justify-end mt-4 gap-1">
                          <button
                            // onClick={() => handleEdit(index)} 
                            className="bg-blue-500 text-white hover:bg-blue-600 p-1 rounded w-[60px] flex items-center justify-center">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            // onClick={() => handleDelete(index)}
                            className="bg-red-500 text-white hover:bg-red-600 p-1 rounded w-[60px] flex items-center justify-center">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-secondary-dark">No events available</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default EpisodeEventDetails;
