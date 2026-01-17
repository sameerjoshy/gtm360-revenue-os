import React, { useState } from 'react';
import { Play } from 'lucide-react';

const VideoEmbed = ({ videoId, title, poster }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    if (isPlaying) {
        return (
            <div className="relative pb-[56.25%] h-0 rounded-sm overflow-hidden bg-black shadow-2xl">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                />
            </div>
        );
    }

    return (
        <div
            className="relative pb-[56.25%] h-0 rounded-sm overflow-hidden bg-slate-900 shadow-2xl group cursor-pointer border border-slate-700 hover:border-[var(--color-primary)] transition-colors"
            onClick={() => setIsPlaying(true)}
        >
            {/* Poster Image or Gradient Fallback */}
            {poster ? (
                <img
                    src={poster}
                    alt={title}
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
            ) : (
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900"></div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--color-primary)] rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-current" />
                </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-4 left-4 right-4 text-center md:text-left">
                <span className="inline-block px-2 py-1 bg-black/60 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm rounded-sm">
                    Watch Video
                </span>
            </div>
        </div>
    );
};

export default VideoEmbed;
