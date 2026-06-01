"use client";
import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import Link from 'next/link';
import { MapPin, Calendar, User, ArrowRightLeft, Route, Plane, ArrowRight, ChevronDown, Armchair } from 'lucide-react';
import clsx from 'clsx';

const tripTypes = [
  { id: 'round', label: 'Round Trip' },
  { id: 'oneway', label: 'One Way' },
  { id: 'multi', label: 'Multi City' },
];

export default function BookingEngine() {
  const [activeTrip, setActiveTrip] = useState('round');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative z-20 w-full max-w-[1400px] mx-auto px-8 md:px-12 xl:px-24 mt-2"
    >
      <div className="relative w-full">
        {/* We use an SVG to draw the exact custom shape border of the glass card */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full drop-shadow-2xl" preserveAspectRatio="none" viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 Q0,0 20,0 L320,0 C340,0 350,15 370,15 L980,15 Q1000,15 1000,35 L1000,180 Q1000,200 980,200 L20,200 Q0,200 0,180 Z" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
          </svg>
          <div className="absolute inset-0 rounded-[1.25rem] backdrop-blur-xl" style={{ clipPath: 'polygon(0 0, 32% 0, 37% 7.5%, 100% 7.5%, 100% 100%, 0 100%)' }}></div>
        </div>

        <div className="relative z-10 p-6 pt-5">
          {/* Trip Type Selector */}
          <div className="flex items-center gap-2 mb-6">
            {tripTypes.map((type) => {
              const isActive = activeTrip === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveTrip(type.id)}
                  className={clsx(
                    "flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all",
                    isActive 
                      ? "bg-[#032A70] text-white shadow-[0_0_20px_rgba(3,42,112,0.8)] border border-[#1e4080]" 
                      : "bg-white/[0.08] text-white/80 hover:text-white border border-white/[0.05] shadow-sm hover:bg-white/[0.12]"
                  )}
                >
                  {isActive && type.id === 'round' && (
                    <div className="w-4 h-4 rounded-full border-[1.5px] border-dashed border-[#4CA1FF] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4CA1FF]"></div>
                    </div>
                  )}
                  {!isActive && type.id === 'oneway' && <Plane className="w-4 h-4 text-white/50" />}
                  {!isActive && type.id === 'multi' && <Route className="w-4 h-4 text-white/50" />}
                  {type.label}
                </button>
              );
            })}
          </div>

          {/* Search Fields Grid */}
          <div className="flex flex-col xl:flex-row items-stretch w-full gap-2 relative">
            
            {/* From & To Wrapper (to position the swap button precisely) */}
            <div className="flex flex-col md:flex-row relative gap-2 xl:flex-[2] min-w-0">
              {/* From */}
              <div className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/20 rounded-xl cursor-pointer hover:bg-white/[0.06] transition-colors relative">
                <span className="block text-[11px] text-white/60 mb-1 font-medium tracking-wide">From</span>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4 text-white/40 shrink-0" />
                  <span className="text-[14px] font-semibold whitespace-nowrap truncate">Select origin</span>
                </div>
              </div>

              {/* To */}
              <div className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/20 rounded-xl cursor-pointer hover:bg-white/[0.06] transition-colors pl-6 md:pl-8">
                <span className="block text-[11px] text-white/60 mb-1 font-medium tracking-wide">To</span>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4 text-white/40 shrink-0" />
                  <span className="text-[14px] font-semibold whitespace-nowrap truncate">Select destination</span>
                </div>
              </div>

              {/* Swap Button */}
              <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1b2b45] border border-white/10 flex items-center justify-center text-white hover:text-white z-10 hover:bg-[#25395a] transition-colors shadow-lg">
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Departure */}
            <div className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/20 rounded-xl cursor-pointer hover:bg-white/[0.06] transition-colors min-w-0">
              <span className="block text-[11px] text-white/60 mb-1 font-medium tracking-wide">Departure</span>
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="w-4 h-4 text-white/40" />
                <span className="text-[14px] font-semibold whitespace-nowrap">Select date</span>
              </div>
            </div>

            {/* Return */}
            <div className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/20 rounded-xl cursor-pointer hover:bg-white/[0.06] transition-colors min-w-0">
              <span className="block text-[11px] text-white/60 mb-1 font-medium tracking-wide">Return</span>
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="w-4 h-4 text-white/40" />
                <span className="text-[14px] font-semibold whitespace-nowrap">Select date</span>
              </div>
            </div>

            {/* Passengers */}
            <div className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/20 rounded-xl cursor-pointer hover:bg-white/[0.06] transition-colors min-w-0">
              <span className="block text-[11px] text-white/60 mb-1 font-medium tracking-wide">Passengers</span>
              <div className="flex items-center gap-2 text-white/90">
                <User className="w-4 h-4 text-white/40" />
                <span className="text-[14px] font-semibold whitespace-nowrap">1 Passenger</span>
              </div>
            </div>

            {/* Class */}
            <div className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/20 rounded-xl cursor-pointer hover:bg-white/[0.06] transition-colors min-w-0">
              <span className="block text-[11px] text-white/60 mb-1 font-medium tracking-wide">Class</span>
              <div className="flex items-center gap-2 text-white/90">
                <Armchair className="w-4 h-4 text-white/40" />
                <span className="text-[14px] font-semibold whitespace-nowrap">Economy</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/50 ml-auto" />
              </div>
            </div>

            {/* Search Button */}
            <Link href="/flights" className="xl:w-auto w-full bg-[#0066FF] hover:bg-[#0052cc] text-white px-6 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(0,102,255,0.4)] whitespace-nowrap text-[15px]">
              Search Flights
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
