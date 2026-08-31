"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import LottieAnimation from "@/components/LottieAnimation";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    hs: 0,
    min: 0,
    seg: 0,
  });
  const [mounted, setMounted] = useState(false);

  const targetDate = new Date('2026-10-25T16:00:00').getTime(); // October 25, 2026 at 16:00 (4 PM)

  useEffect(() => {
    setMounted(true);
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hs: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-transparent pb-24 pt-24 md:pt-32 flex flex-col items-center">

      {/* Top Wave Divider - Layered perfectly */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-30" style={{ transform: 'translateY(-98%)' }}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="relative block w-full h-[100px] md:h-[240px]">
          {/* Light Green Back Hill */}
          <path d="M0,320 L0,180 C200,120 400,160 600,320 Z" fill="#a4b5aa" opacity="0.6" />

          {/* Dark Green Front Hill (Left) */}
          <path d="M0,320 L0,160 C150,100 350,150 550,320 Z" fill="#849b8d" opacity="0.95" />

          {/* Main Cream Background Wave (Sweeping Right) */}
          <path d="M0,320 L0,280 C300,340 500,120 1050,100 C1250,90 1380,140 1440,160 L1440,320 Z" fill="#f7f4ed" />
        </svg>
      </div>

      <div className="relative flex justify-center mt-4 md:mt-8 w-full px-4">
        {/* Container for circle and wreath */}
        <div className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px] flex items-center justify-center max-w-full">
          
          {/* Gold Geometric Lines - Full Rhombus */}
          <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] z-0 pointer-events-none opacity-60">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Outer shape */}
              <path d="M100 5 L195 50 L195 150 L100 195 L5 150 L5 50 Z" stroke="#D4AF37" strokeWidth="0.4" />
              {/* Inner Diamond */}
              <path d="M100 15 L185 100 L100 185 L15 100 Z" stroke="#D4AF37" strokeWidth="0.3" />
              {/* Asymmetric intersecting lines for that modern look */}
              <path d="M40 15 L190 120 L140 190 L10 110 Z" stroke="#D4AF37" strokeWidth="0.5" />
              <path d="M160 15 L10 120 L60 190 L190 110 Z" stroke="#D4AF37" strokeWidth="0.3" />
            </svg>
          </div>

          {/* Left Branch framing the countdown */}
          <div 
            className="absolute left-[-40%] md:left-[-50%] top-[-10%] w-[120%] h-[120%] z-0 pointer-events-none"
            style={{ transform: 'rotate(-20deg)' }}
          >
            <LottieAnimation animationPath="/lottie/json_hojas03.json" className="w-full h-full" />
          </div>

          {/* Right Branch framing the countdown */}
          <div 
            className="absolute right-[-40%] md:right-[-50%] top-[-10%] w-[120%] h-[120%] z-0 pointer-events-none"
            style={{ transform: 'rotate(20deg) scaleX(-1)' }}
          >
            <LottieAnimation animationPath="/lottie/json_hojas04.json" className="w-full h-full" />
          </div>

          {/* White Circle Box with Deep Shadow */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-white rounded-full flex flex-col items-center justify-center z-10 w-[280px] h-[280px] md:w-[350px] md:h-[350px]"
            style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.15)' }}
          >
            <h2 className="text-[#c1a073] text-[2.2rem] md:text-[2.75rem] mb-2 md:mb-4 font-light mt-2 font-sans tracking-wide">Falta</h2>

            {mounted && (
              <div className="flex items-start justify-center gap-2 md:gap-4 mb-2 md:mb-4 w-full px-4 md:px-8">
                <div className="flex flex-col items-center flex-1">
                  <span className="text-[2.2rem] md:text-[2.75rem] font-bold text-[#5c6e64] tabular-nums tracking-tighter leading-none">{timeLeft.dias}</span>
                  <span className="text-[10px] md:text-sm text-[#c1a073] font-light mt-2 uppercase tracking-widest">días</span>
                </div>
                <div className="w-[1px] h-10 md:h-12 bg-gray-200 mt-1 md:mt-2"></div>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-[2.2rem] md:text-[2.75rem] font-bold text-[#5c6e64] tabular-nums tracking-tighter leading-none">{timeLeft.hs}</span>
                  <span className="text-[10px] md:text-sm text-[#c1a073] font-light mt-2 uppercase tracking-widest">hs</span>
                </div>
                <div className="w-[1px] h-10 md:h-12 bg-gray-200 mt-1 md:mt-2"></div>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-[2.2rem] md:text-[2.75rem] font-bold text-[#5c6e64] tabular-nums tracking-tighter leading-none">{timeLeft.min}</span>
                  <span className="text-[10px] md:text-sm text-[#c1a073] font-light mt-2 uppercase tracking-widest">min</span>
                </div>
                <div className="w-[1px] h-10 md:h-12 bg-gray-200 mt-1 md:mt-2"></div>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-[2.2rem] md:text-[2.75rem] font-bold text-[#5c6e64] tabular-nums tracking-tighter leading-none">{timeLeft.seg}</span>
                  <span className="text-[10px] md:text-sm text-[#c1a073] font-light mt-2 uppercase tracking-widest">seg</span>
                </div>
              </div>
            )}

            <LottieAnimation animationPath="/lottie/corazon.json" className="w-12 h-12 mt-2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
