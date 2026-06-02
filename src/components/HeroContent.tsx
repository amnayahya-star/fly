import React from 'react';
import * as motion from 'framer-motion/client';

export default function HeroContent({ dict, lang }: { dict: any; lang?: string }) {
  return (
    <div className="max-w-4xl text-white relative z-10 pt-12 pb-4 px-8 md:px-12 xl:px-24">
      {/* Label */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
          {dict.label}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
      >
        {dict.headline} <br />
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${lang === 'ar' ? 'from-[#BF953F] via-[#FCF6BA] to-[#B38728]' : 'from-[#4CA1FF] to-[#36D1DC]'}`}>
          {dict.headlineHighlight}
        </span>
      </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-white/80 max-w-[540px] leading-relaxed font-light"
        >
        {dict.description}
      </motion.p>
    </div>
  );
}
