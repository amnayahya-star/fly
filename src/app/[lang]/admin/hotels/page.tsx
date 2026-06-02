"use client";
import React, { useState, useEffect } from 'react';
import * as motion from 'framer-motion/client';
import { Building2, Plus, Trash2 } from 'lucide-react';
import { addHotel, getHotels, deleteHotel } from '@/app/actions';

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image: '',
    price: '',
    rating: '5.0',
    reviews: '0',
    amenities: 'Free Wi-Fi, Pool, Spa'
  });

  const loadHotels = async () => {
    const data = await getHotels();
    setHotels(data);
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addHotel(formData);
    await loadHotels();
    setLoading(false);
    setShowForm(false);
    setFormData({
      name: '', location: '', image: '', price: '', rating: '5.0', reviews: '0', amenities: 'Free Wi-Fi, Pool, Spa'
    });
  };

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure you want to delete this hotel?')) {
      await deleteHotel(id);
      await loadHotels();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Hotels</h1>
          <p className="text-white/60">Add, edit, or remove hotels from the platform.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4CA1FF] hover:bg-[#0066FF] text-[#060b19] hover:text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Hotel
        </button>
      </div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#4CA1FF]" />
            New Hotel Details
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Hotel Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. Burj Al Arab" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Location</label>
              <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. Dubai, UAE" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Price (per night)</label>
              <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. $1,200" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Image URL / Path</label>
              <input required type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. /hotel1.jpg" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Rating</label>
              <input required type="text" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. 5.0" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Amenities (Comma separated)</label>
              <input required type="text" value={formData.amenities} onChange={e => setFormData({...formData, amenities: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. Free Wi-Fi, Pool" />
            </div>

            <div className="lg:col-span-3 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">Cancel</button>
              <button disabled={loading} type="submit" className="px-6 py-2.5 rounded-xl bg-[#4CA1FF] hover:bg-[#0066FF] text-[#060b19] hover:text-white font-bold transition-colors disabled:opacity-50">
                {loading ? 'Adding...' : 'Save Hotel'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Hotels List */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/20 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Hotel Name</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Location</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Price/Night</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">{hotel.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/80">{hotel.location}</span>
                </td>
                <td className="px-6 py-4 font-bold text-[#4CA1FF]">{hotel.price}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(hotel.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {hotels.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-white/50">No hotels found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
