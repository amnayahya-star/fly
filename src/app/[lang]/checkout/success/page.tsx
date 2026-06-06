import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Ticket, ArrowRight } from 'lucide-react';

export default async function SuccessPage({ params, searchParams }: { params: Promise<{ lang: string }>, searchParams: Promise<{ pnr: string }> }) {
  const { lang } = await params;
  const { pnr } = await searchParams;

  return (
    <main className="relative min-h-screen w-full bg-[#060b19] selection:bg-[#4CA1FF] selection:text-white flex items-center justify-center p-6">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-[#4CA1FF]/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl text-center">
          
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-white/60 mb-8">
            Your flight has been successfully booked. Have a great trip!
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-3 text-white/50 mb-2 text-sm uppercase tracking-wider font-semibold">
              <Ticket className="w-4 h-4" />
              Booking Reference (PNR)
            </div>
            <div className="text-3xl font-bold text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#4CA1FF] to-[#36D1DC]">
              {pnr || 'SHATI-XXXXXX'}
            </div>
          </div>

          <Link href={`/${lang}/manage-booking`} className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
            Manage Booking
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="mt-6">
            <Link href={`/${lang}/flights`} className="text-sm font-medium text-[#4CA1FF] hover:text-white transition-colors">
              Book another flight
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
