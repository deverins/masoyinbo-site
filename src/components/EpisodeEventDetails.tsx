import React, { useRef } from 'react';
import { API_URL } from '@/constants/api';
import axios from 'axios';

interface Event {
  question: string[];
  correctAnswer: string;
  response: string;
  type: string;
  amount: number;
  balance: number;
  participantFullName: string;
}

const EpisodeEventDetails: React.FC = () => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_URL}/v1/api/episode-events-details`);
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const groupedEvents = events.reduce((acc: { [key: string]: Event[] }, event) => {
    if (!acc[event.participantFullName]) {
      acc[event.participantFullName] = [];
    }
    acc[event.participantFullName].push(event);
    return acc;
  }, {});

  return (
    <div className="mx-4 mt-6">
      {/* Desktop View (Hidden at 870px and Below) */}
      <div className="hidden 870px:block">
        <div
          ref={containerRef}
          className="bg-gray-200 rounded-lg p-2 mt-6"
        >
          {Object.keys(groupedEvents).length > 0 ? (
            Object.entries(groupedEvents).map(([participantFullName, events]) => (
              <div key={participantFullName} className="mb-4">
                <div className="bg-gray-300 p-2 text-secondary text-center rounded-t-lg font-bold">
                  Name: {participantFullName}
                </div>
                <div className="overflow-auto max-h-80">
                  <div className="w-full bg-gray-200 rounded-lg">
                    {/* Header */}
                    <div className="grid grid-cols-6 gap-4 bg-gray-300 p-2 font-bold">
                      <div className="col-span-1 w-[100px] text-center">Type</div>
                      <div className="col-span-1 w-[150px]  ml-4">Question</div>
                      <div className="col-span-1 w-[120px] text-center">Response</div>
                      <div className="col-span-1 w-[150px] text-center">Correct Answer</div>
                      <div className="col-span-1 w-[100px] text-center">Amount</div>
                      <div className="col-span-1 w-[100px] text-center">Balance</div>
                    </div>
                    {/* Data Rows */}
                    {events.map((event, index) => (
                      <div key={index} className="grid grid-cols-6 gap-4 bg-gray-100 border-b border-gray-300 p-2">
                        <div className="col-span-1 w-[100px] text-center lowercase">{event.type}</div>
                        <div className="col-span-1 w-[150px] ml-6">{event.question.join(', ')}</div>
                        <div className="col-span-1 w-[120px] text-center">{event.response}</div>
                        <div className="col-span-1 w-[150px] text-center">{event.correctAnswer}</div>
                        <div className="col-span-1 w-[100px] text-center">₦{event.amount}</div>
                        <div className="col-span-1 w-[100px] text-center">₦{event.balance}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className=' text-center text-secondary-dark'>No events found.</p>
          )}
        </div>
      </div>

      {/* Mobile and Tablet View (Visible at 870px and Below) */}
      <div className="block 870px:hidden mt-6 bg-gray-200">
        <div
          ref={containerRef}
          className="bg-gray-200 p-4 rounded mt-6"
        >
          {Object.keys(groupedEvents).length > 0 ? (
            Object.entries(groupedEvents).map(([participantFullName, events]) => (
              <div key={participantFullName} className="mb-4">
                <div className="bg-gray-300 text-secondary p-2 text-center rounded-t-lg font-bold sticky top-0 z-0">
                  Participant Name: {participantFullName}
                </div>
                <div className="flex flex-col gap-6">
                  {events.length > 0 ? (
                    events.map((event, index) => (
                      <div
                        key={index}
                        className="flex flex-col p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md transition-all duration-500"
                      >
                        <div className="flex flex-col gap-4 ml-4">
                          <div>
                            <h2 className="font-semibold">Type</h2>
                            <p className='lowercase'>{event.type}</p>
                          </div>

                          {/* Conditionally hide question and correctAnswer for codemix type */}
                          {event.type !== 'CODE_MIX' && (
                            <>
                              <div className="w-full max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                                <h2 className="font-semibold">Question</h2>
                                <p className='pl-2'>{event.question.join(', ')}</p>
                              </div>
                              <div>
                                <h2 className="font-semibold">Correct Answer</h2>
                                <p className=''>{event.correctAnswer}</p>
                              </div>
                            </>
                          )}

                          <div>
                            <h2 className="font-semibold">Response</h2>
                            <p className=''>{event.response}</p>
                          </div>
                          <div>
                            <h2 className="font-semibold">Amount</h2>
                            <p className=''>₦{event.amount}</p>
                          </div>
                          <div>
                            <h2 className="font-semibold">Balance</h2>
                            <p className=''>₦{event.balance}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className=' text-center text-secondary-dark'>No events found.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default EpisodeEventDetails;