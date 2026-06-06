import Image from "next/image";
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import BookingEngine from "@/components/BookingEngine";
import Statistics from "@/components/Statistics";
import { getDictionary, Locale } from "@/i18n/getDictionary";

const destinations = [
  {
    name: "Paris",
    location: "France · CDG",
    badge: "Most Popular",
    price: "$449",
    rating: 4.8,
    image: "/paris.png"
  },
  {
    name: "Rome",
    location: "Italy · FCO",
    badge: "Trending",
    price: "$389",
    rating: 4.8,
    image: "/rome.png"
  },
  {
    name: "Beijing",
    location: "China · PEK",
    badge: "Hot Deal",
    price: "$620",
    rating: 4.8,
    image: "/beijing.png"
  },
  {
    name: "New Delhi",
    location: "India · DEL",
    badge: "Culture",
    price: "$510",
    rating: 4.8,
    image: "/new_delhi.png"
  }
];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const heroSrc = (lang === "ar" || lang === "fa") ? "/q/hero-pick-ar.png" : "/q/hero-pick.png";

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#060b19] flex flex-col justify-between selection:bg-[#4CA1FF] selection:text-white">

      {/* Background Video Layer */}
      <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster={heroSrc}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Softer overlay gradient just enough for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030d22]/75 via-[#030d22]/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030d22]/50 via-transparent to-transparent z-10" />
      </div>

      <Navbar dict={dict.navbar} lang={lang} />

      <div className="relative z-10 flex flex-col pt-20">
        <HeroContent dict={dict.hero} lang={lang} />

        <div className="w-full mb-12">
          <BookingEngine lang={lang} />
          <Statistics lang={lang} />
        </div>

        {/* Popular Destinations Section */}
        <div className="w-full bg-white py-20 px-8 md:px-12 xl:px-24 relative z-20">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">EXPLORE</p>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Popular Destinations</h2>
              </div>
              <Link href={`/${lang}/flights`} className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1.5 transition-colors">
                View all <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((dest) => (
                <div key={dest.name} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:translate-y-[-4px] transition-all duration-300 flex flex-col group cursor-pointer">
                  {/* Image area */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-indigo-600/95 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 rounded-full select-none shadow-sm">
                      {dest.badge}
                    </div>
                  </div>

                  {/* Info area */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <h3 className="text-lg font-bold text-slate-800 tracking-tight">{dest.name}</h3>
                      <div className="text-right shrink-0">
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-0.5">from</span>
                        <span className="text-lg font-extrabold text-blue-600 leading-none">{dest.price}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 font-semibold mb-5">{dest.location}</p>
                    
                    <div className="flex items-center gap-1 mt-auto pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-bold ml-1">{dest.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
