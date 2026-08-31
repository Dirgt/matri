"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LottieAnimation from "./LottieAnimation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  "/foto-galeria-1.jpg",
  "/foto-galeria-2.jpg",
  "/foto-galeria-3.jpg",
  "/foto-galeria-4.jpg",
  "/foto-galeria-5.jpg",
  "/foto-galeria-6.jpg",
];

// Rotaciones fijas tipo polaroid esparcidas
const rotations = [-2.5, 1.2, -1.8, 2.1, -0.9, 1.6];

const PHOTOS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(photos.length / PHOTOS_PER_PAGE);
const AUTO_ADVANCE_MS = 5000;

export default function Gallery() {
  const [page, setPage]         = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [expanded, setExpanded] = useState<number | null>(null); // índice global de foto ampliada
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (target: number, dir?: number) => {
    setDirection(dir ?? (target > page ? 1 : -1));
    setPage(target);
    resetTimer();
  };

  const prevPage = () => page > 0             && goTo(page - 1, -1);
  const nextPage = () => page < TOTAL_PAGES - 1 && goTo(page + 1,  1);

  const resetTimer = () => {
    if (timerRef.current)    clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
    startTimer();
  };

  const startTimer = () => {
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / AUTO_ADVANCE_MS) * 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      setDirection(1);
      setPage((p) => (p + 1) % TOTAL_PAGES);
      setProgress(0);
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current)    clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const visiblePhotos = photos.slice(
    page * PHOTOS_PER_PAGE,
    page * PHOTOS_PER_PAGE + PHOTOS_PER_PAGE
  );

  const slideVariants = {
    enter:  (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <>
      <section className="w-full bg-[#eeeae3] pb-24 flex flex-col items-center overflow-hidden px-4">

        <div className="text-center mb-10">
          <h2 className="font-script text-5xl md:text-6xl text-[#5c6e64] mb-2">
            Retratos de Nuestro Amor
          </h2>
          <p className="text-[#848484] mb-6">
            Un minuto, un segundo, un instante que queda en la eternidad
          </p>
          <div className="flex justify-center">
            <LottieAnimation animationPath="/lottie/json_camara.json" className="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </div>

        {/* Barra de progreso auto-avance */}
        <div className="w-full max-w-6xl mx-auto mb-4 px-8 md:px-12">
          <div className="h-0.5 bg-[#d6c9b9] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#899c8f] transition-none rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Counter */}
        <p className="text-xs text-[#a0a0a0] mb-6 tracking-widest uppercase">
          {page + 1} / {TOTAL_PAGES}
        </p>

        {/* Gallery + arrows */}
        <div className="w-full max-w-6xl mx-auto relative">

          {/* Prev Arrow */}
          <button
            onClick={prevPage}
            disabled={page === 0}
            aria-label="Fotos anteriores"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#899c8f] hover:bg-[#899c8f] hover:text-white hover:scale-110 transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#899c8f] disabled:hover:scale-100"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Animated Photo Grid */}
          <div className="overflow-hidden px-6 md:px-10">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
              >
                {visiblePhotos.map((src, i) => {
                  const globalIdx = page * PHOTOS_PER_PAGE + i;
                  const rot       = rotations[globalIdx] ?? 0;
                  const isFeatured = i === 1; // centro = destacada
                  return (
                    <motion.div
                      key={globalIdx}
                      initial={{ opacity: 0, y: 30, rotate: rot - 2 }}
                      animate={{ opacity: 1, y: 0, rotate: rot }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                      whileHover={{
                        scale: 1.06,
                        rotate: 0,
                        zIndex: 20,
                        boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
                        transition: { duration: 0.25 },
                      }}
                      onClick={() => setExpanded(globalIdx)}
                      className="bg-white shadow-md cursor-pointer relative p-2 md:p-3"
                      style={{ transformOrigin: "center bottom" }}
                    >
                      <div
                        className="bg-gray-200 overflow-hidden relative aspect-square"
                        style={{
                          backgroundImage: `url("${src}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="h-6 bg-white flex items-center justify-center">
                        <span className="font-script text-[#c1a073] text-xs opacity-60">
                          #santiykate
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextPage}
            disabled={page === TOTAL_PAGES - 1}
            aria-label="Siguientes fotos"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-[#899c8f] hover:bg-[#899c8f] hover:text-white hover:scale-110 transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#899c8f] disabled:hover:scale-100"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a página ${i + 1}`}
              className={`rounded-full transition-all duration-400 ${
                i === page
                  ? "w-7 h-2.5 bg-[#899c8f]"
                  : "w-2.5 h-2.5 bg-[#c2cdc7] hover:bg-[#a4b3a9] hover:scale-125"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative bg-white p-3 shadow-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="aspect-[4/3] w-full"
                style={{
                  backgroundImage: `url("${photos[expanded]}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="flex items-center justify-between px-2 pt-3 pb-1">
                <span className="font-script text-[#c1a073] text-lg">#santiykate</span>
                <button
                  onClick={() => setExpanded(null)}
                  className="text-[#848484] hover:text-[#5c6e64] text-sm tracking-widest uppercase transition-colors"
                >
                  cerrar ✕
                </button>
              </div>
            </motion.div>

            {/* Flechas dentro del lightbox */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
              onClick={(e) => { e.stopPropagation(); setExpanded((v) => v !== null && v > 0 ? v - 1 : v); }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors"
              onClick={(e) => { e.stopPropagation(); setExpanded((v) => v !== null && v < photos.length - 1 ? v + 1 : v); }}
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
