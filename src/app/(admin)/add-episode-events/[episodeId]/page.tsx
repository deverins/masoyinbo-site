"use client";
import EpisodeEventsForm from '@/components/EpisodeEventForm';
import React, { useEffect } from 'react';

interface EpisodePageProps {
  params: {
    episodeId: string;
  };
}

const EpisodePage: React.FC<EpisodePageProps> = ({ params }) => {
  const { episodeId } = params;
  console.log('Episode ID:', episodeId);
  if (!episodeId) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    localStorage.setItem('paramsEpisodeId', episodeId);
  }, [episodeId]);

  return (
    <>
      <EpisodeEventsForm episodeId={episodeId} />
    </>
  );
};

export default EpisodePage;
