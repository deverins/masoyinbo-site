import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import VideoPreview from "./VideoPreview";
import EventsTable from "./EventsTable";
import Loading from "../UI/Loading";

import { Episode, EpisodeEvent } from "@/types";
import axios from "axios";
import { API_URL } from "@/constants/api";
import { formatCurrency, formatDate } from "@/utils/functions";
import { PlusIcon } from "@heroicons/react/16/solid";

type EpisodeResponse = {
  events: EpisodeEvent[],
  participantFullName: string,
  episode: Episode
}

const EpisodePage: React.FC = () => {
  const { episodeId }: { episodeId: string } = useParams()
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeResponse>()
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    fetchEpisodeData(episodeId);
  }, [episodeId]);

  const fetchEpisodeData = async (episodeId: string) => {
    try {
      const endpoint = `${API_URL}/v1/api/episodes/${episodeId}`;
      const { data } = await axios.get(endpoint);
      const response = data as EpisodeResponse
      setEpisodeDetails(response)
    } catch (error) {
      console.error('Failed to fetch episode data:', error);
    } finally {
      setLoading(false)
    }
  };

  if (loading) {
    return <Loading />
  }

  const isAdmin = localStorage.userRole === 'admin'

  return (<>
    {episodeDetails ?
      <>
        <div className="flex flex-col items-center py-2">
          <VideoPreview videoLink={episodeDetails.episode.episodeLink} title="" />
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
              Episode Date: {formatDate(episodeDetails.episode.episodeDate ?? '')}
            </div>
          </div>
        </div>
        <div></div>
        <h3 className="text-center font-bold text-xl dark:text-neutral-200">Episode Events</h3>
        {isAdmin && (
          <div className="flex justify-end"> <div className='flex justify-end pt-4'>
            <div
              className="bg-primary-light flex text-neutral-200 p-2 m rounded-lg mb-2">
              <PlusIcon className="h-5 w-5 mr-2" /> Add Event
            </div>
          </div></div>
        )}
        <EventsTable events={episodeDetails.events} />
      </>
      :
      <div>

      </div>
    }
  </>)
}


export default EpisodePage;