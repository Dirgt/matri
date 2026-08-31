"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FloralBranch from "./FloralBranch";
import LottieAnimation from "./LottieAnimation";

export default function PartyDetails() {
  const [isDressCodeOpen, setIsDressCodeOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);

  return (
    <section className="relative w-full bg-[#f7f4ed] py-24 px-4 overflow-hidden">
      
      {/* Top Gold Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0" style={{ transform: 'translateY(-98%)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] md:h-[60px]">
           <path d="M0,120 C300,0 900,240 1200,120 L1200,120 L0,120 Z" fill="none" stroke="#d6af6c" strokeWidth="2"></path>
        </svg>
      </div>

      {/* Floral Decoration Left - Scroll Animated */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ margin: "-100px", once: false }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute left-0 top-1/4 w-48 md:w-72 pointer-events-none z-0 opacity-80"
      >
        <FloralBranch className="w-full h-auto origin-left" />
      </motion.div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="font-script text-5xl md:text-7xl text-[#5c6e64] mb-2">
          Fiesta
        </h2>
        <p className="text-[#848484] text-lg">
          Hagamos juntos una fiesta épica. Aquí algunos detalles a tener en cuenta.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* Mascotas */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#fdfcf8] rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
        >
          <h3 className="text-[#c1a073] font-bold text-2xl mb-6">Mascotas</h3>
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="mb-6 h-16 w-16 flex items-center justify-center text-[#899c8f]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 opacity-80">
              <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.7.28 1.405 2 3.5a4.2 4.2 0 0 0 1.67-3.2c0-3.516 3.18-4.5 5.5-5.128Z"/>
              <path d="M14 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.7-.28 1.405-2 3.5a4.2 4.2 0 0 1-1.67-3.2c0-3.516-3.18-4.5-5.5-5.128Z"/>
              <path d="M7 19c-1.105 0-2-.895-2-2 0-2 4-7 7-7s7 5 7 7c0 1.105-.895 2-2 2s-4-2-5-2-4 2-5 2Z"/>
            </svg>
          </motion.div>
          <div className="flex-grow flex items-center justify-center min-h-[50px] mb-4">
            <p className="text-[#848484] text-sm px-2 leading-relaxed">
              Amamos mucho a los peluditos, pero por políticas del lugar y su propia comodidad, nuestra boda no será <span className="whitespace-nowrap">pet-friendly</span>. Agradecemos su comprensión.
            </p>
          </div>
        </motion.div>

        {/* Dress Code */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#fdfcf8] rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
        >
          <h3 className="text-[#c1a073] font-bold text-2xl mb-6">Dress Code</h3>
          <div className="mb-6 h-16 w-16 flex items-center justify-center">
             <LottieAnimation animationPath="/lottie/vestuario.json" className="w-full h-full" />
          </div>
          <p className="text-[#848484] text-sm mb-8 min-h-[50px] px-2 leading-relaxed">
            Una orientación para tu vestuario
          </p>
          <button 
            onClick={() => setIsDressCodeOpen(true)}
            className="w-full px-6 py-3 rounded-full border border-gray-300 bg-white text-[#899c8f] font-bold text-xs tracking-widest hover:bg-gray-50 transition-colors shadow-sm"
          >
            VER MÁS
          </button>
        </motion.div>

        {/* Tips y Notas */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#fdfcf8] rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
        >
          <h3 className="text-[#c1a073] font-bold text-2xl mb-6">Tips y Notas</h3>
          <div className="mb-6 h-16 w-16 flex items-center justify-center">
            <LottieAnimation animationPath="/lottie/tips.json" className="w-full h-full" />
          </div>
          <p className="text-[#848484] text-sm mb-8 min-h-[50px] px-2 leading-relaxed">
            Información adicional para tener en cuenta
          </p>
          <button 
            onClick={() => setIsTipsOpen(true)}
            className="w-full px-6 py-3 rounded-full border border-gray-300 bg-white text-[#899c8f] font-bold text-xs tracking-widest hover:bg-gray-50 transition-colors shadow-sm"
          >
            + INFO
          </button>
        </motion.div>

      </div>

      {/* Dress Code Modal */}
      {isDressCodeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] bg-[#fdfcf8] rounded-full shadow-2xl flex flex-col items-center justify-center p-8 animate-in zoom-in duration-300">
            
            {/* Floral Branches Behind */}
            <div className="absolute -top-10 -left-16 md:-left-24 w-48 md:w-64 h-auto -z-10 opacity-80 transform -rotate-[30deg] pointer-events-none">
              <FloralBranch className="w-full h-full" />
            </div>
            <div className="absolute -bottom-16 -right-16 md:-right-24 w-48 md:w-64 h-auto -z-10 opacity-80 transform rotate-[150deg] pointer-events-none">
              <FloralBranch className="w-full h-full" />
            </div>

            {/* Top floating icon */}
            <div className="absolute -top-6 bg-white w-24 h-24 rounded-full shadow-md flex items-center justify-center text-[#899c8f]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                <path d="M7 12l-4-4v8l4-4z"/>
                <path d="M17 12l4-4v8l-4-4z"/>
                <circle cx="12" cy="12" r="3"/>
                <path d="M9 12h6"/>
              </svg>
            </div>

            {/* Close button */}
            <button 
              onClick={() => setIsDressCodeOpen(false)}
              className="absolute top-4 right-8 w-8 h-8 flex items-center justify-center bg-[#899c8f]/80 text-white rounded-full hover:bg-[#899c8f] transition-colors"
            >
              &times;
            </button>

            <h3 className="text-[#899c8f] font-script text-4xl mb-4 mt-8">Dress Code</h3>
            <p className="text-[#5c6e64] text-center text-lg leading-relaxed px-4">
              Ponte cómodo y elegante para disfrutar de una buena tarde
            </p>
          </div>
        </div>
      )}

      {/* Tips y Notas Modal */}
      {isTipsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] bg-[#fdfcf8] rounded-full shadow-2xl flex flex-col items-center justify-center p-8 animate-in zoom-in duration-300">
            
            {/* Floral Branches Behind */}
            <div className="absolute -top-10 -left-16 md:-left-24 w-48 md:w-64 h-auto -z-10 opacity-80 transform -rotate-[30deg] pointer-events-none">
              <FloralBranch className="w-full h-full" />
            </div>
            <div className="absolute -bottom-16 -right-16 md:-right-24 w-48 md:w-64 h-auto -z-10 opacity-80 transform rotate-[150deg] pointer-events-none">
              <FloralBranch className="w-full h-full" />
            </div>

            {/* Top floating icon */}
            <div className="absolute -top-6 bg-white w-24 h-24 rounded-full shadow-md flex items-center justify-center text-[#899c8f]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <path d="M9 14l2 2 4-4"/>
              </svg>
            </div>

            {/* Close button */}
            <button 
              onClick={() => setIsTipsOpen(false)}
              className="absolute top-4 right-8 w-8 h-8 flex items-center justify-center bg-[#899c8f]/80 text-white rounded-full hover:bg-[#899c8f] transition-colors"
            >
              &times;
            </button>

            <h3 className="text-[#899c8f] font-script text-4xl mb-3 mt-6">Tips y Notas</h3>
            <ul className="text-[#5c6e64] text-left text-[15px] leading-relaxed px-2 md:px-4 space-y-3">
              <li className="flex items-start">
                <span className="text-[#c1a073] mr-2 text-lg leading-none mt-1">•</span>
                <span>¡Llega temprano! Podrás disfrutar del lugar desde las <strong>10:00 a.m.</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c1a073] mr-2 text-lg leading-none mt-1">•</span>
                <span>Te recomendamos traer <strong>bloqueador y repelente</strong> para que estés súper cómodo.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#c1a073] mr-2 text-lg leading-none mt-1">•</span>
                <span>¡Separa tu <strong>domingo y lunes</strong> para acompañarnos a celebrar a lo grande!</span>
              </li>
            </ul>
          </div>
        </div>
      )}

    </section>
  );
}
