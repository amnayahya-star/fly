"use client";
import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import Image from "next/image";
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import { Tag, Plane, Building2, Ticket, ArrowRight, Clock } from 'lucide-react';
import clsx from 'clsx';

const categories = [
  { id: 'all', label: 'All Deals', icon: Tag },
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels', icon: Building2 },
  { id: 'packages', label: 'Packages', icon: Ticket },
];

import { getDeals } from '@/app/actions';

export default function DealsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [deals, setDeals] = useState<any[]>([]);

  React.useEffect(() => {
    getDeals().then(setDeals);
  }, []);

  const filteredDeals = deals.filter(
    deal => activeCategory === 'all' || deal.type === activeCategory
  );

  return (
    <main className="relative min-h-screen w-full bg-[#060b19] selection:bg-[#4CA1FF] selection:text-white pb-24">
      
      {/* Background Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-br from-[#0066FF]/20 to-[#A020F0]/20 blur-[150px] rounded-full pointer-events-none"></div>

      <Navbar />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 xl:px-24 pt-40">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#4CA1FF] text-sm font-semibold mb-6">
            <Tag className="w-4 h-4" />
            Limited Time Offers
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Exclusive AERO Deals</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Unlock incredible savings on flights, luxury hotels, and complete travel packages. Don't miss out on these limited-time offers.</p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={clsx(
                  "flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold transition-all duration-300",
                  isActive 
                    ? "bg-white text-[#060b19] shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                    : "bg-white/5 text-white/80 hover:text-white border border-white/10 hover:bg-white/10"
                )}
              >
                <Icon className={clsx("w-4 h-4", isActive ? "text-[#060b19]" : "text-white/60")} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredDeals.map((deal, index) => (
            <motion.div 
              key={deal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer shadow-lg flex flex-col sm:flex-row h-auto sm:h-[260px]"
            >
              {/* Image Section */}
              <div className="relative w-full sm:w-[40%] h-[200px] sm:h-full overflow-hidden shrink-0">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#060b19]/80 hidden sm:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060b19] to-transparent sm:hidden" />
                
                {/* Discount Tag */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#FF0055] to-[#FF4B2B] text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-lg">
                  {deal.tag}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center relative z-10 bg-[#060b19] sm:bg-transparent">
                <div className="flex items-center gap-1.5 text-white/50 text-xs font-semibold mb-3 tracking-wider uppercase">
                  <Clock className="w-3.5 h-3.5 text-[#FF4B2B]" />
                  {deal.expiresIn}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#4CA1FF] transition-colors">{deal.title}</h3>
                <p className="text-sm text-white/60 mb-6 line-clamp-2">{deal.description}</p>
                
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <p className="text-sm text-white/40 line-through mb-0.5">{deal.originalPrice}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-white">{deal.discountPrice}</p>
                  </div>
                  
                  <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#4CA1FF] transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
