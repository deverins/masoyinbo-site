"use client";
import { API_URL } from '@/constants/api';
import { Episode } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EpisodeCollection from './EpisodeCollection';

const AllEpisodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/v1/api/episodes`);
        setEpisodes(data || []);
      } catch (err) {
        setError('Failed to fetch episodes');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (loading) {
    return <div className="loader mt-20 mx-auto ease-linear rounded-full border-4 border-t-4 h-12 w-12" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-14 pb-5 mx-8">
      <h2 className="text-2xl font-bold mb-9 dark:text-neutral-400 text-center">All Episodes</h2>
      <EpisodeCollection episodes={episodes} />
    </div>
  );
};

export default AllEpisodes;
