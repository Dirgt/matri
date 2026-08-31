import FloatingMusic from "@/components/FloatingMusic";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import GuestInfo from "@/components/GuestInfo";
import EventDetails from "@/components/EventDetails";
import RSVP from "@/components/RSVP";
import Gallery from "@/components/Gallery";
import PartyDetails from "@/components/PartyDetails";
import Gifts from "@/components/Gifts";
import Instagram from "@/components/Instagram";
import { supabase } from "@/utils/supabase";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const id = searchParams.id as string | undefined;

  let guestNames = ["Lola Pérez", "Tomás Pérez"]; // Default fallback
  let passes = 2; // Default fallback
  let showGuestInfo = true;

  if (id) {
    const { data, error } = await supabase
      .from('guests')
      .select('guest_names, passes')
      .eq('url_id', id)
      .single();
      
    if (data && !error) {
      guestNames = Array.isArray(data.guest_names) ? data.guest_names : [data.guest_names];
      passes = data.passes || 1;
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <FloatingMusic />
      
      <Hero />
      
      <div className="relative bg-[#f7f4ed] w-full overflow-x-hidden">
        
        {/* Massive Gold Wavy Background spanning the sections */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-80 flex justify-center overflow-hidden">
          <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" className="absolute top-[10%] w-full h-[1200px] min-w-[1200px]">
            {/* Upper thin curve */}
            <path d="M-100,200 C300,300 500,100 800,250 S1200,150 1540,300" fill="none" stroke="#d6af6c" strokeWidth="0.5" opacity="0.7" />
            
            {/* Main crossing curves - middle */}
            <path d="M-100,450 C200,350 450,400 700,550 S1100,450 1540,600" fill="none" stroke="#d6af6c" strokeWidth="1.5" opacity="0.8" />
            <path d="M-100,550 C300,500 500,650 800,500 S1200,650 1540,450" fill="none" stroke="#d6af6c" strokeWidth="1" opacity="0.6" />
            
            {/* Lower complex web around event details */}
            <path d="M-100,700 C200,800 400,650 720,780 S1100,650 1540,850" fill="none" stroke="#d6af6c" strokeWidth="2" opacity="0.9" />
            <path d="M-100,800 C300,700 600,900 900,750 S1300,850 1540,700" fill="none" stroke="#d6af6c" strokeWidth="1" opacity="0.7" />
            <path d="M-100,750 C400,850 700,700 1000,850 S1400,750 1540,800" fill="none" stroke="#d6af6c" strokeWidth="0.5" opacity="0.5" />
            <path d="M100,900 C400,800 700,950 1100,800 S1500,950 1640,900" fill="none" stroke="#d6af6c" strokeWidth="1.5" opacity="0.6" />
          </svg>
        </div>

        <Countdown />
        {showGuestInfo && <GuestInfo passes={passes} names={guestNames} />}
        <EventDetails />
      </div>
      
      <RSVP urlId={id} guestNames={guestNames} />
      <Gallery />
      <PartyDetails />
      <Gifts />
      <Instagram />
      
    </main>
  );
}
