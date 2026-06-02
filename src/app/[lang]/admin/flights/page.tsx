"use client";
import React, { useState, useEffect } from 'react';
import * as motion from 'framer-motion/client';
import { Plane, Plus, Trash2 } from 'lucide-react';
import { addFlight, getFlights, deleteFlight } from '@/app/actions';

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    airline: '',
    logo: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    from: '',
    to: '',
    price: '',
    type: 'Direct'
  });

  const loadFlights = async () => {
    const data = await getFlights();
    setFlights(data);
  };

  useEffect(() => {
    loadFlights();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addFlight(formData);
    await loadFlights();
    setLoading(false);
    setShowForm(false);
    setFormData({
      airline: '', logo: '', departureTime: '', arrivalTime: '', duration: '', from: '', to: '', price: '', type: 'Direct'
    });
  };

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure you want to delete this flight? Associated bookings will also be deleted.')) {
      await deleteFlight(id);
      await loadFlights();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Flights</h1>
          <p className="text-white/60">Add, edit, or remove flights from the platform.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4CA1FF] hover:bg-[#0066FF] text-[#060b19] hover:text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Flight
        </button>
      </div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#4CA1FF]" />
            New Flight Details
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Airline Name</label>
              <input required type="text" value={formData.airline} onChange={e => setFormData({...formData, airline: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. Emirates" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Airline Logo (Letter/Icon)</label>
              <input required type="text" value={formData.logo} onChange={e => setFormData({...formData, logo: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. E" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Price</label>
              <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. $450" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">From (Airport Code)</label>
              <input required type="text" value={formData.from} onChange={e => setFormData({...formData, from: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. DXB" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">To (Airport Code)</label>
              <input required type="text" value={formData.to} onChange={e => setFormData({...formData, to: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. LHR" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Flight Type</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none appearance-none">
                <option value="Direct" className="bg-[#060b19]">Direct</option>
                <option value="1 Stop" className="bg-[#060b19]">1 Stop</option>
                <option value="2+ Stops" className="bg-[#060b19]">2+ Stops</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Departure Time</label>
              <input required type="text" value={formData.departureTime} onChange={e => setFormData({...formData, departureTime: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. 08:00 AM" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Arrival Time</label>
              <input required type="text" value={formData.arrivalTime} onChange={e => setFormData({...formData, arrivalTime: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. 11:30 AM" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Duration</label>
              <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. 3h 30m" />
            </div>

            <div className="lg:col-span-3 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">Cancel</button>
              <button disabled={loading} type="submit" className="px-6 py-2.5 rounded-xl bg-[#4CA1FF] hover:bg-[#0066FF] text-[#060b19] hover:text-white font-bold transition-colors disabled:opacity-50">
                {loading ? 'Adding...' : 'Save Flight'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Flights List */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/20 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Airline</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Route</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Time</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Price</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {flights.map((flight) => (
              <tr key={flight.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold border border-white/10">{flight.logo}</div>
                    <span className="font-semibold text-white">{flight.airline}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/80">{flight.from} → {flight.to}</span>
                  <span className="block text-xs text-white/40">{flight.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/80">{flight.departureTime} - {flight.arrivalTime}</span>
                  <span className="block text-xs text-white/40">{flight.duration}</span>
                </td>
                <td className="px-6 py-4 font-bold text-[#4CA1FF]">{flight.price}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(flight.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {flights.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-white/50">No flights found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
