export default function Footer() {
  return (
    <footer className="w-full bg-[#fcfbf9] py-16 px-8 relative overflow-hidden">
      
      {/* Top Wave (very subtle, almost straight curve) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ transform: 'translateY(-50%)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px]">
           <path d="M0,120 C300,100 900,100 1200,120 L1200,120 L0,120 Z" fill="none" stroke="#5c6e64" strokeWidth="20" opacity="0.8"></path>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 mt-8">
        
        {/* Logo */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-sans text-4xl md:text-5xl text-[#899c8f] uppercase tracking-widest font-light">Santi</span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#c1a073] text-white font-sans text-xl">
            &
          </div>
          <span className="font-sans text-4xl md:text-5xl text-[#899c8f] uppercase tracking-widest font-light">Kathe</span>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-end gap-4 text-[#899c8f] font-bold text-xs tracking-widest">
          <button className="hover:text-[#5c6e64] transition-colors">CONFIRMAR ASISTENCIA</button>
          <button className="hover:text-[#5c6e64] transition-colors">SUGERIR CANCIÓN</button>
          <button className="hover:text-[#5c6e64] transition-colors">AGENDAR FIESTA</button>
          <button className="hover:text-[#5c6e64] transition-colors">AGENDAR CEREMONIA</button>
        </div>

      </div>
    </footer>
  );
}
