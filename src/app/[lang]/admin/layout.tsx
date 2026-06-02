import React from 'react';
import Link from 'next/link';
import { Plane, Building2, Ticket, Users, BarChart3, Settings, Home, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#060b19] flex text-white selection:bg-[#4CA1FF] selection:text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <svg className="w-8 h-auto text-white" viewBox="0 0 100 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 25 Q 30 5 95 0 Q 50 15 12 23 Z" />
              <path d="M 6 31 Q 35 15 88 14 Q 45 25 18 29 Z" />
              <path d="M 12 37 Q 40 25 82 28 Q 40 35 24 35 Z" />
            </svg>
            <span className="text-xl font-bold tracking-[0.15em] text-white">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#4CA1FF]/20 text-[#4CA1FF] font-medium border border-[#4CA1FF]/30">
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/flights" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 font-medium transition-colors">
            <Plane className="w-5 h-5" />
            Flights
          </Link>
          <Link href="/admin/hotels" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 font-medium transition-colors">
            <Building2 className="w-5 h-5" />
            Hotels
          </Link>
          <Link href="/admin/deals" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 font-medium transition-colors">
            <Ticket className="w-5 h-5" />
            Deals
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 font-medium transition-colors">
            <Users className="w-5 h-5" />
            Bookings
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 font-medium transition-colors">
            <Home className="w-5 h-5" />
            View Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 bg-white/5 px-8 flex items-center justify-between backdrop-blur-md">
          <h2 className="text-xl font-semibold">Welcome, Admin</h2>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors">
              <Settings className="w-5 h-5 text-white/80" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#4CA1FF] flex items-center justify-center font-bold text-[#060b19]">
                A
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-semibold text-white leading-tight">Admin User</p>
                <p className="text-white/50 text-xs">admin@aero.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-[#4CA1FF]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          
          {children}
        </main>
      </div>
    </div>
  );
}
