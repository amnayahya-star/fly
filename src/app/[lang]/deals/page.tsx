import React from 'react';
import Navbar from "@/components/Navbar";
import { getDeals } from '@/app/actions';
import { getDictionary } from '@/i18n/getDictionary';
import DealsClient from '@/components/DealsClient';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "ar" | "fa");
  const deals = await getDeals();

  return (
    <main className="relative min-h-screen w-full bg-[#060b19] selection:bg-[#4CA1FF] selection:text-white pb-24">
      
      {/* Background Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-br from-[#0066FF]/20 to-[#A020F0]/20 blur-[150px] rounded-full pointer-events-none"></div>

      <Navbar dict={dict.navbar} lang={lang} />

      <DealsClient dict={dict} deals={deals} lang={lang} />
    </main>
  );
}
