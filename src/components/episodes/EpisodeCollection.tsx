import React from 'react';
import Link from 'next/link';
import { Episode } from '@/types';
import VideoPreview from './VideoPreview';

type CollectionProp = {
  episodes: Episode[];
};

const EpisodeCollection: React.FC<CollectionProp> = ({ episodes }) => {
  // Sort episodes by episodeNumber in descending order (most recent first)
  const sortedEpisodes = [...episodes].sort((a, b) => b.episodeNumber - a.episodeNumber);

  const handleEpisodeClick = (episodeId: string) => {
    localStorage.setItem('episodeIdToSelect', episodeId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {sortedEpisodes.map((episode) => {
        const episodeId = episode._id;
        if (episodeId) {
          return (
            <div key={episodeId} className="relative shadow-3xl pb-2 rounded-2xl">
              <VideoPreview
                videoLink={episode.episodeLink}
                title={`Episode ${episode.episodeNumber}`}
              />
              <Link href={`/episodes/${episodeId}`} onClick={() => handleEpisodeClick(episodeId)}>
                <p className="block mt-2 dark:text-neutral-400 font-semibold text-lg text-center hover:underline">
                  {`View details for Episode ${episode.episodeNumber}`}
                </p>
              </Link>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default EpisodeCollection;
