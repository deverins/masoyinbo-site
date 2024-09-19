import { transformYouTubeURL } from '@/hooks/transformYouTubeURL ';
import React, { useState, useRef, useEffect } from 'react';

interface VideoPreviewProps {
  videoLink: string;
  title: string;
  episodeId: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoLink, title, episodeId }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const embedLink = transformYouTubeURL(videoLink);

  return (
    <>
      {/* Video Preview Card */}
      <div
        className="relative group rounded-lg shadow-lg overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            width="600"
            height="315"
            src={embedLink}
            title={title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xl font-bold">{title}</span>
        </div>

        {/* Small preview card on hover */}
        {isHovered && (
          <div className="absolute bottom-0 right-0 p-2 bg-gray-800 text-white text-sm rounded-md">
            Click to preview
          </div>
        )}
      </div>

      {/* Modal to play the selected video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-primary-light bg-opacity-75 flex items-center justify-center z-50">
          <div
            className="relative bg-primary-dark rounded-lg shadow-lg p-4 w-full max-w-4xl mx-2 sm:mx-6 md:mx-6 lg:mx-8"
            ref={modalRef}
          >
            <button
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <iframe
              width="100%"
              height="400"
              src={embedLink}
              title="Selected Episode"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPreview;
