import { API_URL } from '@/constants/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Stats {
  id: string;
  title: string;
  description: string;
  date: string;
  episodeLink: string;
}


const RecentEpisodes: React.FC = () => {
  const [episodeLinks, setEpisodeLinks] = useState<Stats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    return toast.error(error)
  }

  return (
    <div className="mt-16 pb-5 mx-8">
      <h2 className="text-2xl font-bold mb-4 text-secondary-dark text-center">Recent Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {episodeLinks.map((episodeLink, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe width="560" height="315"
                src={`${episodeLink}`}
                title={`Episode ${index + 1}`} frameBorder="0" allowFullScreen></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEpisodes;