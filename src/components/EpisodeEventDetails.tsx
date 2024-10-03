import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/constants/api';
import VideoPreview from './VideoPreview';
import { Episode, EpisodeEvent, EpisodeEventsApiResponse,} from '@/types';
import { formatCurrency, formatDate, formatType, } from '@/utils/functions';
import toast from 'react-hot-toast';
import EventActions from './UI/EventActions';
import EventInputFields from './UI/EventActionFields';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/16/solid';
interface EpisodeEventDetailsProps {
  EpisodeEvent: EpisodeEvent[];
  episodeId: string;
  eventId: string;
  updateEvents: (updatedEvents: EpisodeEvent[]) => void;
}
const EpisodeEventDetails: React.FC<EpisodeEventDetailsProps> = ({ episodeId, updateEvents }) => {
  const [events, setEvents] = useState<EpisodeEvent[]>([]);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [participantFullName, setParticipantFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noEventsError, setNoEventsError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>('');
  const [isLogin, setIsLogin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EpisodeEvent | null>(null);
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
        const { data } = await axios.get<EpisodeEventsApiResponse>(endpoint);
        setEvents(data.events);
        setEpisode(data.episode);
        setParticipantFullName(data.participantFullName);

        if (data.events.length > 0) {
          const eventId = data.events[0]._id;
          if (eventId) {
            localStorage.setItem('eventId', eventId);
          } else {
            console.error('Event ID not found.');
          }
        }

        if (data.events.length && userRole === 'admin') {
          setNoEventsError('No added episode events.');
        } else {
          setNoEventsError(null);
        }
      } catch (error: any) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [episodeId, userRole]);

  const episodeLink = episode?.episodeLink;
  const totalAmountAvailable = episode ? episode.availableAmountToWin : 0;
  const amountWon = episode ? episode.amountWon : 0;

  const handleEdit = (event: EpisodeEvent) => {
    setEditingEvent(event);
    setIsEditing(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      const episodeId = localStorage.getItem('episodeIdToSelect');
      const eventId = localStorage.getItem('eventId');
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        throw new Error("User not found in local storage.");
      }

      if (!episodeId || !eventId) {
        throw new Error("Episode ID or Event ID not found in local storage.");
      }

      const user = JSON.parse(storedUser);
      const userId = user._id;

      const { participantFullName, ...filteredValues } = values;

      if (!filteredValues.question || !filteredValues.response || !filteredValues.type) {
        throw new Error("Event details are required.");
      }

      if (filteredValues.type !== 'codemix' && !filteredValues.correctAnswer) {
        throw new Error("Correct answer is required for non-codemix questions.");
      }

      const payload = { userId, event: [filteredValues] };

      const response = await axios.put(`${API_URL}/v1/api/episodes/${eventId}`, payload);

      if (response.status === 200) {
        toast.success('Event updated successfully!');
      }

      setIsEditing(false);
      setEditingEvent(null);
    } catch (error: any) {
      console.error('Update event error:', error);
    }
  };
  return (
    <div className="mx-4 mt-6">
      {/* Desktop/Tablet View */}
      <div className="hidden 870px:block">
        <div ref={containerRef} className="rounded-lg p-2 mt-6 max-w-6xl mx-auto">
          {loading ? (
            <div className="loader mt-20 mx-auto ease-linear rounded-full border-4 border-t-4 border-gray-200 border-t-secondary h-12 w-12 animate-spin" />
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              {/* Episode details rendering */}
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
                  <div className="text-md dark:text-neutral-300 font-semibold">Amount won: {formatCurrency(amountWon)}</div>
                  <div className="dark:text-neutral-300 font-semibold">Episode Date: {formatDate(episode?.episodeDate ?? '')}</div>
                </div>
              </div>
              {/* Add Episode Event section */}
              <div className=' flex justify-center'>
                <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl transition-all duration-300 p-6 rounded">
                  {isEditing && editingEvent && (
                    <div>
                      <h1 className="text-xl font-bold dark:text-gray-400 text-center">Add Episode Event</h1>
                      <EventInputFields
                        event={editingEvent}
                        onSubmit={handleSubmit}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Events section */}
              {events.length === 0 ? (
                <div className="text-center">
                  {userRole === 'admin' && (
                    <div>
                      <p className="text-secondary-dark">No events found for this episode.</p>
                      <div className='flex justify-center pt-4'>
                        <div
                          className="bg-primary-light text-neutral-200 p-1 m rounded-lg">
                          <Link href={`/add-episode-events/${episodeId}`} className='flex p-2'>
                            <PlusIcon className="h-5 w-5 mr-2" /> Add Event
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h2 className='dark:text-neutral-200 mb-4 text-center text-sm sm:text-base font-bold mt-4'> Episode Event</h2>
                  <div className="overflow-auto w-full rounded-lg">
                    {/* Render events when present */}
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
                        <div className="col-span-1 w-[100px] text-center">
                          {formatCurrency(event.balance)}
                          {/* Edit and Delete Buttons under the balance */}
                          {isLogin && userRole === 'admin' && (
                            <EventActions
                              key={event.id}
                              event={event}
                              index={index}
                              episodeId={episodeId}
                              events={events}
                              updateEvents={updateEvents}
                              onEdit={handleEdit}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {userRole === 'admin' && (
                    <div className='flex justify-end pt-2 px-12'>
                      <div
                        className="bg-primary-light text-neutral-200 p-1 m rounded-lg">
                        <Link href={`/add-episode-events/${episodeId}`} className='flex p-2'>
                          <PlusIcon className="h-5 w-5 mr-2" /> Add Event
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
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
          ) : (
            <>
              {/* Display Episode and Video Preview */}
              <div className="flex justify-center">
                {episodeLink && (
                  <VideoPreview
                    videoLink={episodeLink}
                    title={`Episode ${episode?.episodeNumber}`}
                    episodeId={episode?._id}
                  />
                )}
              </div>

              {/* Display Episode Details */}
              <div className="mt-4 mb-4 pl-16">
                <div className="dark:text-neutral-300 font-semibold">Episode number: {episode?.episodeNumber}</div>
                <div className="dark:text-neutral-300 font-semibold">Participant Name: {participantFullName}</div>

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

              {/* Add Episode Event section */}
              <div className=' flex justify-center'>
                <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl transition-all duration-300 p-6 rounded">
                  {isEditing && editingEvent && (
                    <div>
                      <h1 className="text-xl font-bold dark:text-gray-400 text-center">Add Episode Event</h1>
                      <EventInputFields
                        event={editingEvent}
                        onSubmit={handleSubmit}
                      />

                    </div>
                  )}
                </div>
              </div>
              {/* Events section */}
              {events.length === 0 ? (
                <div className="text-center">
                  {userRole === 'admin' && (
                    <div>
                      <p className="text-secondary-dark">No events found for this episode.</p>
                      <Link href={`/add-episode-events/${episodeId}`}>
                        <button
                          className="bg-primary-light text-neutral-200  text-sm sm:text-base font-bold py-2 px-4 rounded-md mt-4">
                          <span>
                            <PlusIcon className="h-5 w-5 mr-2" /> Add Event
                          </span>
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h2 className='dark:text-neutral-200 text-center text-sm sm:text-base font-bold mt-4'> Episode Event</h2>
                  <div className="p-4 pt-0 rounded-lg justify-center">
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
                          {isLogin && (userRole === 'admin') && (
                            <EventActions
                              key={event.id}
                              event={event}
                              index={index}
                              episodeId={episodeId}
                              events={events}
                              updateEvents={updateEvents}
                              onEdit={handleEdit}
                            />
                          )}
                        </div>

                      </div>
                    ))}
                    {userRole === 'admin' && (
                      <div className='flex justify-end pt-4'>
                        <div
                          className="bg-primary-light text-neutral-200 p-1 m rounded-lg">
                          <Link href={`/add-episode-events/${episodeId}`} className='flex p-2'>
                            <PlusIcon className="h-5 w-5 mr-2" /> Add Event
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

    </div>
  );

};

export default EpisodeEventDetails;
