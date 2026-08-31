import LottieAnimation from "./LottieAnimation";

export default function Instagram() {
  return (
    <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/instagram.webp")',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Top Gold Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10" style={{ transform: 'translateY(-50%)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] md:h-[60px]">
           <path d="M0,120 C300,0 900,240 1200,120 L1200,120 L0,120 Z" fill="none" stroke="#d6af6c" strokeWidth="1.5" opacity="0.7"></path>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4">
        
        <h2 className="font-script text-4xl md:text-5xl lg:text-6xl mb-2">
          Compartimos este día junto a vos
        </h2>
        
        <p className="text-white/90 mb-10 text-sm md:text-base font-light">
          Compartí tus fotos y videos de ese hermoso día
        </p>

        <div className="mb-6 rounded-xl flex justify-center items-center">
          <LottieAnimation animationPath="/lottie/img_instagram.json" className="w-20 h-20" />
        </div>

        <h3 className="font-script text-5xl md:text-6xl mb-10">
          #santiykate
        </h3>

        <button className="px-8 py-3 rounded-full bg-white text-[#899c8f] font-bold text-xs tracking-widest hover:bg-gray-100 transition-colors shadow-sm">
          VER EN INSTAGRAM
        </button>

      </div>
    </section>
  );
}
