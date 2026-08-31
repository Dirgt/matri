import LottieAnimation from "./LottieAnimation";

export default function Gallery() {
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

      {/* Carousel Container (Simplified for now, just flex row with overflow auto for mobile) */}
      <div className="w-full max-w-6xl mx-auto flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 hide-scrollbar">
        
        {/* Photo 1 */}
        <div className="min-w-[85vw] md:min-w-[300px] flex-1 bg-white p-3 md:p-4 shadow-md snap-center">
          <div className="aspect-[4/3] bg-gray-200 mb-4 overflow-hidden relative">
             <div 
               className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: 'url("/foto-galeria-1.jpg")' }}
             />
          </div>
          <div className="h-12 bg-white"></div>
        </div>

        {/* Photo 2 */}
        <div className="min-w-[85vw] md:min-w-[300px] flex-1 bg-white p-3 md:p-4 shadow-md snap-center">
          <div className="aspect-[4/3] bg-gray-200 mb-4 overflow-hidden relative">
             <div 
               className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: 'url("/foto-galeria-2.jpg")' }}
             />
          </div>
          <div className="h-12 bg-white"></div>
        </div>

        {/* Photo 3 */}
        <div className="min-w-[85vw] md:min-w-[300px] flex-1 bg-white p-3 md:p-4 shadow-md snap-center">
          <div className="aspect-[4/3] bg-gray-200 mb-4 overflow-hidden relative">
             <div 
               className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: 'url("/foto-galeria-3.jpg")' }}
             />
          </div>
          <div className="h-12 bg-white"></div>
        </div>

      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        <div className="w-2 h-2 rounded-full bg-[#899c8f]"></div>
        <div className="w-2 h-2 rounded-full bg-[#c2cdc7]"></div>
        <div className="w-2 h-2 rounded-full bg-[#c2cdc7]"></div>
      </div>

    </section>
  );
}
