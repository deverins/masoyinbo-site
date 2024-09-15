import { API_URL } from '@/constants/api';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface EpisodeEvent {
  question: string;
  correctAnswer: string;
  response: string;
  type: string;
  amount: number;
  balance: number;
}

const EpisodeEventsTable: React.FC<{ onEdit: any }> = ({ onEdit }) => {
  const [events, setEvents] = useState<EpisodeEvent[]>([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('episodeEvents') || '[]');
    setEvents(storedEvents);
  }, []);

  const handleDelete = (index: number) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    console.log("Updated events after deletion:", updatedEvents);
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
        alert("No episode ID found. Please create an episode first.");
        return;
      }

      await axios.post(`${API_URL}/v1/api/episode-events`, { episodeId, events });
      localStorage.removeItem('episodeEvents');
      setEvents([]); // Clear state and update UI
      alert('Data successfully saved to backend.');
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  return (
    <div className="p-4">
      {/* Mobile and Tablet View (870px and below) */}
      <div className="block max-[870px]:block custom:hidden">
        <div className="flex flex-col gap-6">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div
                key={index}
                className="flex flex-col p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md transition-all duration-500 hover:bg-gray-200"
              >
                <div className="flex flex-col gap-4">
                  {/* Question and Response */}
                  <div className="flex flex-col gap-2">
                    <div>
                      <h2 className="font-semibold">Question</h2>
                      <p>{event.question}</p>
                    </div>
                    <div>
                      <h2 className="font-semibold">Response</h2>
                      <p>{event.response}</p>
                    </div>
                  </div>
                  {/* Other details */}
                  <div className="flex flex-col gap-2 bg-gray-200 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <h2 className="font-semibold">Correct Answer:</h2>
                      <p>{event.correctAnswer}</p>
                    </div>
                    <div className="flex gap-1">
                      <h2 className="font-semibold">Type:</h2>
                      <p>{event.type}</p>
                    </div>
                    <div className="flex gap-1">
                      <h2 className="font-semibold">Amount:</h2>
                      <p>{event.amount}</p>
                    </div>
                    <div className="flex gap-1">
                      <h2 className="font-semibold">Balance:</h2>
                      <p>{event.balance}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleEdit(index)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div></div>
             )}
        </div>
        {events.length > 0 && (
          <div className=' items-end flex'>
          <button
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          </div>
        )}
      </div>

      {/* Desktop View (Above 870px) */}
      <div className="hidden custom:block max-[870px]:hidden">
        <div className="flex flex-col gap-6">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row lg:justify-around md:justify-between md:items-center p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md transition-all duration-500 hover:bg-gray-200"
              >
                <div className="flex flex-col md:flex-row gap-20">
                  <div>
                    <h2 className="font-semibold">Question</h2>
                    <p>{event.question}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Response</h2>
                    <p>{event.response}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                  <div>
                    <h2 className="font-semibold">Correct Answer</h2>
                    <p>{event.correctAnswer}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Type</h2>
                    <p>{event.type}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Amount</h2>
                    <p>{event.amount}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Balance</h2>
                    <p>{event.balance}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleEdit(index)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        {events.length > 0 && (
          <button
            onClick={handleSave}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save All to Backend
          </button>
        )}
      </div>
    </div>
  );
};

export default EpisodeEventsTable;
