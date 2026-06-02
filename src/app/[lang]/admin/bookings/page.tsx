"use client";
import React, { useState, useEffect } from 'react';
import { Users, Trash2, Search, Download } from 'lucide-react';
import { getAllBookings, deleteBooking } from '@/app/actions';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const loadBookings = async () => {
    const data = await getAllBookings();
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure you want to cancel and delete this booking?')) {
      await deleteBooking(id);
      await loadBookings();
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.pnr.toLowerCase().includes(search.toLowerCase()) || 
    (b.user?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Bookings</h1>
          <p className="text-white/60">View and cancel passenger bookings.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-xl border border-white/10">
          <Search className="w-5 h-5 text-white/50" />
          <input 
            type="text" 
            placeholder="Search PNR or Name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-white placeholder-white/50 w-48" 
          />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/20 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">PNR</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Passenger</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Flight Details</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Date Booked</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-bold text-[#4CA1FF]">{booking.pnr}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-400/30">
                      {booking.user?.name?.[0] || 'G'}
                    </div>
                    <div>
                      <span className="font-semibold text-white block">{booking.user?.name || 'Guest User'}</span>
                      <span className="text-xs text-white/50">{booking.user?.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/80">{booking.flight?.from} → {booking.flight?.to}</span>
                  <span className="block text-xs text-white/40">{booking.flight?.airline} • {booking.flight?.departureTime}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/80">{new Date(booking.createdAt).toLocaleDateString()}</span>
                  <span className="block text-xs text-white/40">{new Date(booking.createdAt).toLocaleTimeString()}</span>
                </td>
                <td className="px-6 py-4 flex items-center justify-end gap-2">
                  <button className="p-2 rounded-lg text-white/40 hover:text-[#4CA1FF] hover:bg-[#4CA1FF]/10 transition-colors" title="Download Ticket">
                    <Download className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(booking.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Cancel Booking">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-white/50">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
