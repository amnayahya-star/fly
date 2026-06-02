import React from 'react';
import { getFlightById } from '@/app/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CheckoutForm from '@/components/CheckoutForm';
import { Plane, Calendar, Clock, MapPin } from 'lucide-react';

export default async function CheckoutPage({ params }: { params: Promise<{ lang: string, flightId: string }> }) {
  const { lang, flightId } = await params;
  
  const flight = await getFlightById(flightId);
  if (!flight) {
    notFound();
  }

  return (
    <main className="relative min-h-screen w-full bg-[#060b19] selection:bg-[#4CA1FF] selection:text-white pb-20">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#0066FF]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-8 py-6 flex items-center justify-between border-b border-white/5 bg-[#060b19]/80 backdrop-blur-md sticky top-0">
        <Link href={`/${lang}`} className="flex items-center gap-3 cursor-pointer group">
          <svg className="w-10 h-auto text-white transform group-hover:scale-105 transition-transform duration-300" viewBox="0 0 100 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 25 Q 30 5 95 0 Q 50 15 12 23 Z" />
            <path d="M 6 31 Q 35 15 88 14 Q 45 25 18 29 Z" />
            <path d="M 12 37 Q 40 25 82 28 Q 40 35 24 35 Z" />
          </svg>
          <span className="text-xl font-bold tracking-[0.15em] text-white">AERO</span>
        </Link>
        <div className="text-sm font-medium text-white/90">
          Secure Checkout
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left/Right Column: Flight Summary */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md sticky top-32">
            <h2 className="text-xl font-bold text-white mb-6">Booking Summary</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold text-white border border-white/10">
                {flight.logo}
              </div>
              <div>
                <h3 className="font-semibold text-white">{flight.airline}</h3>
                <p className="text-xs text-white/50">{flight.type}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border-2 border-[#4CA1FF] mt-1"></div>
                  <div className="w-[1px] h-12 bg-white/10 my-1"></div>
                  <MapPin className="w-4 h-4 text-[#4CA1FF]" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-white">{flight.departureTime}</p>
                  <p className="text-sm text-white/50">{flight.from}</p>
                  
                  <p className="text-lg font-bold text-white mt-6">{flight.arrivalTime}</p>
                  <p className="text-sm text-white/50">{flight.to}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mb-4">
              <div className="flex justify-between items-center text-sm text-white/70 mb-2">
                <span>Flight ticket</span>
                <span>{flight.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-white/70 mb-2">
                <span>Taxes & Fees</span>
                <span>$45</span>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total</span>
              <span className="text-2xl font-bold text-white">
                ${parseInt(flight.price.replace(/[^0-9]/g, '')) + 45}
              </span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <h1 className="text-2xl font-bold text-white mb-2">Complete your booking</h1>
            <p className="text-white/50 mb-8">Please enter your details below to finalize your ticket.</p>
            
            <CheckoutForm flightId={flight.id} lang={lang} />
          </div>
        </div>

      </div>
    </main>
  );
}
