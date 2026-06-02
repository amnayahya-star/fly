"use client";
import React, { useState, useEffect } from 'react';
import * as motion from 'framer-motion/client';
import { Ticket, Plus, Trash2 } from 'lucide-react';
import { addDeal, getDeals, deleteDeal } from '@/app/actions';

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    originalPrice: '',
    discountPrice: '',
    tag: '',
    expiresIn: '',
    type: 'flights'
  });

  const loadDeals = async () => {
    const data = await getDeals();
    setDeals(data);
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addDeal(formData);
    await loadDeals();
    setLoading(false);
    setShowForm(false);
    setFormData({
      title: '', description: '', image: '', originalPrice: '', discountPrice: '', tag: '', expiresIn: '', type: 'flights'
    });
  };

  const handleDelete = async (id: string) => {
    if(confirm('Are you sure you want to delete this deal?')) {
      await deleteDeal(id);
      await loadDeals();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Deals</h1>
          <p className="text-white/60">Add, edit, or remove special deals from the platform.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4CA1FF] hover:bg-[#0066FF] text-[#060b19] hover:text-white px-5 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Deal
        </button>
      </div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#4CA1FF]" />
            New Deal Details
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Deal Title</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. Summer Special" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Description</label>
              <input required type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. Save big on flights to..." />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Image URL</label>
              <input required type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. /deal.jpg" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Original Price</label>
              <input required type="text" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. $500" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Discount Price</label>
              <input required type="text" value={formData.discountPrice} onChange={e => setFormData({...formData, discountPrice: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. $300" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Tag</label>
              <input required type="text" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. -40%" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Expires In</label>
              <input required type="text" value={formData.expiresIn} onChange={e => setFormData({...formData, expiresIn: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none" placeholder="e.g. 2 Days Left" />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">Category</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:border-[#4CA1FF] outline-none appearance-none">
                <option value="flights" className="bg-[#060b19]">Flights</option>
                <option value="hotels" className="bg-[#060b19]">Hotels</option>
                <option value="packages" className="bg-[#060b19]">Packages</option>
              </select>
            </div>

            <div className="lg:col-span-3 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors">Cancel</button>
              <button disabled={loading} type="submit" className="px-6 py-2.5 rounded-xl bg-[#4CA1FF] hover:bg-[#0066FF] text-[#060b19] hover:text-white font-bold transition-colors disabled:opacity-50">
                {loading ? 'Adding...' : 'Save Deal'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Deals List */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/20 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Deal Title</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Category</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Price</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium">Expires</th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/50 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {deals.map((deal) => (
              <tr key={deal.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">{deal.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/80 uppercase text-xs tracking-wider">{deal.type}</span>
                </td>
                <td className="px-6 py-4 font-bold text-[#4CA1FF]">{deal.discountPrice} <span className="text-white/50 line-through text-sm font-normal">{deal.originalPrice}</span></td>
                <td className="px-6 py-4">
                  <span className="text-white/80">{deal.expiresIn}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(deal.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {deals.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-white/50">No deals found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
