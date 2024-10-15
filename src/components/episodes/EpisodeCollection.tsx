import React from 'react';
import Link from 'next/link';
import { Episode } from '@/types';
import VideoPreview from './VideoPreview';

type CollectionProp = {
  episodes: Episode[]
}


const EpisodeCollection: React.FC<CollectionProp> = ({ episodes }) => {

  const handleEpisodeClick = (episodeId: string) => {
    localStorage.setItem('episodeIdToSelect', episodeId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {episodes.map((episode) => (
        <div key={episode._id} className="relative shadow-3xl pb-2 rounded-2xl">
          <VideoPreview
            videoLink={episode.episodeLink}
            title={`Episode ${episode.episodeNumber}`}
          />
          <Link href={`/episodes/${episode._id}`} onClick={() => handleEpisodeClick(episode._id)}>
            <p className="block mt-2 dark:text-neutral-400 font-semibold text-lg text-center hover:underline">
              {`View details for Episode ${episode.episodeNumber}`}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EpisodeCollection;