"use client";
import React, { useEffect, useState } from 'react';
import * as motion from 'framer-motion/client';
import { Users, Plane, Building2, Ticket, TrendingUp, Search } from 'lucide-react';
import { getDashboardStats, getRecentBookings } from '@/app/actions';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    flights: 0,
    hotels: 0,
    deals: 0
  });
  
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    getDashboardStats().then(setStats);
    getRecentBookings().then(setRecentBookings);
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
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full -z-10 blur-xl opacity-50 group-hover:opacity-80 transition-opacity`}></div>
              
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-lg border border-white/10">
            <Search className="w-4 h-4 text-white/50" />
            <input type="text" placeholder="Search PNR..." className="bg-transparent border-none outline-none text-sm text-white placeholder-white/50 w-32" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-xs uppercase tracking-wider text-white/50 font-medium">PNR</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider text-white/50 font-medium">Passenger</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider text-white/50 font-medium">Flight Route</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider text-white/50 font-medium">Status</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider text-white/50 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4 font-bold text-[#4CA1FF]">{booking.pnr}</td>
                  <td className="px-4 py-4 text-white/90 font-medium">{booking.user?.name || 'Guest'}</td>
                  <td className="px-4 py-4">
                    <span className="text-white/80">{booking.flight?.from} → {booking.flight?.to}</span>
                    <span className="block text-xs text-white/40">{booking.flight?.airline}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-4 py-4 text-white/60 text-sm">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/50 text-sm">
                    No bookings found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
