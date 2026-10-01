'use client';

import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Niva Bupa Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            {/* Authentic Niva Bupa Brand Symbol */}
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#009FE3] via-[#0077C8] to-[#0A192F] shadow-sm text-white font-bold p-1">
              <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                {/* Modern Health Shield & Care Lotus motif */}
                <path
                  d="M18 3L6 8.5V16.8C6 24.3 11.1 31.3 18 33C24.9 31.3 30 24.3 30 16.8V8.5L18 3Z"
                  fill="url(#headerShieldGrad)"
                />
                <path
                  d="M18 10C16.3 10 15 11.3 15 13C15 15.5 18 19 18 19C18 19 21 15.5 21 13C21 11.3 19.7 10 18 10Z"
                  fill="#FFB703"
                />
                <circle cx="18" cy="23" r="2.5" fill="#FFFFFF" />
                <defs>
                  <linearGradient id="headerShieldGrad" x1="6" y1="3" x2="30" y2="33" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#009FE3" />
                    <stop offset="1" stopColor="#005B99" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[17px] font-extrabold tracking-tight text-[#0A192F]">
                  NIVA <span className="text-[#009FE3]">BUPA</span>
                </span>
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 -mt-0.5">
                Health Insurance
              </span>
            </div>
          </div>

          <span className="hidden sm:inline-block h-5 w-px bg-slate-200 mx-1" />

          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-[#0077C8] border border-sky-100">
            <span className="w-1.5 h-1.5 rounded-full bg-[#009FE3] animate-pulse"></span>
            Claimant Advocacy Journey
          </span>
        </div>

        {/* Security & Regulatory Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline font-medium">IRDAI Reg. No. 145</span>
            <span className="sm:hidden font-medium text-[11px]">IRDAI 145</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>
    </header>
  );
}
