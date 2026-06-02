import React from 'react';
import * as motion from 'framer-motion/client';
import { Plane, Globe, ShieldCheck, Headset } from 'lucide-react';

const stats = [
  {
    icon: Plane,
    title: '700+',
    subtitle: 'Airlines',
    desc: 'Worldwide network',
  },
  {
    icon: Globe,
    title: '150+',
    subtitle: 'Countries',
    desc: 'Global destinations',
  },
  {
    icon: ShieldCheck,
    title: 'Best Price',
    subtitle: 'Guarantee',
    desc: 'We match any price',
  },
  {
    icon: Headset,
    title: '24/7',
    subtitle: 'Support',
    desc: 'Always here to help',
  },
];

export default function Statistics({ lang }: { lang?: string }) {
  return (
    <div className="relative z-20 w-full px-12 md:px-20 xl:px-36 mt-6 pb-4 flex flex-col items-center">
      
      {/* Stats Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
              className={`group flex min-h-[126px] cursor-pointer items-center gap-5 rounded-[18px] border bg-[#0b2648]/75 px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_34px_rgba(4,15,35,0.38)] backdrop-blur-md transition-colors ${
                (lang === 'ar' || lang === 'fa')
                  ? 'border-[#BF953F]/40 hover:border-[#D4AF37]/65 hover:bg-[#151005]/85'
                  : 'border-[#1f4774]/70 hover:border-[#2d5f96]/85 hover:bg-[#0d2c54]/80'
              }`}
            >
              <div
                className={`relative flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full border transition-transform group-hover:scale-105 ${
                  (lang === 'ar' || lang === 'fa')
                    ? 'border-[#D4AF37]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_24px_rgba(212,175,55,0.35)]'
                    : 'border-[#2c5a91]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_24px_rgba(62,146,239,0.24)]'
                }`}
                style={{
                  background: (lang === 'ar' || lang === 'fa')
                    ? 'radial-gradient(circle at 35% 28%, rgba(212, 175, 55, 0.42), rgba(170, 119, 28, 0.42) 45%, rgba(45, 30, 5, 0.9) 100%)'
                    : 'radial-gradient(circle at 35% 28%, rgba(77, 158, 255, 0.42), rgba(31, 98, 171, 0.42) 45%, rgba(13, 38, 73, 0.9) 100%)',
                }}
              >
                <div className="absolute inset-[7px] rounded-full border border-white/[0.04]" />
                <Icon className="relative z-10 h-8 w-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.22)]" strokeWidth={1.8} />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-[28px] font-bold leading-[1.05] text-white md:text-[32px]">{stat.title}</span>
                <span className="text-[20px] font-semibold leading-snug text-white md:text-[21px]">{stat.subtitle}</span>
                <span className="mt-3 text-[14px] font-medium leading-tight text-[#b8c4d5]">{stat.desc}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-col items-center gap-2 mt-4"
      >
        <div className="w-5 h-8 border-[1.5px] border-white/30 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-white/70 rounded-full"
          />
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium text-white/50 tracking-wider">
          Scroll to explore
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </motion.div>
    </div>
  );
}
