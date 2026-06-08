export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { getFlights } from '@/app/actions';
import { getDictionary } from '@/i18n/getDictionary';
import FlightsClient from '@/components/FlightsClient';

export default async function FlightsResultsPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ lang: string }>,
  searchParams: Promise<{ from?: string, to?: string }>
}) {
  const { lang } = await params;
  const { from, to } = await searchParams;
  const dict = await getDictionary(lang as "en" | "ar" | "fa");
  let flights = await getFlights();

  if (from) {
    flights = flights.filter(f => f.from.toLowerCase().includes(from.toLowerCase()));
  }
  if (to) {
    flights = flights.filter(f => f.to.toLowerCase().includes(to.toLowerCase()));
  }

  return (
    <main className="relative min-h-screen w-full bg-background selection:bg-[#4CA1FF] selection:text-white pb-20">
      
      {/* Background Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#0066FF]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Navigation - simple version */}
      <nav className="relative z-50 px-8 py-6 flex items-center justify-between border-b border-foreground/5 bg-background/80 backdrop-blur-md sticky top-0">
        <Link href={`/${lang}`} className="flex items-center gap-3 cursor-pointer group">
          <svg className="w-10 h-auto text-foreground transform group-hover:scale-105 transition-transform duration-300" viewBox="0 0 100 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 25 Q 30 5 95 0 Q 50 15 12 23 Z" />
            <path d="M 6 31 Q 35 15 88 14 Q 45 25 18 29 Z" />
            <path d="M 12 37 Q 40 25 82 28 Q 40 35 24 35 Z" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-foreground">
            {(lang === 'ar' || lang === 'fa') ? "شاطئ الهندية" : "Shati Alhindia"}
          </span>
        </Link>
        <Link href={`/${lang}`} className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors flex items-center gap-2">
          {dict.flightsPage.backToSearch}
        </Link>
      </nav>

      <FlightsClient dict={dict} flights={flights} lang={lang} />
    </main>
  );
}
