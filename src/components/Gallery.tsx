"use client";

import { useState } from "react";
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

const PHOTOS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(photos.length / PHOTOS_PER_PAGE);

export default function Gallery() {
  const [page, setPage] = useState(0);

  const prevPage = () => setPage((p) => Math.max(0, p - 1));
  const nextPage = () => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1));

  const visiblePhotos = photos.slice(
    page * PHOTOS_PER_PAGE,
    page * PHOTOS_PER_PAGE + PHOTOS_PER_PAGE
  );

  return (
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

      {/* Gallery grid + arrows */}
      <div className="w-full max-w-6xl mx-auto relative">

        {/* Prev Arrow */}
        <button
          onClick={prevPage}
          disabled={page === 0}
          aria-label="Fotos anteriores"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-md text-[#899c8f] hover:bg-[#899c8f] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#899c8f]"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-6 md:px-8">
          {visiblePhotos.map((src, i) => (
            <div
              key={page * PHOTOS_PER_PAGE + i}
              className="bg-white p-3 md:p-4 shadow-md"
              style={{
                animation: "fadeInUp 0.4s ease both",
                animationDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="aspect-[4/3] bg-gray-200 overflow-hidden relative"
                style={{
                  backgroundImage: `url("${src}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="h-10 bg-white" />
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button
          onClick={nextPage}
          disabled={page === TOTAL_PAGES - 1}
          aria-label="Siguientes fotos"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white shadow-md text-[#899c8f] hover:bg-[#899c8f] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#899c8f]"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`Ir a página ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === page ? "bg-[#899c8f] scale-125" : "bg-[#c2cdc7] hover:bg-[#a4b3a9]"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
