"use client";
import React from 'react';
import * as motion from 'framer-motion/client';
import Link from 'next/link';
import { Plane, ArrowRight, Clock, MapPin, Filter, ChevronDown, Check } from 'lucide-react';

export default function FlightsClient({ dict, flights, lang }: { dict: any, flights: any[], lang: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-10 relative z-10 flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar Filters */}
      <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 text-white font-semibold">
            <Filter className="w-4 h-4" />
            <span>{dict.flightsPage.filters}</span>
          </div>

          {/* Stops */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white/70 mb-3">{dict.flightsPage.stops}</h3>
            <div className="space-y-2">
              {[dict.flightsPage.direct, dict.flightsPage.oneStop, dict.flightsPage.twoStops].map((stop, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${i === 0 ? 'bg-[#4CA1FF] border-[#4CA1FF]' : 'border-white/20 group-hover:border-[#4CA1FF]/50'}`}>
                    {i === 0 && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-white/90">{stop}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-white/70 mb-3">{dict.flightsPage.priceRange}</h3>
            <div className="h-1 w-full bg-white/10 rounded-full relative mb-4">
              <div className="absolute left-0 right-1/4 h-full bg-[#4CA1FF] rounded-full"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow border border-gray-200"></div>
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow border border-gray-200 translate-x-1/2"></div>
            </div>
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>$200</span>
              <span>$800+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 flex flex-col gap-4">
        
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{dict.flightsPage.selectDeparture}</h1>
            <p className="text-sm text-white/60">{dict.flightsPage.flightSubtitle}</p>
          </div>
        </div>

        {/* Flight Cards */}
        {flights.map((flight, index) => (
          <motion.div 
            key={flight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="w-full rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all p-5 flex flex-col sm:flex-row items-center gap-6 group cursor-pointer"
          >
            {/* Airline Info */}
            <div className="w-full sm:w-1/4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold text-white border border-white/10">
                {flight.logo}
              </div>
              <div>
                <h3 className="font-semibold text-white">{flight.airline}</h3>
                <p className="text-xs text-white/50">{flight.type}</p>
              </div>
            </div>

            {/* Flight Times */}
            <div className="flex-1 w-full flex items-center justify-between px-2 sm:px-6">
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-0.5">{flight.departureTime}</p>
                <p className="text-sm text-white/50">{flight.from}</p>
              </div>
              
              <div className="flex-1 px-4 flex flex-col items-center">
                <p className="text-xs text-white/40 mb-2">{flight.duration}</p>
                <div className="w-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 via-[#4CA1FF] to-white/20 relative">
                    <Plane className="w-4 h-4 text-[#4CA1FF] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#060b19]" />
                  </div>
                  <div className="w-2 h-2 rounded-full border border-[#4CA1FF] bg-transparent"></div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xl font-bold text-white mb-0.5">{flight.arrivalTime}</p>
                <p className="text-sm text-white/50">{flight.to}</p>
              </div>
            </div>

            {/* Price and Action */}
            <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6 gap-4 sm:gap-2">
              <div className="text-left sm:text-right">
                <p className="text-[11px] text-white/50 font-medium tracking-wide uppercase">{dict.flightsPage.totalFrom}</p>
                <p className="text-2xl font-bold text-white">{flight.price}</p>
              </div>
              <Link href={`/${lang}/checkout/${flight.id}`} className="bg-[#0066FF]/20 hover:bg-[#0066FF] text-[#4CA1FF] hover:text-white px-5 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2 text-sm">
                {dict.flightsPage.select}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
