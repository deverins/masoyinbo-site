import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { EpisodeEvent } from '@/types';
import { API_URL } from '@/constants/api';

interface EventActionsProps {
  event: EpisodeEvent;
  index: number;
  episodeId: string;
  events: EpisodeEvent[];
  updateEvents: (updatedEvents: EpisodeEvent[]) => void;
  onEdit: (event: EpisodeEvent) => void;
}

const EventActions: React.FC<EventActionsProps> = ({ event, index, episodeId, events, updateEvents, onEdit }) => {

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const eventId = localStorage.getItem('eventId') ?? '';
        console.log("eventId", eventId)
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        console.log("user", user)
        if (!eventId || !user?._id) {
          toast.error('Event ID or User ID is missing.');
          return;
        }

        await axios.delete(`${API_URL}/v1/api/episodes/${eventId}`, {
          data: { userId: user._id },
        });

        toast.success('Event deleted successfully!');

        const updatedEvents = events.filter((_, i) => i !== index);
        updateEvents(updatedEvents);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-2 gap-1">
        {/* Edit Button triggers parent edit handler */}
        <button
          onClick={() => onEdit(event)}
          className="bg-blue-500 text-white hover:bg-blue-600 p-1 rounded w-[60px] flex items-center justify-center"
        >
          <PencilIcon className="h-5 w-5" />
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white hover:bg-red-600 p-1 rounded w-[60px] flex items-center justify-center"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default EventActions;
