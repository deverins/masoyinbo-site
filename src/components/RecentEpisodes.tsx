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


const RecentEpisodes: React.FC = () => {
  const [episodeLinks, setEpisodeLinks] = useState<Stats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch recent episodes from the backend
    const fetchEpisodes = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/v1/api//get-episode-stats`);
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
    <div className="mt-16 pb-5 mx-8">
      <h2 className="text-2xl font-bold mb-4 text-secondary-dark text-center">Recent Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {episodeLinks.map((episodeLink, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe width="560" height="315"
                src="https://www.youtube.com/embed/w9ycDFt9hN0?si=OUwei86fReyrysTe"
                // src={`https://www.youtube.com/embed/${episodeLink}`}
                title={`Episode ${index + 1}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
            {/* <div className="p-4">
              <h3 className="text-lg font-semibold">{`Episode ${index + 1}`}</h3>
              <p className="text-gray-600 mt-2">{episode.description}</p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEpisodes;


// import React from 'react';

// const RecentEpisodes: React.FC = () => {
//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-bold mb-4">Recent Episodes</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg- rounded-lg shadow-lg overflow-hidden">
//           {/* Try removing aspect-w-16 aspect-h-9 if the video doesn't show */}
//           <div className="aspect-w-16 aspect-h-9">
//             <iframe
//               width="560"
//               height="315"
//               src="https://www.youtube.com/embed/6QTxKIw7TlU?si=Mnh_ADLNS9OyLhDy"
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//               className="w-full h-full"
//             ></iframe>
//           </div>
//           <div className="p-4">
//             {/* Example content */}
//             <h3 className="text-lg font-semibold">#Masoyinbo Episode Forty-Nine: Exciting Game Show Teaching Yoruba language and Culture. #Yoruba</h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentEpisodes;