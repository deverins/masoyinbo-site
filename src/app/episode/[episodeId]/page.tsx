"use client";
import EpisodeEventDetails from '@/components/EpisodeEventDetails';
import { EpisodeEvent } from '@/types';
import React from 'react';

interface EpisodePageProps {
  params: {
    episodeId: string;
  };
}

const EpisodePage: React.FC<EpisodePageProps> = ({ params }) => {
  const { episodeId } = params;
  if (!episodeId) {
    return <div className="loader mt-20 mx-auto ease-linear rounded-full border-4 border-t-4 h-12 w-12" />;
  }

  return (
    <div>
      <EpisodeEventDetails
        episodeId={episodeId}
        EpisodeEvent={[]}
        updateEvents={function (updatedEvents: EpisodeEvent[]): void {
          throw new Error('Function not implemented.');
        }}
        eventId={''}
      />
    </div>
  );
};

export default EpisodePage;
