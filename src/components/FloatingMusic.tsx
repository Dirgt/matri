"use client";

import { Music } from "lucide-react";
import { useState, useRef } from "react";

export default function FloatingMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/la-boda.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
      >
        <Music size={24} className={isPlaying ? 'animate-pulse' : ''} />
      </button>
    </>
  );
}
