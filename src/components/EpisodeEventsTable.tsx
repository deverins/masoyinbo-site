
import { API_URL } from '@/constants/api';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CiSaveUp1 } from 'react-icons/ci';

interface EpisodeEvent {
  question: string;
  correctAnswer: string;
  response: string;
  type: string;
  amount: number;
  balance: number;
  isCorrect: boolean;
}

const EpisodeEventsTable: React.FC<{ onEdit: any }> = ({ onEdit }) => {
  const [events, setEvents] = useState<EpisodeEvent[]>([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('episodeEvents') || '[]');
    setEvents(storedEvents);
  }, []);

  const handleDelete = (index: number) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    localStorage.setItem('episodeEvents', JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  const handleEdit = (index: number) => {
    const eventToEdit = events[index];
    onEdit({ ...eventToEdit, index });
  };

  const handleSave = async () => {
    try {
      const episodeId = localStorage.getItem("episodeId");
      if (!episodeId) {
        return;
      }
  
      const eventsToSave = events.map(({ question, correctAnswer, response, type, amount, balance, isCorrect }) => ({
        question,
        correctAnswer,
        response,
        type,
        amount,
        balance,
        isCorrect, 
      }));
  
      await axios.post(`${API_URL}/v1/api/episode-events`, { episodeId, events: eventsToSave });
      
      localStorage.removeItem('episodeEvents');
      setEvents([]);
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };
  


  return (
    <div>
      {/* Mobile and Tablet View (870px and below) */}
      <div className="block max-[870px]:block custom:hidden mx-4 mt-6 bg-gray-200 p-4 rounded ">
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
                        <p className='pl-2'>{event.question}</p>
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
                    <h2 className="font-semibold">Deducted Amount</h2>
                    <p className=''>
                      { `₦$event.amount`}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-semibold">Balance</h2>
                    <p className=''>₦{event.balance}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 justify-end">
                  <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white hover:bg-blue-600 p-1 rounded w-[60px] flex items-center justify-center">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(index)} className="bg-red-500 text-white hover:bg-red-600 p-1 rounded w-[60px] flex items-center justify-center">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        {events.length > 0 && (
          <div className='flex justify-center'>
            <button onClick={handleSave} className="mt-4 bg-green-500 w-32 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center">
              Save
              <CiSaveUp1 className="h-5 w-5 mr-2" />
            </button>
          </div>
        )}
      </div>

      {/* Desktop View (Above 870px) */}
      <div className={`hidden custom:block max-[870px]:hidden ${events.length > 3 ? 'overflow-y-auto max-h-[400px]' : ''}`}>
        {events.length > 0 ? (
          <>
            <div className="flex flex-col bg-gray-200 mx-4 rounded-lg p-2 mt-6 gap-2">
              <div className="flex justify-between font-bold mb-2 p-2">
                <div className="w-[90px] text-center">Type</div>
                <div className="w-[150px]">Question</div>
                <div className="w-[120px] text-center">Response</div>
                <div className="w-[130px] text-center">Correct Answer</div>
                <div className="w-[80px] text-center">Amount</div>
                <div className="w-[80px] text-center">Balance</div>
                <div className="w-[130px] text-center">Actions</div>
              </div>
              {events.map((event, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 border-b border-gray-300 rounded-lg p-4">
                  <div className="w-[90px] text-center lowercase">{event.type}</div>
                  <div className="w-[150px] max-h-20 overflow-y-auto">{event.question}</div>
                  <div className="w-[120px] text-center">{event.response}</div>
                  <div className="w-[130px] text-center">{event.correctAnswer}</div>
                  <div className="w-[80px] text-center">
                    {event.amount}
                  </div>
                  <div className="w-[80px] text-center">₦{event.balance}</div>
                  <div className="flex gap-1 justify-center w-[130px]">
                    <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white hover:bg-blue-600 p-1 rounded w-[60px] flex items-center justify-center">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white hover:bg-red-600 p-1 rounded w-[60px] flex items-center justify-center">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div></div>
        )}
        {events.length > 0 && (
          <div className='flex justify-center'>
            <button onClick={handleSave} className="mt-4 bg-green-500 w-32 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center">
              Save
              <CiSaveUp1 className="h-5 w-5 mr-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeEventsTable;