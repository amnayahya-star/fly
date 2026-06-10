"use client";
import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import { User, KeyRound, ArrowRight, Settings2, Plane, Ticket, Loader2 } from 'lucide-react';
import { lookupBooking } from '@/app/actions';

interface ManageBookingClientProps {
  dict: any;
  lang: string;
}

export default function ManageBookingClient({ dict, lang }: ManageBookingClientProps) {
  const [formData, setFormData] = useState({
    pnr: '',
    lastName: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setBooking(null);

    const result = await lookupBooking(formData.pnr, formData.lastName);
    
    if (result) {
      setBooking(result);
    } else {
      setError(dict.notFound);
    }
    
    setLoading(false);
  };

  const isRTL = lang === 'ar' || lang === 'fa';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative z-10 w-full ${booking ? 'max-w-4xl' : 'max-w-[460px]'} pt-24 pb-12 transition-all duration-500`}
    >
      <div className="relative w-full rounded-[2rem] p-8 sm:p-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(3,42,112,0.5)]">
        
        {!booking ? (
          <>
            <div className="mb-8 text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-16 h-16 bg-[#4CA1FF]/20 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-[#4CA1FF]/30"
              >
                <Settings2 className="w-8 h-8 text-[#4CA1FF]" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">{dict.title}</h1>
              <p className="text-white/60 text-sm">{dict.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
              {/* PNR Input */}
              <div>
                <label className="block text-xs text-white/50 mb-2 font-medium tracking-wide uppercase">{dict.pnrLabel}</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                    <KeyRound className="h-5 w-5 text-white/40 group-focus-within:text-[#4CA1FF] transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    required
                    maxLength={15}
                    value={formData.pnr}
                    onChange={(e) => setFormData({...formData, pnr: e.target.value.toUpperCase()})}
                    className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#4CA1FF]/50 focus:bg-black/40 transition-all text-sm uppercase tracking-wider`}
                    placeholder={dict.pnrPlaceholder}
                  />
                </div>
              </div>

              {/* Last Name Input */}
              <div>
                <label className="block text-xs text-white/50 mb-2 font-medium tracking-wide uppercase">{dict.lastNameLabel}</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
                    <User className="h-5 w-5 text-white/40 group-focus-within:text-[#4CA1FF] transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#4CA1FF]/50 focus:bg-black/40 transition-all text-sm`}
                    placeholder={dict.lastNamePlaceholder}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-white text-[#060b19] hover:bg-[#4CA1FF] hover:text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg group overflow-hidden relative disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="relative z-10 text-[15px]">{dict.searching}</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10 text-[15px]">{dict.submitBtn}</span>
                    <ArrowRight className={`w-4 h-4 relative z-10 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex flex-col md:flex-row gap-8 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* Ticket Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{dict.ticketConfirmed}</h2>
                  <p className="text-white/60">{dict.bookingReference}: <strong className="text-white">{booking.pnr}</strong></p>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold border border-green-500/30 shrink-0">
                  {booking.status}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/20 border border-white/5 mb-6">
                <h3 className="text-sm text-white/50 uppercase tracking-wider mb-4">{dict.passengerInfo}</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{booking.user.name}</p>
                    <p className="text-white/50 text-sm">{booking.user.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/20 border border-white/5 relative overflow-hidden">
                <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-4 opacity-5 pointer-events-none`}>
                  <Plane className="w-32 h-32" />
                </div>
                <h3 className="text-sm text-white/50 uppercase tracking-wider mb-4">{dict.flightItinerary}</h3>
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold text-white border border-white/10">
                    {booking.flight.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{booking.flight.airline}</h3>
                    <p className="text-xs text-[#4CA1FF]">{booking.flight.type} {dict.flightType}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center relative z-10 gap-2">
                  <div>
                    <p className="text-2xl font-bold text-white">{booking.flight.departureTime}</p>
                    <p className="text-sm text-white/60">{booking.flight.from}</p>
                  </div>
                  <div className="flex-1 px-4 md:px-8 flex flex-col items-center">
                    <p className="text-xs text-white/50 mb-1">{booking.flight.duration}</p>
                    <div className="w-full h-[1px] bg-white/20 relative">
                      <Plane className={`w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isRTL && 'rotate-180'}`} />
                    </div>
                  </div>
                  <div className={isRTL ? 'text-left' : 'text-right'}>
                    <p className="text-2xl font-bold text-white">{booking.flight.arrivalTime}</p>
                    <p className="text-sm text-white/60">{booking.flight.to}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Sidebar */}
            <div className={`w-full md:w-64 flex flex-col gap-4 border-t md:border-t-0 ${isRTL ? 'md:border-r md:pr-8' : 'md:border-l md:pl-8'} border-white/10 pt-6 md:pt-0`}>
              <button 
                onClick={() => alert('Downloading ticket...')}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Ticket className="w-4 h-4" />
                {dict.downloadTicket}
              </button>
              <button 
                onClick={() => alert('Changing flight...')}
                className="w-full py-3 border border-white/20 hover:border-white/40 text-white rounded-xl font-medium transition-colors cursor-pointer"
              >
                {dict.changeFlight}
              </button>
              <button 
                onClick={() => alert('Cancelling booking...')}
                className="w-full py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl font-medium transition-colors mt-auto cursor-pointer"
              >
                {dict.cancelBooking}
              </button>
              
              <button 
                onClick={() => setBooking(null)} 
                className="w-full py-3 text-white/50 hover:text-white text-sm transition-colors mt-4 cursor-pointer"
              >
                {dict.backToSearch}
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
