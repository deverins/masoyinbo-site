import React from 'react';
import VideoPreview from './VideoPreview';
import Link from 'next/link';
import { Episode } from '@/types';

type RecentEpisodes = {
  episodes: Episode[]
}


const RecentEpisodes: React.FC<RecentEpisodes> = ({episodes}) => {

  const handleEpisodeClick = (episodeId: string) => {
    localStorage.setItem('episodeIdToSelect', episodeId);
  };

 

  return (
    <div className="mt-10 pb-5 mx-8">
      <h2 className="text-2xl font-bold mb-8 dark:text-neutral-400 text-center">Recent Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {episodes.map((episode, index) => (
          <div key={episode._id} className="relative shadow-3xl pb-2 rounded-2xl">
            <VideoPreview
              videoLink={episode.episodeLink}
              title={`Episode ${index + 1}`}
              episodeId={episode._id}
            />
            <Link href={`/episode/${episode._id}`} onClick={() => handleEpisodeClick(episode._id)}>
              <p className="block mt-2 dark:text-neutral-400 font-semibold text-lg text-center hover:underline">
                {`View details for Episode ${index + 1}`}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEpisodes;