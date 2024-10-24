"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import VideoPreview from "./VideoPreview";
import EventsTable from "./EventsTable";
import Loading from "../UI/Loading";

import { Episode, EpisodeEvent, EventActionSignal } from "@/types";
import axios from "axios";
import { API_URL } from "@/constants/api";
import { formatCurrency, formatDate } from "@/utils/functions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import EventsForm from "./EventsForm";
import Modal from "../Modal";
import NotFound from "../NotFound";

type EpisodeResponse = {
  events: EpisodeEvent[],
  participantFullName: string,
  episode: Episode
}

const EpisodePage: React.FC = () => {
  const { episodeId }: { episodeId: string } = useParams()
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeResponse>()
  const [loading, setLoading] = useState(true)

  const [openModal, setOpenModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EpisodeEvent>()
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEpisodeData(episodeId);
  }, [episodeId]);

  const fetchEpisodeData = async (episodeId: string) => {
    try {
      const endpoint = `${API_URL}/api/episodes/${episodeId}`;
      const { data } = await axios.get(endpoint);
      const response = data as EpisodeResponse
      setEpisodeDetails(response)
    } catch (error) {
      console.error('Failed to fetch episode data:', error);
    } finally {
      setLoading(false)
    }
  };

  const signal = (signal: EventActionSignal) => {
    console.log(signal);

    const { id, type } = signal
    if (type == 'DELETE') {
      return handleDelete(id)
    }
    handleEdit(id)
  }

  const handleEdit = (id: string) => {
    if (!episodeDetails) return
    const episodeEvent = episodeDetails.events.find(ev => ev._id == id)
    if (!episodeEvent) return
    setSelectedEvent(episodeEvent)
    setOpenModal(true)

  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      if (!episodeDetails) return;

      try {
        const { data } = await axios.delete(`${API_URL}/api/episode-events/${id}`)

        const updatedEvents = episodeDetails.events.filter((event) => event._id !== id);
        setEpisodeDetails({ ...episodeDetails, events: updatedEvents });
      } catch (error: any) {
        setError(error?.response?.data?.message as string)
      }
    }
  };


  const closeModal = () => {
    setOpenModal(false)
    setSelectedEvent(undefined)
  }

  const onSave = (event: EpisodeEvent) => {
    if (!episodeDetails) return
    const index = episodeDetails.events.findIndex(ev => ev._id == event._id)
    if (index < 0) {
      episodeDetails.events.push(event)
    } else {
      episodeDetails.events[index] = event
    }
    setOpenModal(false)
  }

  const addEvent = () => {
    setSelectedEvent(undefined)
    setOpenModal(true)
  }


  if (loading) {
    return <Loading />
  }

  const isAdmin = localStorage.userRole === 'admin'

  return (<>
    {episodeDetails ?
      <>
        <div className="flex flex-col items-center py-2">
          <div className="mx-auto w-full max-w-screen-sm sm:mx-20">
            <VideoPreview videoLink={episodeDetails.episode.episodeLink} title="" />
          </div>

          {/*Episode Details */}
          <div className="mt-4 w-full max-w-[560px] mb-10">
            <div className="dark:text-neutral-300 font-semibold">
              Episode number: {episodeDetails.episode.episodeNumber}
            </div>
            <div className="dark:text-neutral-300 font-semibol">
              Participant Name: {episodeDetails.participantFullName}
            </div>
            <div className="dark:text-neutral-300 font-semibold">
              Total Amount Available: {formatCurrency(episodeDetails.episode.availableAmountToWin)}
            </div>
            <div className="text-md dark:text-neutral-300 font-semibold">
              Amount won: {formatCurrency(episodeDetails.episode.amountWon)}
            </div>
            <div className="dark:text-neutral-300 font-semibold">
              Episode Date: {formatDate(episodeDetails.episode.episodeDate ?? '')}
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="mt-4 w-full">
          <div className="flex gap-2 mx-4 justify-end mt-4">
          <button className="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded flex items-center justify-center">
            <PencilIcon className="h-5 w-5" />
              Edit Episode
          </button>
          <button className="bg-red-500 text-white rounded hover:bg-red-600 p-2 flex items-center justify-center">
            <TrashIcon className="h-5 w-5" />
              Delete Epiosde
          </button>
        </div>
          </div>
        )}
        <h3 className="text-center font-bold text-xl dark:text-neutral-200">Episode Events</h3>
        {isAdmin && (
          <div className='flex justify-end pt-4'>
            <button onClick={addEvent}
              className="bg-primary-light flex text-neutral-200 p-2 rounded-lg mb-2">
              <PlusIcon className="h-5 w-5 mr-2" /> Add  Event
            </button>
          </div>
        )}

        <EventsTable events={episodeDetails.events} signal={signal} />

        <Modal trigger={openModal} close={closeModal} side="center" gum
          backgroundColorClass="bg-secondary-cream dark:bg-slate-900"
        >
          <div className="w-[calc(100dvw-12px)] max-w-[600px] p-2">
            <EventsForm onSave={onSave} event={selectedEvent} episodeId={episodeId} />
          </div>
        </Modal>
      </>
      :
      <div className="text-red-500 text-center mt-4">
        {error ? error : <div><NotFound /></div>}
      </div>
    }
  </>)
}


export default EpisodePage;