// components/RecentEpisodes.tsx
import React, { useEffect, useState } from 'react';

interface Episode {
  id: string;
  title: string;
  description: string;
  date: string;
  episodeLink: string;
}


const RecentEpisodes: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch recent episodes from the backend
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('/api/recent-episodes');
        const data: Episode[] = await response.json();
        setEpisodes(data);
      } catch (err) {
        setError('Failed to fetch episodes');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (loading) {
    return <div className="loader mx-auto ease-linear rounded-full border-4 border-t-4 h-12 w-12" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recent Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {episodes.map((episode) => (
          <div key={episode.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${episode.episodeLink}`}
                title={episode.title}
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{episode.title}</h3>
              <p className="text-gray-600 mt-2">{episode.description}</p>
              <p className="text-gray-500 text-sm mt-4">{new Date(episode.date).toLocaleDateString()}</p>
            </div>
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