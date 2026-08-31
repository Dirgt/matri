"use client";

import { motion } from "framer-motion";
import FloralBranch from "./FloralBranch";

export default function EventDetails() {
  return (
    <section className="relative w-full bg-transparent pt-10 pb-24 overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">

        {/* Ceremonia */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          {/* Ribbon Header with Notch */}
          <div className="relative bg-[#899c8f] w-[280px] h-16 flex items-center justify-center mb-10 shadow-sm">
            <h3 className="font-script text-[2.5rem] text-white pt-2">Ceremonia</h3>
            {/* Left Notch */}
            <div className="absolute top-0 -left-6 w-0 h-0 border-y-[32px] border-y-[#899c8f] border-l-[24px] border-l-transparent"></div>
            {/* Right Notch */}
            <div className="absolute top-0 -right-6 w-0 h-0 border-y-[32px] border-y-[#899c8f] border-r-[24px] border-r-transparent"></div>
          </div>

          <div className="mb-8">
            <h4 className="text-[#899c8f] font-bold text-xl mb-2">Día</h4>
            <p className="text-[#848484] text-[1.1rem]">Domingo 25 de octubre - 15 hs</p>
          </div>

          <div>
            <h4 className="text-[#899c8f] font-bold text-xl mb-2">Lugar</h4>
            <p className="text-[#848484] mb-1 text-[1.1rem]">Mirador del Olimpo</p>
            <p className="text-[#848484] mb-4 text-[1.1rem]">Chinauta</p>
            <a 
              href="https://google.com/maps?sca_esv=2b9577dc054dfb30&rlz=1C1CHBF_esCO1223CO1223&output=search&q=mirador+del+olimpo+chinauta&source=lnms&fbs=ABfTbFUDadgeu2mn4mYJ8iEZ1GUDd8ABuXxNzQEi57SWOuuPdWieN_sFFlVnsqgdADYGYES3Nyw9LbisFrBpPug7AZD4hyOueMP2i0vSKcC5mXU-X6HbKpHjq7XgHRHNq-5MVoG5lULEArvgcS58jOD2_JsEajROBVla2-8wR3J1KPwjoyhxVbsnL0rkoXzjK-DANSfDrESUasYqm0wKSaBr7u-P7YcbUA&entry=mc&ved=1t:200715&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-[0.6rem] rounded-full border border-gray-300 bg-white text-[#899c8f] font-bold text-xs tracking-[0.2em] hover:bg-gray-50 transition-colors shadow-sm"
            >
              ¿CÓMO LLEGAR?
            </a>
          </div>
        </motion.div>

        {/* Fiesta */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          {/* Ribbon Header with Notch */}
          <div className="relative bg-[#899c8f] w-[280px] h-16 flex items-center justify-center mb-10 shadow-sm">
            <h3 className="font-script text-[2.5rem] text-white pt-2">Recepción</h3>
            {/* Left Notch */}
            <div className="absolute top-0 -left-6 w-0 h-0 border-y-[32px] border-y-[#899c8f] border-l-[24px] border-l-transparent"></div>
            {/* Right Notch */}
            <div className="absolute top-0 -right-6 w-0 h-0 border-y-[32px] border-y-[#899c8f] border-r-[24px] border-r-transparent"></div>
          </div>

          <div className="mb-8">
            <h4 className="text-[#899c8f] font-bold text-xl mb-2">Día</h4>
            <p className="text-[#848484] text-[1.1rem]">Domingo 25 de octubre - 17 hs</p>
          </div>

          <div>
            <h4 className="text-[#899c8f] font-bold text-xl mb-2">Lugar</h4>
            <p className="text-[#848484] mb-1 text-[1.1rem]">Mirador del Olimpo</p>
            <p className="text-[#848484] mb-4 text-[1.1rem]">Chinauta</p>
            <a 
              href="https://google.com/maps?sca_esv=2b9577dc054dfb30&rlz=1C1CHBF_esCO1223CO1223&output=search&q=mirador+del+olimpo+chinauta&source=lnms&fbs=ABfTbFUDadgeu2mn4mYJ8iEZ1GUDd8ABuXxNzQEi57SWOuuPdWieN_sFFlVnsqgdADYGYES3Nyw9LbisFrBpPug7AZD4hyOueMP2i0vSKcC5mXU-X6HbKpHjq7XgHRHNq-5MVoG5lULEArvgcS58jOD2_JsEajROBVla2-8wR3J1KPwjoyhxVbsnL0rkoXzjK-DANSfDrESUasYqm0wKSaBr7u-P7YcbUA&entry=mc&ved=1t:200715&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-[0.6rem] rounded-full border border-gray-300 bg-white text-[#899c8f] font-bold text-xs tracking-[0.2em] hover:bg-gray-50 transition-colors shadow-sm text-center"
            >
              ¿CÓMO LLEGAR?
            </a>
          </div>
        </motion.div>

      </div>

      {/* Bottom Wave Background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0" style={{ transform: 'translateY(5px)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" fill="#a4b3a9" opacity=".5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V120H0Z" fill="#899c8f"></path>
        </svg>
      </div>

    </section>
  );
}
