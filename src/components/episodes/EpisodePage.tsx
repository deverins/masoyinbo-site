"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";

import VideoPreview from "./VideoPreview";
import EventsTable from "./EventsTable";
import Loading from "../UI/Loading";
import { Episode, EpisodeEvent, EpisodeResponse, EventActionSignal } from "@/types";
import { API_URL } from "@/constants/api";
import { formatCurrency } from "@/utils/functions";
import EventsForm from "./EventsForm";
import Modal from "../Modal";
import { CreateEpisodeForm } from "@/app/(admin)/create-episode/Create";

const EpisodePage: React.FC = () => {
  const { episodeId }: { episodeId: string } = useParams()
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeResponse>();
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>();
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEpisodeEditModal, setOpenEpisodeEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EpisodeEvent>();
  const [error, setError] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteEventModal, setOpenDeleteEventModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchEpisodeEventData(episodeId);
  }, [episodeId]);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("userRole") === "admin");
  }, []);

  const fetchEpisodeEventData = async (episodeId: string) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/episodes/${episodeId}`);
      setEpisodeDetails(data as EpisodeResponse);
    } catch (error) {
      console.error("Failed to fetch episode data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const episodeEvent = episodeDetails?.events.find((ev) => ev._id === id);
    if (episodeEvent) {
      setSelectedEvent(episodeEvent);
      setOpenEditModal(true);
    }
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
    setSelectedEvent(undefined);
  };

  const onSave = (event: EpisodeEvent) => {
    if (episodeDetails) {
      const index = episodeDetails.events.findIndex((ev) => ev._id === event._id);
      if (index < 0) {
        episodeDetails.events.push(event);
      } else {
        episodeDetails.events[index] = event;
      }
      setOpenEditModal(false);
    }
  };

  const handleEditEpisode = () => {
    if (episodeDetails?.episode) {
      setSelectedEpisode(episodeDetails.episode);
      setOpenEpisodeEditModal(true);
    }
  };

  const closeEditEpisodeModal = () => {
    setOpenEpisodeEditModal(false);
    setSelectedEpisode(undefined);
  };

  const onSaveEpisode = async (episode: Episode) => {
    if (episodeDetails) {
      try {
        await axios.put(`${API_URL}/api/episode/${episodeId}`, episode);
        setEpisodeDetails({
          ...episodeDetails,
          episode: { ...episodeDetails.episode, ...episode },
        });
        setOpenEpisodeEditModal(false);
      } catch (error) {
        console.error("Failed to update episode:", error);
        setError("Could not update episode.");
      }
    }
  };

  const addEvent = () => {
    setSelectedEvent(undefined);
    setOpenEditModal(true);
  };

  const signal = (signal: EventActionSignal) => {
    const { id, type } = signal;
    if (type === "DELETE") {
      setEventToDelete(id);
      setOpenDeleteEventModal(true);
    } else {
      handleEdit(id);
    }
  };

  const handleDelete = async (id: string) => {
    if (episodeDetails) {
      try {
        await axios.delete(`${API_URL}/api/episode-events/${id}`);
        setEpisodeDetails({
          ...episodeDetails,
          events: episodeDetails.events.filter((event) => event._id !== id),
        });
      } catch (error: any) {
        setError(error?.response?.data?.message as string);
      }
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    setEventToDelete(null);
    setOpenDeleteEventModal(false);
  };

  const handleDeleteEpisode = async () => {
    try {
      await axios.delete(`${API_URL}/api/episode/${episodeId}`);
      router.push("/episodes");
      toast.success("Episode deleted successfully!");
    } catch (error: any) {
      setError(error?.response?.data?.message as string);
    }
    setOpenDeleteModal(false);
  };

  if (loading) return <Loading />;

  return (<>
    {episodeDetails ?
      <>
        <div className="flex flex-col items-center py-2">
          <div className="mx-auto w-full max-w-screen-sm sm:mx-20">
            <VideoPreview videoLink={episodeDetails.episode.episodeLink} title="" />
          </div>

          {/* Episode Details */}
          <div className="mt-4 w-full max-w-[560px] mb-10">
            <div className="dark:text-neutral-300 font-semibold">
              Episode number: {episodeDetails.episode.episodeNumber}
            </div>
            <div className="dark:text-neutral-300 font-semibold">
              Participant Name: {episodeDetails.participantFullName}
            </div>
            <div className="dark:text-neutral-300 font-semibold">
              Total Amount Available: {formatCurrency(episodeDetails.episode.availableAmountToWin)}
            </div>
            <div className="text-md dark:text-neutral-300 font-semibold">
              Amount won: {formatCurrency(episodeDetails.episode.amountWon)}
            </div>
            <div className="dark:text-neutral-300 font-semibold">
              Episode Date: {(episodeDetails.episode.episodeDate ?? '')}
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="mt-4 w-full">
            <div className="flex gap-2 mx-4 justify-end mt-4">
              <button onClick={handleEditEpisode}
                className="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded flex items-center justify-center">
                <PencilIcon className="h-5 w-5" />
                Edit Episode
              </button>
              <button
                onClick={() => setOpenDeleteModal(true)}
                className="bg-red-500 text-white rounded hover:bg-red-600 p-2 flex items-center justify-center">
                <TrashIcon className="h-5 w-5" />
                Delete Episode
              </button>
            </div>
          </div>
        )}
        <h3 className="text-center font-bold text-xl dark:text-neutral-200 mt-6">Episode Events</h3>
        {isAdmin && (
          <div className='flex justify-end pt-4'>
            <button onClick={addEvent}
              className="bg-primary-light flex text-neutral-200 p-2 rounded-lg mb-2">
              <PlusIcon className="h-5 w-5 mr-2" /> Add Event
            </button>
          </div>
        )}

        <EventsTable events={episodeDetails.events} signal={signal} />

        {/* Episode Event Modal */}
        <Modal trigger={openEpisodeEditModal} close={closeEditEpisodeModal} side="center" gum
          backgroundColorClass="bg-secondary-cream dark:bg-slate-900">
          <div className="w-[calc(100dvw-12px)] max-w-[600px] p-2">
            <CreateEpisodeForm onSaveEpisode={onSaveEpisode} episodeId={episodeId} editEpisode={selectedEpisode} />

          </div>
        </Modal>

        {/* Edit Event Modal */}
        <Modal trigger={openEditModal} close={closeEditModal} side="center" gum
          backgroundColorClass="bg-secondary-cream dark:bg-slate-900">
          <div className="w-[calc(100dvw-12px)] max-w-[600px] p-2">
            <EventsForm onSave={onSave} event={selectedEvent} episodeId={episodeId} />
          </div>
        </Modal>

        {/* Delete Event Confirmation Modal */}
        <Modal
          trigger={openDeleteEventModal}
          close={() => setOpenDeleteEventModal(false)}
          side="center"
          gum
          backgroundColorClass="bg-secondary-cream dark:bg-slate-900 rounded">
          <div className="p-4 w-[calc(100dvw-12px)] max-w-[600px]">
            <h2 className="text-lg font-bold dark:text-neutral-200">Confirm Delete</h2>
            <p className="dark:text-neutral-200">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="mt-4 flex justify-end">
              <button onClick={closeDeleteModal} className="mr-2 bg-gray-300 hover:bg-gray-400 p-2 rounded">Cancel</button>
              <button
                onClick={() => {
                  if (eventToDelete) handleDelete(eventToDelete);
                  setOpenDeleteEventModal(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">Delete</button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal trigger={openDeleteModal} close={() => setOpenDeleteModal(false)} side="center" gum
          backgroundColorClass="bg-secondary-cream dark:bg-slate-900 rounded">
          <div className="p-4 w-[calc(100dvw-12px)] max-w-[600px]">
            <h2 className="text-lg font-bold dark:text-neutral-200">Confirm Delete</h2>
            <p className=" dark:text-neutral-200">Are you sure you want to delete this episode? This action cannot be undone.</p>
            <div className="mt-4 flex justify-end">
              <button onClick={() => setOpenDeleteModal(false)} className="mr-2 bg-gray-300 hover:bg-gray-400 p-2 rounded">Cancel</button>
              <button onClick={handleDeleteEpisode} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">Delete</button>
            </div>
          </div>
        </Modal>
      </>
      :
      <div className="text-red-500 text-center mt-4">
        {error ? error : 'No episode details available.'}
      </div>
    }
  </>)
}

export default EpisodePage;
