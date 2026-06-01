import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import BookingEngine from "@/components/BookingEngine";
import Statistics from "@/components/Statistics";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#060b19] flex flex-col justify-between selection:bg-[#4CA1FF] selection:text-white">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/sunset_airplane.jpg"
          alt="Airplane flying over clouds with world map background"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        {/* Softer overlay gradient just enough for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030d22]/60 via-[#030d22]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030d22]/40 via-transparent to-transparent" />
      </div>

      <Navbar />
      
      <div className="relative z-10 flex flex-col min-h-screen pt-20">
        <HeroContent />
        
        <div className="w-full mb-12">
          <BookingEngine />
          <Statistics />
        </div>
      </div>
    </main>
  );
}
