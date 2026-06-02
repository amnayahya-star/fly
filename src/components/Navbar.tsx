"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import Link from 'next/link';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'fa', name: 'فارسی' }
];

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: dict.flights, href: `/${lang}/flights` },
    { name: dict.hotels, href: `/${lang}/hotels` },
    { name: dict.deals, href: `/${lang}/deals` },
    { name: dict.manageBooking, href: `/${lang}/manage-booking` },
    { name: dict.checkIn, href: `/${lang}/check-in` },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <Link href={`/${lang}`}>
          <svg className="w-14 h-auto text-white transform group-hover:scale-105 transition-transform duration-300" viewBox="0 0 100 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 25 Q 30 5 95 0 Q 50 15 12 23 Z" />
            <path d="M 6 31 Q 35 15 88 14 Q 45 25 18 29 Z" />
            <path d="M 12 37 Q 40 25 82 28 Q 40 35 24 35 Z" />
          </svg>
        </Link>
        <Link href={`/${lang}`} className="flex flex-col justify-center pt-1">
          <span className="text-3xl font-bold tracking-[0.15em] leading-none text-white font-sans drop-shadow-sm">
            AERO
          </span>
          <span className="text-[0.6rem] tracking-[0.4em] text-white/80 uppercase mt-1.5 ml-0.5 font-medium">
            Fly Beyond
          </span>
        </Link>
      </div>

      {/* Center Links */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        <Link href="#" className="hidden md:block text-sm font-medium text-white/90 hover:text-white transition-colors">
          {dict.support}
        </Link>
        <div className="relative hidden md:block" ref={dropdownRef}>
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white transition-colors uppercase"
          >
            <Globe className="w-4 h-4" />
            <span>{lang}</span>
            <svg className={`w-3 h-3 text-white/70 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          
          {/* Dropdown Menu */}
          {langOpen && (
            <div className="absolute top-full right-0 mt-4 w-36 bg-[#0a152e]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-2 z-50">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    // Update URL by replacing the current locale
                    const currentPath = window.location.pathname;
                    const newPath = currentPath.replace(`/${lang}`, `/${l.code}`);
                    window.location.href = newPath || `/${l.code}`;
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                    lang === l.code 
                      ? 'bg-white/10 text-white font-medium' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {l.name}
                  {lang === l.code && (
                    <div className={`w-1.5 h-1.5 rounded-full ${lang === 'ar' ? 'bg-[#D4AF37]' : 'bg-[#4CA1FF]'}`}></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <Link href={`/${lang}/signin`} className="text-sm font-medium text-white/90 hover:text-white transition-colors hidden sm:block">
          {dict.signIn}
        </Link>
        <Link href={`/${lang}/signup`} className={`px-5 py-2 text-sm font-medium text-white rounded-full backdrop-blur-md transition-all ${
          lang === 'ar'
            ? 'bg-[#D4AF37]/80 hover:bg-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
            : 'bg-[#0066FF]/80 hover:bg-[#0066FF] border border-[#0066FF]/50 shadow-[0_0_15px_rgba(0,102,255,0.3)]'
        }`}>
          {dict.signUp}
        </Link>
      </div>
    </nav>
  );
}
