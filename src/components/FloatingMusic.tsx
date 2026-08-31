"use client";

import { Music } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function FloatingMusic() {
  const [isPlaying, setIsPlaying] = useState(true); // intención: quiere reproducir desde el inicio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Intenta reproducir en cuanto el componente monta
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    const tryPlay = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // El navegador bloqueó el autoplay — esperamos el primer gesto del usuario
          setIsPlaying(false);
          const playOnInteraction = () => {
            audio.play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("touchstart", playOnInteraction);
            document.removeEventListener("keydown", playOnInteraction);
          };
          document.addEventListener("click", playOnInteraction, { once: true });
          document.addEventListener("touchstart", playOnInteraction, { once: true });
          document.addEventListener("keydown", playOnInteraction, { once: true });
        });
    };

    tryPlay();
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/la-boda.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMusic}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 backdrop-blur-md rounded-full text-white shadow-lg transition-all hover:scale-110 active:scale-95"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
      >
        <Music size={24} className={isPlaying ? 'animate-pulse' : 'opacity-60'} />
      </button>
    </>
  );
}
