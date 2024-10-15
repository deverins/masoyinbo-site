import { transformYouTubeURL } from '@/hooks/transformYouTubeURL ';
import React from 'react';

interface VideoPreviewProps {
  videoLink: string;
  title: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoLink, title }) => {
  const embedLink = `${transformYouTubeURL(videoLink)}?vq=hd1080`;

  return (
    <div className={`relative w-full rounded-lg shadow-lg overflow-hidden cursor-pointer`}>
      {/* Container with aspect ratio */}
      <div className="relative pb-[68.25%] h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedLink}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPreview;
