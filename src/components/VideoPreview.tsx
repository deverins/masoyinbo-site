import { transformYouTubeURL } from '@/hooks/transformYouTubeURL ';
import React from 'react';

interface VideoPreviewProps {
  videoLink: string;
  title: string;
  episodeId: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoLink, title }) => {
  const embedLink = transformYouTubeURL(videoLink);

  return (
    <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer">
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
    </div>
  );
};

export default VideoPreview;
