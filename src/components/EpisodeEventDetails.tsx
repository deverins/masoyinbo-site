import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/api';
import VideoPreview from './VideoPreview';
import { Episode, EpisodeEvent, EpisodeEventsApiResponse, formatCurrency, formatDate, formatType } from '@/types';


const EpisodeEventDetails: React.FC = () => {
  const [events, setEvents] = useState<EpisodeEvent[]>([]);
  const [episode, setEpisode] = useState<Episode>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const episodeId = localStorage.getItem('episodeIdToSelect');
    if (!episodeId) {
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const endpoint = `${API_URL}/v1/api/episode-events-by-episodeId?id=${episodeId}`;
        const { data } = await axios.get<EpisodeEventsApiResponse>(endpoint);
        setEvents(data.events);
        setEpisode(data.episode);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const groupedEvents = events.reduce((acc: { [key: string]: EpisodeEvent[] }, event) => {
    const participantName = event.participantFullName || 'Unknown Participant';
    if (!acc[participantName]) {
      acc[participantName] = [];
    }
    acc[participantName].push(event);
    return acc;
  }, {});

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
          ) : Object.keys(groupedEvents).length > 0 ? (
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
                  <div className="overflow-auto w-full rounded-lg">
                    <div className="grid grid-cols-6 gap-4 bg-gray-300 p-2 font-bold">
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
                            <h2 className="font-bold text-lg dark:text-neutral-400">Type</h2>
                            <span
                              className={`inline-block flex-none size-2 items-center ml-2 ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'
                                } rounded-full`}
                            />
                            <span className="ml-2 lowercase dark:text-neutral-300">
                              {formatType(event.type)}
                            </span>
                          </div>
                          {event.type !== 'CODE_MIX' && (
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-400">Question</h2>
                              <p className="dark:text-neutral-300">{event.question}</p>
                            </div>
                          )}
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-400">Response</h2>
                            <p className="dark:text-neutral-300">{event.response}</p>
                          </div>
                          {event.type !== 'CODE_MIX' && (
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-400">Correct Answer</h2>
                              <p className="dark:text-neutral-300">{event.correctAnswer}</p>
                            </div>
                          )}
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-400">Amount</h2>
                            <p className="dark:text-neutral-300">
                              {formatCurrency(event.amount)}
                            </p>
                          </div>
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-400">Balance</h2>
                            <p className="dark:text-neutral-300">{formatCurrency(event.balance)}</p>
                          </div>
                        </div>

                        {/* Mid-sized Screens (865px to 600px): Display pairs in rows */}
                        <div className="hidden md:grid lg:hidden grid-cols-1 gap-4">
                          <div className="flex justify-between">
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-400">Type</h2>
                              <span
                                className={`inline-block flex-none size-2 items-center ml-2 ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'
                                  } rounded-full`}
                              />
                              <span className="ml-2 lowercase dark:text-neutral-300">
                                {formatType(event.type)}
                              </span>
                            </div>
                            {event.type !== 'CODE_MIX' && (
                              <div>
                                <h2 className="font-bold text-lg dark:text-neutral-400">Question</h2>
                                <p className="dark:text-neutral-300">{event.question}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between">
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-400">Response</h2>
                              <p className="dark:text-neutral-300">{event.response}</p>
                            </div>
                            {event.type !== 'CODE_MIX' && (
                              <div>
                                <h2 className="font-bold text-lg dark:text-neutral-400">Correct Answer</h2>
                                <p className="dark:text-neutral-300">{event.correctAnswer}</p>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between">
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-400">Amount</h2>
                              <p className="dark:text-neutral-300">
                                {formatCurrency(event.amount)}
                              </p>
                            </div>
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-400">Balance</h2>
                              <p className="dark:text-neutral-300">{formatCurrency(event.balance)}</p>
                            </div>
                          </div>
                        </div>

                        {/* Small Screens (Below 600px): Display everything in one column */}
                        <div className="grid md:hidden grid-cols-1 gap-4">
                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-400">Type</h2>
                            <span
                              className={`inline-block flex-none size-2 items-center ml-2 ${event.isCorrect ? 'bg-green-500' : 'bg-red-500'
                                } rounded-full`}
                            />
                            <span className="ml-2 lowercase dark:text-neutral-300">
                              {formatType(event.type)}
                            </span>
                          </div>
                          {event.type !== 'CODE_MIX' && (
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-400">Question</h2>
                              <p className="dark:text-neutral-300">{event.question}</p>
                            </div>
                          )}

                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-400">Response</h2>
                            <p className="dark:text-neutral-300">{event.response}</p>
                          </div>

                          {event.type !== 'codemix' && (
                            <div>
                              <h2 className="font-bold text-lg dark:text-neutral-400">Correct Answer</h2>
                              <p className="dark:text-neutral-300">{event.correctAnswer}</p>
                            </div>
                          )}

                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-400">Amount</h2>
                            <p className="dark:text-neutral-300">
                              {formatCurrency(event.amount)}
                            </p>
                          </div>

                          <div>
                            <h2 className="font-bold text-lg dark:text-neutral-400">Balance</h2>
                            <p className="dark:text-neutral-300">{formatCurrency(event.balance)}</p>
                          </div>
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
