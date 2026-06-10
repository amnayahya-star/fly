"use client";
import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import { User, KeyRound, ArrowRight, PlaneTakeoff, Info } from 'lucide-react';

interface CheckInClientProps {
  dict: any;
  lang: string;
}

export default function CheckInClient({ dict, lang }: CheckInClientProps) {
  const [formData, setFormData] = useState({
    pnr: '',
    lastName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${dict.title} - PNR: ${formData.pnr}`);
  };

  const isRTL = lang === 'ar' || lang === 'fa';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 w-full max-w-[460px] pt-20"
    >
      <div className="relative w-full rounded-[2rem] p-8 sm:p-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(76,161,255,0.3)]">
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-16 h-16 bg-[#4CA1FF] rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(76,161,255,0.5)]"
          >
            <PlaneTakeoff className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">{dict.title}</h1>
          <p className="text-white/60 text-sm">{dict.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* PNR Input */}
          <div>
            <label className="block text-xs text-white/50 mb-2 font-medium tracking-wide uppercase">{dict.pnrLabel}</label>
            <div className="relative group">
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                <KeyRound className="h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
              </div>
              <input 
                type="text" 
                required
                maxLength={6}
                value={formData.pnr}
                onChange={(e) => setFormData({...formData, pnr: e.target.value.toUpperCase()})}
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#4CA1FF] focus:bg-black/50 transition-all text-sm uppercase tracking-wider`}
                placeholder={dict.pnrPlaceholder}
              />
            </div>
          </div>

          {/* Last Name Input */}
          <div>
            <label className="block text-xs text-white/50 mb-2 font-medium tracking-wide uppercase">{dict.lastNameLabel}</label>
            <div className="relative group">
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                <User className="h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
              </div>
              <input 
                type="text" 
                required
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#4CA1FF] focus:bg-black/50 transition-all text-sm`}
                placeholder={dict.lastNamePlaceholder}
              />
            </div>
          </div>

          {/* Check-in Info */}
          <div className="flex items-start gap-2 bg-[#4CA1FF]/10 p-4 rounded-xl border border-[#4CA1FF]/20 mt-2">
            <Info className="w-4 h-4 text-[#4CA1FF] shrink-0 mt-0.5" />
            <p className="text-xs text-white/70 leading-relaxed">
              {dict.infoText}
            </p>
          </div>

          <button 
            type="submit"
            className="mt-2 w-full bg-[#0066FF] hover:bg-[#0052cc] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)] group overflow-hidden relative cursor-pointer"
          >
            <span className="relative z-10 text-[15px]">{dict.submitBtn}</span>
            <ArrowRight className={`w-4 h-4 relative z-10 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </button>
        </form>

      </div>
    </motion.div>
  );
}
