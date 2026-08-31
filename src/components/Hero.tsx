"use client";

import { motion } from "framer-motion";
import LottieAnimation from "./LottieAnimation";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[3px] scale-105"
        style={{
          backgroundImage: 'url("/portada-3.webp")',
        }}
      />

      {/* Subtle Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 w-full">

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 md:w-20 h-[1px] bg-white/70"></div>
          <span className="text-lg md:text-xl tracking-widest font-light">25.10.2026</span>
          <div className="w-12 md:w-20 h-[1px] bg-white/70"></div>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-row items-center justify-center gap-4 md:gap-8 mb-12 relative w-full"
        >
          <div className="font-script text-6xl md:text-8xl leading-none drop-shadow-lg text-center capitalize">Santi</div>

          <div className="flex flex-col justify-center items-center mt-2 md:mt-4">
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-[#c2cdc7] rounded-full text-white font-sans text-xl md:text-3xl shadow-lg z-10">
              &
            </div>
          </div>

          <div className="font-script text-6xl md:text-8xl leading-none drop-shadow-lg text-center capitalize">Kate</div>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{ duration: 1, delay: 1 }}
          className="h-[1px] bg-white/40 max-w-xl mx-auto mb-16"
        />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="max-w-4xl mx-auto flex flex-col items-center relative px-4"
        >
          <span className="text-6xl md:text-7xl font-script leading-none text-white font-bold drop-shadow-md -mb-8 md:-mb-10 relative z-0">“</span>
          <p className="text-lg md:text-2xl font-light drop-shadow-md leading-relaxed px-4 md:px-12 text-center z-10 mb-3">
            Más valen dos que uno, porque obtienen más fruto de su esfuerzo. Si caen, el uno levanta al otro. ¡Ay del que cae y no tiene quien lo levante!
          </p>
          <p className="text-base md:text-xl font-medium drop-shadow-md italic text-[#d6af6c] z-10 mb-2">
            Eclesiastés 4:9-10
          </p>
          <span className="text-6xl md:text-7xl font-script leading-none text-white font-bold drop-shadow-md -mt-2">”</span>
        </motion.div>

      </div>

      {/* Floral decorations */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: -50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 left-0 w-48 md:w-80 h-48 md:h-80 pointer-events-none drop-shadow-2xl z-20"
      >
        <LottieAnimation animationPath="/lottie/json_hojas01.json" className="w-full h-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-0 right-0 w-48 md:w-80 h-48 md:h-80 pointer-events-none drop-shadow-2xl z-20 transform rotate-180"
      >
        <LottieAnimation animationPath="/lottie/json_hojas01.json" className="w-full h-full" />
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-12 h-12 flex justify-center items-center"
      >
        <LottieAnimation animationPath="/lottie/down-scroll.json" className="w-full h-full" />
      </motion.div>

    </section>
  );
}
