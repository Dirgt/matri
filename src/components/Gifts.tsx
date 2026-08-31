import LottieAnimation from "./LottieAnimation";

export default function Gifts() {
  return (
    <section className="relative w-full bg-[#f7f4ed] pb-24 overflow-hidden">
      
      {/* Top Wave Background */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0" style={{ transform: 'translateY(-20%)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[120px]">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#a4b3a9" opacity=".5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#899c8f"></path>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32">
        
        <div className="mb-4">
          <svg className="w-16 h-16 text-[#c1a073]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 className="font-script text-5xl md:text-6xl text-[#5c6e64] mb-4">
          Lluvia de Sobres
        </h2>
        
        <p className="text-[#848484] mb-8 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          El mejor regalo que nos puedes dar es tu presencia en este día tan especial. <br/><br/>
          Pero si deseas tener un detalle adicional con nosotros, contaremos con un buzón para lluvia de sobres en el lugar de la recepción.
        </p>

      </div>

    </section>
  );
}
