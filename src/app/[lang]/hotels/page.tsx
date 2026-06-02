import React from 'react';
import * as motion from 'framer-motion/client';
import Image from "next/image";
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import { MapPin, Calendar, Users, Search, Star, Wifi, Coffee, Map } from 'lucide-react';

import { getHotels } from '@/app/actions';
import { getDictionary } from '@/i18n/getDictionary';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ar" | "fa");
  
  const hotels = await getHotels();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#060b19] selection:bg-[#4CA1FF] selection:text-white pb-20">
      
      {/* Background Hero Layer */}
      <div className="absolute top-0 left-0 w-full h-[60vh] pointer-events-none">
        <Image
          src="/hero_background.png"
          alt="Luxury Hotel"
          fill
          priority
          className="object-cover object-center"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b19]/60 via-[#060b19]/80 to-[#060b19]" />
      </div>

      <Navbar dict={dict.navbar} lang={lang} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 xl:px-24 pt-40">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{dict.hotels.title}</h1>
          <p className="text-white/70 text-lg max-w-2xl">{dict.hotels.subtitle}</p>
        </motion.div>

        {/* Hotel Search Engine */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full mb-20"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 shadow-2xl z-0"></div>
          
          <div className="relative z-10 p-6 flex flex-col xl:flex-row items-stretch w-full gap-4">
            
            {/* Destination */}
            <div className="flex-[2] px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl cursor-pointer hover:bg-black/30 transition-colors group">
              <span className="block text-xs text-white/50 mb-1 font-medium tracking-wide">{dict.hotels.destination}</span>
              <div className="flex items-center gap-3 text-white/90">
                <MapPin className="w-5 h-5 text-white/40 group-hover:text-[#4CA1FF] transition-colors" />
                <input 
                  type="text" 
                  placeholder={dict.hotels.placeholder}
                  className="bg-transparent border-none outline-none text-base font-semibold w-full placeholder-white/30"
                />
              </div>
            </div>

            {/* Check-in / Check-out */}
            <div className="flex-[2] flex gap-2">
              <div className="flex-1 px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl cursor-pointer hover:bg-black/30 transition-colors group">
                <span className="block text-xs text-white/50 mb-1 font-medium tracking-wide">{dict.hotels.checkIn}</span>
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="w-5 h-5 text-white/40 group-hover:text-[#4CA1FF] transition-colors" />
                  <span className="text-base font-semibold">{dict.hotels.addDates}</span>
                </div>
              </div>
              <div className="flex-1 px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl cursor-pointer hover:bg-black/30 transition-colors group">
                <span className="block text-xs text-white/50 mb-1 font-medium tracking-wide">{dict.hotels.checkOut}</span>
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="w-5 h-5 text-white/40 group-hover:text-[#4CA1FF] transition-colors" />
                  <span className="text-base font-semibold">{dict.hotels.addDates}</span>
                </div>
              </div>
            </div>

            {/* Guests & Rooms */}
            <div className="flex-1 px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl cursor-pointer hover:bg-black/30 transition-colors group">
              <span className="block text-xs text-white/50 mb-1 font-medium tracking-wide">{dict.hotels.guests}</span>
              <div className="flex items-center gap-3 text-white/90">
                <Users className="w-5 h-5 text-white/40 group-hover:text-[#4CA1FF] transition-colors" />
                <span className="text-base font-semibold">{dict.hotels.guestsValue}</span>
              </div>
            </div>

            {/* Search Button */}
            <button className="xl:w-auto w-full bg-[#0066FF] hover:bg-[#0052cc] text-white px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)] whitespace-nowrap text-base group">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {dict.hotels.search}
            </button>
            
          </div>
        </motion.div>

        {/* Featured Hotels */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{dict.hotels.trending}</h2>
              <p className="text-white/60">{dict.hotels.trendingSub}</p>
            </div>
            <Link href="#" className="text-[#4CA1FF] hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              {dict.hotels.seeAll} <Map className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <motion.div 
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 text-sm font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                    {hotel.rating}
                  </div>
                </div>

                <div className="p-6 relative z-10 -mt-16">
                  <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-white/70 text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    {hotel.location} • {hotel.reviews} {dict.hotels.reviews}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {hotel.amenities?.split(',').map((amenity: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-md border border-white/5">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between pt-4 border-t border-white/10">
                    <div>
                      <p className="text-xs text-white/50 mb-0.5 uppercase tracking-wider">{dict.hotels.startingFrom}</p>
                      <p className="text-2xl font-bold text-white">{hotel.price} <span className="text-sm font-normal text-white/50">{dict.hotels.night}</span></p>
                    </div>
                    <button className="bg-white/10 hover:bg-[#4CA1FF] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                      {dict.hotels.viewDeal}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
