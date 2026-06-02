"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBooking } from '@/app/actions';
import { CreditCard, User, Mail, ShieldCheck, Loader2 } from 'lucide-react';

export default function CheckoutForm({ flightId, lang }: { flightId: string, lang: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await createBooking(flightId);
    if (res.success && res.pnr) {
      router.push(`/${lang}/checkout/success?pnr=${res.pnr}`);
    } else {
      setError(res.error || 'Something went wrong. Please make sure you are logged in.');
      if (res.error === 'Unauthorized') {
        setTimeout(() => {
          router.push(`/${lang}/login?callbackUrl=/${lang}/checkout/${flightId}`);
        }, 2000);
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}
      
      {/* Passenger Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Passenger Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#4CA1FF] transition-colors" />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#4CA1FF] transition-colors" />
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-white/10 my-6"></div>

      {/* Payment Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          Payment Method
          <ShieldCheck className="w-4 h-4 text-green-400" />
        </h3>
        <div className="relative">
          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input required type="text" placeholder="Card Number (Mock)" maxLength={19} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#4CA1FF] transition-colors" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input required type="text" placeholder="MM/YY" maxLength={5} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:border-[#4CA1FF] transition-colors" />
          <input required type="text" placeholder="CVC" maxLength={4} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:border-[#4CA1FF] transition-colors" />
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full mt-6 bg-gradient-to-r from-[#4CA1FF] to-[#0066FF] text-white py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(76,161,255,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
      >
        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm & Pay'}
      </button>
      <p className="text-center text-xs text-white/40 mt-4">
        By clicking Confirm & Pay, you agree to our Terms and Conditions. This is a secure encrypted payment.
      </p>
    </form>
  );
}
