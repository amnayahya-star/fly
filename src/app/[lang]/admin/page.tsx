"use client";
import React, { useEffect, useState } from 'react';
import * as motion from 'framer-motion/client';
import { Users, Plane, Building2, Ticket, TrendingUp } from 'lucide-react';
import { getDashboardStats } from '@/app/actions';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    flights: 0,
    hotels: 0,
    deals: 0
  });

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.users, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Flights', value: stats.flights, icon: Plane, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Listed Hotels', value: stats.hotels, icon: Building2, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Special Deals', value: stats.deals, icon: Ticket, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full -z-10 blur-xl opacity-50`}></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                  +12% <TrendingUp className="w-3 h-3" />
                </div>
              </div>
              
              <p className="text-white/60 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </motion.div>
          );
        })}
      </div>

      <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="flex flex-col gap-4">
          <p className="text-white/50 text-sm italic">Analytics chart and recent bookings will appear here...</p>
        </div>
      </div>
    </div>
  );
}
