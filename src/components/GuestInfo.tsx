import LottieAnimation from "./LottieAnimation";

interface GuestInfoProps {
  passes?: number;
  names?: string[];
}

export default function GuestInfo({ passes = 2, names = ["Lola Pérez", "Tomás Pérez"] }: GuestInfoProps) {
  return (
    <section className="relative w-full pt-20 pb-4 flex flex-col items-center overflow-hidden" id="guest-info">

      {/* Background Gold Waves (CSS approximation) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-center">
        <svg viewBox="0 0 1000 200" className="w-full h-auto min-w-[1000px]">
          <path d="M 0 100 Q 250 50 500 100 T 1000 100" fill="none" stroke="#d6af6c" strokeWidth="1" />
          <path d="M 0 120 Q 250 170 500 120 T 1000 120" fill="none" stroke="#d6af6c" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Badge */}
        <div className="w-12 h-12 bg-[#5c6e64] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-md">
          {passes}
        </div>

        <div className="font-sans text-[#5c6e64] text-xl md:text-2xl tracking-widest uppercase mb-8 font-semibold">
          {passes === 1 ? "Invitado" : "Invitados"}
        </div>

        <div className="flex flex-col gap-2 mb-10">
          {names.map((name, idx) => (
            <div key={idx} className="bg-[#eeebe5] px-6 py-2 rounded-sm text-[#5c6e64] text-lg">
              {name}
            </div>
          ))}
        </div>

        <p className="text-[#848484] text-sm md:text-base max-w-md">
          Nos encanta compartir este momento con vos. ¡Te esperamos!
        </p>
      </div>

      {/* Floating Icons */}
      <div className="relative w-full max-w-4xl mx-auto mt-8 h-32 flex justify-between px-10 md:px-32">
        {/* Ceremonia Lottie Icon */}
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center z-10 overflow-hidden">
          <LottieAnimation animationPath="/lottie/img_ceremonia.json" className="w-[80%] h-[80%]" />
        </div>

        {/* Fiesta Lottie Icon */}
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center z-10 overflow-hidden">
          <LottieAnimation animationPath="/lottie/img_fiesta.json" className="w-[80%] h-[80%]" />
        </div>
      </div>
    </section>
  );
}
