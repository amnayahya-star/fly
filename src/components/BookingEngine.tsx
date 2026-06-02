"use client";
import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import Link from 'next/link';
import { MapPin, Calendar, User, ArrowRightLeft, Route, Plane, ArrowRight, ChevronDown, Armchair, RotateCw } from 'lucide-react';
import clsx from 'clsx';

const tripTypes = [
  { id: 'round', label: 'Round Trip', icon: RotateCw },
  { id: 'oneway', label: 'One Way', icon: Plane },
  { id: 'multi', label: 'Multi City', icon: Route },
];

export default function BookingEngine() {
  const [activeTrip, setActiveTrip] = useState('round');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative z-20 w-full px-8 md:px-12 xl:px-24 mt-24"
    >
      <div className="relative w-full">
        {/* We use a high-resolution SVG viewBox (1600x200) to ensure the top-edge slope remains perfectly steep and sharp without horizontal stretching */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full drop-shadow-2xl" preserveAspectRatio="none" viewBox="0 0 1600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 Q0,0 20,0 L390,0 C405,0 415,15 430,15 L1580,15 Q1600,15 1600,35 L1600,180 Q1600,200 1580,200 L20,200 Q0,200 0,180 Z" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.28)" strokeWidth="1.5"/>
          </svg>
          <div className="absolute inset-0 rounded-[1.25rem] backdrop-blur-xl" style={{ clipPath: 'polygon(0 0, 24.375% 0, 26.875% 7.5%, 100% 7.5%, 100% 100%, 0 100%)' }}></div>
        </div>

        <div className="relative z-10 p-6 pt-5">
          {/* Trip Type Selector */}
          <div className="flex items-center gap-2 mb-6">
            {tripTypes.map((type) => {
              const isActive = activeTrip === type.id;
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveTrip(type.id)}
                  className={clsx(
                    "flex items-center gap-2 px-6 py-3 rounded-2xl text-[14px] font-semibold transition-all cursor-pointer",
                    isActive 
                      ? "bg-[#02102e] text-white shadow-[0_0_18px_rgba(0,102,255,0.45)] border border-[#0066FF]" 
                      : "bg-white/[0.03] text-white/70 hover:text-white border border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                  )}
                >
                  <Icon className={clsx("w-4 h-4", isActive ? "text-[#4CA1FF]" : "text-white/60")} />
                  {type.label}
                </button>
              );
            })}
          </div>

          {/* Search Fields Grid with larger spacing and taller fields */}
          <div className="flex flex-col xl:flex-row items-stretch w-full gap-3.5 relative">
            
            {/* From & To Wrapper (to position the swap button precisely) */}
            <div className="flex flex-col md:flex-row relative gap-2.5 xl:flex-[2.2] min-w-0">
              {/* From */}
              <div className="flex-1 px-6 py-[18px] bg-black/[0.18] border border-white/20 rounded-2xl cursor-pointer hover:bg-black/[0.26] hover:border-white/35 transition-all duration-200 relative min-w-0 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
                <span className="block text-[12px] text-white/60 mb-2 font-medium tracking-wide uppercase">From</span>
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4.5 h-4.5 text-white/70 shrink-0" />
                  <span className="text-[15px] font-semibold whitespace-nowrap truncate">Select origin</span>
                </div>
              </div>

              {/* To */}
              <div className="flex-1 px-6 py-[18px] bg-black/[0.18] border border-white/20 rounded-2xl cursor-pointer hover:bg-black/[0.26] hover:border-white/35 transition-all duration-200 pl-8 md:pl-10 min-w-0 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
                <span className="block text-[12px] text-white/60 mb-2 font-medium tracking-wide uppercase">To</span>
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4.5 h-4.5 text-white/70 shrink-0" />
                  <span className="text-[15px] font-semibold whitespace-nowrap truncate">Select destination</span>
                </div>
              </div>

              {/* Swap Button */}
              <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#121824] border border-white/20 flex items-center justify-center text-white hover:text-white z-10 hover:bg-[#1a2336] hover:border-white/35 transition-all shadow-lg cursor-pointer backdrop-blur-md">
                <ArrowRightLeft className="w-4 h-4 text-white/80" />
              </button>
            </div>

            {/* Departure */}
            <div className="flex-1 px-6 py-[18px] bg-black/[0.18] border border-white/20 rounded-2xl cursor-pointer hover:bg-black/[0.26] hover:border-white/35 transition-all duration-200 min-w-0 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
              <span className="block text-[12px] text-white/60 mb-2 font-medium tracking-wide uppercase">Departure</span>
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-4.5 h-4.5 text-white/70 shrink-0" />
                <span className="text-[15px] font-semibold whitespace-nowrap">Select date</span>
              </div>
            </div>

            {/* Deturn */}
            <div className="flex-1 px-6 py-[18px] bg-black/[0.18] border border-white/20 rounded-2xl cursor-pointer hover:bg-black/[0.26] hover:border-white/35 transition-all duration-200 min-w-0 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
              <span className="block text-[12px] text-white/60 mb-2 font-medium tracking-wide uppercase">Deturn</span>
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-4.5 h-4.5 text-white/70 shrink-0" />
                <span className="text-[15px] font-semibold whitespace-nowrap">Select date</span>
              </div>
            </div>

            {/* Passengers */}
            <div className="flex-1 px-6 py-[18px] bg-black/[0.18] border border-white/20 rounded-2xl cursor-pointer hover:bg-black/[0.26] hover:border-white/35 transition-all duration-200 min-w-0 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
              <span className="block text-[12px] text-white/60 mb-2 font-medium tracking-wide uppercase">Passengers</span>
              <div className="flex items-center gap-2 text-white">
                <User className="w-4.5 h-4.5 text-white/70 shrink-0" />
                <span className="text-[15px] font-semibold whitespace-nowrap">1 Passenger</span>
              </div>
            </div>

            {/* Class */}
            <div className="flex-1 px-6 py-[18px] bg-black/[0.18] border border-white/20 rounded-2xl cursor-pointer hover:bg-black/[0.26] hover:border-white/35 transition-all duration-200 min-w-0 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
              <span className="block text-[12px] text-white/60 mb-2 font-medium tracking-wide uppercase">Class</span>
              <div className="flex items-center gap-2 text-white">
                <Armchair className="w-4.5 h-4.5 text-white/70 shrink-0" />
                <span className="text-[15px] font-semibold whitespace-nowrap">Economy</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/50 ml-auto" />
              </div>
            </div>

            {/* Search Button (perfectly matches inputs in height and features a premium blue linear gradient) */}
            <Link href="/flights" className="xl:w-auto w-full bg-gradient-to-r from-[#004BEE] to-[#0088FF] hover:from-[#003CD0] hover:to-[#0077EE] text-white px-8 py-[18px] rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_20px_rgba(0,102,255,0.45)] hover:shadow-[0_4px_28px_rgba(0,102,255,0.7)] hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-[16px] cursor-pointer">
              Search Flights
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
