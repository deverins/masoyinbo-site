import EpisodePage from '@/components/episodes/EpisodePage';
import { getEpisodeById } from '@/constants/episode';
import React from 'react';
export async function generateMetadata({ params }: { params: { episodeId: string } }) {
  const { episodeId } = params;

  try {
    const episode = await getEpisodeById(episodeId);
    return {
      title: `Episodes ${episode.episodeNumber} | ${episode._id}`,
      description: `Details about episode ${episode.episodeNumber}.`,
    };
  } catch (error) {
    console.error('Failed to fetch episode metadata:', error);
    return {
      title: 'Episodes',
      description: 'This is the episode page.',
    };
  }
}

const Page = () => {
  return <EpisodePage />;
};

export default Page;
