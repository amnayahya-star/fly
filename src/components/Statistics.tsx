import React from 'react';
import * as motion from 'framer-motion/client';
import { Plane, Globe, ShieldCheck, Headphones } from 'lucide-react';

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
    icon: Headphones,
    title: '24/7',
    subtitle: 'Support',
    desc: 'Always here to help',
  },
];

export default function Statistics() {
  return (
    <div className="relative z-20 w-full max-w-[1400px] mx-auto px-8 md:px-12 xl:px-24 mt-6 pb-12 flex flex-col items-center">
      
      {/* Stats Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
              className="bg-[#0b1a30]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-5 hover:bg-[#0b1a30]/80 transition-colors group cursor-pointer shadow-lg"
            >
              <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center relative group-hover:scale-110 transition-transform">
                <div className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(76,161,255,0.15)] pointer-events-none"></div>
                <Icon className="w-6 h-6 text-[#4CA1FF] relative z-10" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-bold text-white leading-tight">{stat.title}</span>
                <span className="text-[15px] font-semibold text-white leading-snug">{stat.subtitle}</span>
                <span className="text-[12px] text-white/50 mt-1 font-medium">{stat.desc}</span>
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
