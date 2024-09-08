"use client"
import { API_URL } from '@/constants/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Stats {
  id: string;
  title: string;
  description: string;
  date: string;
  episodeLink: string;
}

const AllEpisodes: React.FC = () => {
  const [episodeLinks, setEpisodeLinks] = useState<Stats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch recent episodes from the backend
    const fetchEpisodes = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/v1/api/get-episode-stats`);
        setEpisodeLinks(data.stats.episodeLinks || []);
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
      <h2 className="text-2xl font-bold mb-9 text-secondary-dark text-center">All Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300">
        {episodeLinks.map((episodeLink, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="560"
                height="315"
                src={`${episodeLink}`}
                title={episodeLink.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEpisodes;
