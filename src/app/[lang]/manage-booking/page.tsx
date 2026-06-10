import React from 'react';
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ManageBookingClient from "@/components/ManageBookingClient";
import { getDictionary, Locale } from "@/i18n/getDictionary";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#060b19] flex items-center justify-center selection:bg-[#4CA1FF] selection:text-white px-4">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/re.png"
          alt="Elegant sky background"
          fill
          priority
          className="object-cover object-center scale-105 blur-sm"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-[#030d22]/90 via-[#030d22]/80 to-[#032a70]/50" />
      </div>

      <Navbar dict={dict.navbar} lang={lang} />

      <ManageBookingClient dict={dict.manageBookingPage} lang={lang} />
    </main>
  );
}
