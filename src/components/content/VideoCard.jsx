import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoCard = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    // Helper to generate thumbnail (YouTube only for now, can extend)
    const getThumbnail = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
            {!isPlaying ? (
                <div
                    className="relative aspect-video group cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                >
                    <img
                        src={getThumbnail(video.embedId)}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-all"
                        >
                            <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                        </motion.div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs font-bold text-white mb-2">
                            {video.duration}
                        </span>
                        <h3 className="text-white font-bold text-lg leading-tight shadow-black drop-shadow-md">
                            {video.title}
                        </h3>
                    </div>
                </div>
            ) : (
                <div className="aspect-video">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default VideoCard;
