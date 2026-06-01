"use client";
import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import Image from "next/image";
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Plane, Globe } from 'lucide-react';

import { signup } from '@/app/actions';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signup(formData.name, formData.email, formData.password);
    if (result.success) {
      alert('Sign up successful!');
      window.location.href = '/';
    } else {
      alert(result.error);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#060b19] flex items-center justify-center selection:bg-[#4CA1FF] selection:text-white px-4">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/airplane_background.jpg"
          alt="Airplane background"
          fill
          priority
          className="object-cover object-center scale-105 blur-sm"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#030d22]/90 via-[#030d22]/80 to-[#032a70]/60" />
      </div>

      {/* Navigation - simple version for auth pages */}
      <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <svg className="w-10 h-auto text-white transform group-hover:scale-105 transition-transform duration-300" viewBox="0 0 100 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0 25 Q 30 5 95 0 Q 50 15 12 23 Z" />
            <path d="M 6 31 Q 35 15 88 14 Q 45 25 18 29 Z" />
            <path d="M 12 37 Q 40 25 82 28 Q 40 35 24 35 Z" />
          </svg>
          <span className="text-xl font-bold tracking-[0.15em] text-white">AERO</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2">
          Back to Home
        </Link>
      </nav>

      {/* Auth Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <div className="relative w-full rounded-[2rem] p-8 sm:p-10 bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(3,42,112,0.5)]">
          <div className="mb-8 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-16 h-16 bg-[#0066FF]/20 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-[#0066FF]/30"
            >
              <Globe className="w-8 h-8 text-[#4CA1FF]" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Join AERO</h1>
            <p className="text-white/60 text-sm">Create an account to book flights faster and unlock exclusive deals.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-white/40 group-focus-within:text-[#4CA1FF] transition-colors" />
              </div>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#4CA1FF]/50 focus:bg-black/40 transition-all text-sm"
                placeholder="Full Name"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/40 group-focus-within:text-[#4CA1FF] transition-colors" />
              </div>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#4CA1FF]/50 focus:bg-black/40 transition-all text-sm"
                placeholder="Email Address"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/40 group-focus-within:text-[#4CA1FF] transition-colors" />
              </div>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#4CA1FF]/50 focus:bg-black/40 transition-all text-sm"
                placeholder="Password"
              />
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-[#0066FF] hover:bg-[#0052cc] text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(0,102,255,0.4)] group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"></div>
              <span className="relative z-10 text-[15px]">Create Account</span>
              <Plane className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-white/60 text-sm">
              Already have an account?{' '}
              <Link href="#" className="text-[#4CA1FF] font-medium hover:text-white transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
