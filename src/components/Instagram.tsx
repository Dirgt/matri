export default function Instagram() {
  return (
    <section className="relative w-full min-h-[520px] py-16 flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/instagram.webp")',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Top Gold Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10" style={{ transform: 'translateY(-50%)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] md:h-[60px]">
           <path d="M0,120 C300,0 900,240 1200,120 L1200,120 L0,120 Z" fill="none" stroke="#d6af6c" strokeWidth="1.5" opacity="0.7"></path>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-2xl mx-auto">
        
        <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-2 drop-shadow-md">
          Compartimos este día junto a vos
        </h2>
        
        <p className="text-white/90 mb-6 text-sm md:text-base font-light">
          Compartí tus fotos y videos de ese hermoso día
        </p>

        {/* Google Photos Icon Link */}
        <a 
          href="https://photos.app.goo.gl/5VfqvCk7d8Zwe8Xo7"
          target="_blank"
          rel="noopener noreferrer"
          title="Subir fotos al álbum de Google Fotos"
          aria-label="Subir fotos al álbum de Google Fotos"
          className="mb-4 p-3.5 md:p-4 rounded-2xl bg-white/95 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12 group-hover:rotate-12 transition-transform duration-300" fill="none">
            {/* Red - Top */}
            <path d="M12 12V2.5A4.75 4.75 0 0 0 12 12Z" fill="#EA4335" />
            {/* Yellow - Right */}
            <path d="M12 12H21.5A4.75 4.75 0 0 0 12 12Z" fill="#FBBC04" />
            {/* Green - Bottom */}
            <path d="M12 12V21.5A4.75 4.75 0 0 0 12 12Z" fill="#34A853" />
            {/* Blue - Left */}
            <path d="M12 12H2.5A4.75 4.75 0 0 0 12 12Z" fill="#4285F4" />
          </svg>
        </a>

        <h3 className="font-script text-4xl md:text-5xl mb-4 drop-shadow-sm">
          #santiykate
        </h3>

        {/* Mensaje cordial para invitar a subir las fotos */}
        <p className="text-white/95 text-sm md:text-base font-light mb-8 max-w-md mx-auto leading-relaxed drop-shadow">
          ¡Queremos revivir cada instante a través de tus ojos! Recordá subir aquí todas las fotos y videos que tomes durante la boda para que formen parte de nuestro álbum de recuerdos.
        </p>

        <a
          href="https://photos.app.goo.gl/5VfqvCk7d8Zwe8Xo7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#5c6e64] font-bold text-xs tracking-widest hover:bg-gray-100 hover:text-[#45544d] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M12 12V2.5A4.75 4.75 0 0 0 12 12Z" fill="#EA4335" />
            <path d="M12 12H21.5A4.75 4.75 0 0 0 12 12Z" fill="#FBBC04" />
            <path d="M12 12V21.5A4.75 4.75 0 0 0 12 12Z" fill="#34A853" />
            <path d="M12 12H2.5A4.75 4.75 0 0 0 12 12Z" fill="#4285F4" />
          </svg>
          SUBIR FOTOS AL ÁLBUM
        </a>

      </div>
    </section>
  );
}

