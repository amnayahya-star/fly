"use client";
import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import Image from "next/image";
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import { User, KeyRound, ArrowRight, Settings2 } from 'lucide-react';

export default function Page() {
const dict = { navbar: {} };
const lang = "en";

  const [formData, setFormData] = useState({
    pnr: '',
    lastName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Looking up booking: ${formData.pnr}`);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#060b19] flex items-center justify-center selection:bg-[#4CA1FF] selection:text-white px-4">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/airplane_background.jpg"
          alt="Airplane background"
          fill
          priority
          className="object-cover object-center scale-105 blur-sm"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-[#030d22]/90 via-[#030d22]/80 to-[#032a70]/50" />
      </div>

      <Navbar dict={dict.navbar} lang={lang} />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[460px] pt-20"
      >
        <div className="relative w-full rounded-[2rem] p-8 sm:p-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(3,42,112,0.5)]">
          <div className="mb-8 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-16 h-16 bg-[#4CA1FF]/20 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-[#4CA1FF]/30"
            >
              <Settings2 className="w-8 h-8 text-[#4CA1FF]" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Booking</h1>
            <p className="text-white/60 text-sm">View your itinerary, modify flights, or select seats.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* PNR Input */}
            <div>
              <label className="block text-xs text-white/50 mb-2 font-medium tracking-wide uppercase">Booking Reference (PNR)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-white/40 group-focus-within:text-[#4CA1FF] transition-colors" />
                </div>
                <input 
                  type="text" 
                  required
                  maxLength={6}
                  value={formData.pnr}
                  onChange={(e) => setFormData({...formData, pnr: e.target.value.toUpperCase()})}
                  className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#4CA1FF]/50 focus:bg-black/40 transition-all text-sm uppercase tracking-wider"
                  placeholder="e.g. A8X9KL"
                />
              </div>
            </div>

            {/* Last Name Input */}
            <div>
              <label className="block text-xs text-white/50 mb-2 font-medium tracking-wide uppercase">Last Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/40 group-focus-within:text-[#4CA1FF] transition-colors" />
                </div>
                <input 
                  type="text" 
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#4CA1FF]/50 focus:bg-black/40 transition-all text-sm"
                  placeholder="Passenger Last Name"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-white text-[#060b19] hover:bg-[#4CA1FF] hover:text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg group overflow-hidden relative"
            >
              <span className="relative z-10 text-[15px]">Retrieve Booking</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Need help?{' '}
              <Link href="#" className="text-[#4CA1FF] font-medium hover:text-white transition-colors">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
