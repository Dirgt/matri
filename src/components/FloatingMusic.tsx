"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingMusic() {
  const [isOpen, setIsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.7;
    }
  }, []);

  const handleEnterWithMusic = () => {
    setIsOpen(false);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.7;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Audio play error:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleEnterWithoutMusic = () => {
    setIsOpen(false);
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.7;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" playsInline>
        <source src="/music/la-boda.mp3" type="audio/mpeg" />
      </audio>

      {/* Botón flotante superior derecho para pausar/reanudar */}
      <div className="fixed top-5 right-5 md:top-6 md:right-6 z-40">
        <button
          onClick={toggleMusic}
          title={isPlaying ? "Pausar música" : "Reproducir música"}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          className={`flex items-center justify-center w-11 h-11 md:w-12 md:h-12 backdrop-blur-md rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ${
            isPlaying
              ? "bg-white/20 text-white ring-2 ring-white/40 shadow-black/20"
              : "bg-[#899c8f]/90 text-white ring-2 ring-white/60 shadow-black/20"
          }`}
        >
          {isPlaying ? (
            <Music size={22} className="animate-pulse text-white" />
          ) : (
            <VolumeX size={22} className="text-white opacity-85" />
          )}
        </button>
      </div>

      {/* Modal de Bienvenida al ingresar a la invitación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#3f5046]/92 backdrop-blur-md p-4"
          >
            {/* Marca de agua decorativa de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
              <span className="font-script text-[22vw] md:text-[14vw] text-white/5 select-none whitespace-nowrap">
                Santi & Kate
              </span>
            </div>

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -10, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative max-w-lg w-full text-center text-white px-6 py-10 md:py-12 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl"
            >

              {/* Título de bienvenida */}
              <h1 className="font-sans font-light text-2xl md:text-4xl text-white tracking-wide mb-1 leading-tight drop-shadow-md">
                Bienvenidos a la invitación de
              </h1>
              <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-wide mb-6 drop-shadow-md">
                Santi y Kate
              </h2>

              {/* Divisor dorado sutil */}
              <div className="w-24 h-[1px] bg-[#d6af6c]/60 mx-auto mb-6" />

              {/* Subtítulo de la música */}
              <p className="text-white/90 text-sm md:text-base font-light italic mb-8 max-w-sm mx-auto">
                La música de fondo es parte de la experiencia
              </p>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  onClick={handleEnterWithMusic}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#c1a073] hover:bg-[#b08f62] text-white font-bold text-xs md:text-sm tracking-wider uppercase shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <Volume2 size={18} />
                  <span>INGRESAR CON MÚSICA</span>
                </button>

                <button
                  onClick={handleEnterWithoutMusic}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white/90 font-semibold text-xs md:text-sm tracking-wider uppercase border border-white/25 shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <VolumeX size={18} />
                  <span>INGRESAR SIN MÚSICA</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
