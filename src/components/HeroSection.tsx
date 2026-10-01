'use client';

import React from 'react';
import { ArrowDown, Heart, Shield, Users, Sparkles, CheckCircle } from 'lucide-react';

interface HeroSectionProps {
  onShareClick: () => void;
}

export default function HeroSection({ onShareClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#F0F9FF] to-[#E1F4FD] border border-sky-100 shadow-sm p-6 sm:p-8 md:p-10 transition-all">
      {/* Decorative background glow spheres */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-[#009FE3]/15 to-[#00B4D8]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-sky-400/10 to-indigo-500/10 blur-2xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Headline, Supporting text, Primary CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-sky-200/80 shadow-xs mb-4">
            <span className="flex h-2 w-2 rounded-full bg-[#009FE3] animate-ping" />
            <span className="text-xs font-semibold text-[#0077C8] tracking-wide">
              Niva Bupa Claimant Care
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A192F] tracking-tight leading-[1.2]">
            We’re glad we could be <span className="bg-gradient-to-r from-[#009FE3] to-[#0077C8] bg-clip-text text-transparent">there for you!</span>
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
            Your story can help others protect their families and avoid financial stress. Sharing your experience guides families to choose reliable health coverage when they need it most.
          </p>

          {/* Social Proof metrics */}
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>12,000+ Family Testimonials</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle className="w-4 h-4 text-[#009FE3]" />
              <span>30-Min Cashless Promise</span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onShareClick}
              id="hero-share-cta-button"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#009FE3] to-[#0077C8] hover:from-[#0089C5] hover:to-[#0064A8] shadow-md shadow-sky-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-hidden focus:ring-4 focus:ring-sky-200 text-base cursor-pointer"
            >
              <span>Share Your Experience</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <span className="text-xs text-slate-500 text-center sm:text-left">
              Takes ~30 seconds • No app login required
            </span>
          </div>
        </div>

        {/* Right Column: Healthcare & Family Care Visual Illustration */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square rounded-3xl bg-gradient-to-br from-white via-sky-50/70 to-blue-50/50 border border-sky-100/80 shadow-md p-6 flex flex-col items-center justify-center">
            {/* Ambient circular patterns */}
            <div className="absolute inset-4 rounded-2xl border border-sky-200/40 pointer-events-none" />
            <div className="absolute inset-8 rounded-2xl border border-dashed border-sky-200/50 pointer-events-none" />

            {/* Central Heart & Shield Care Visual */}
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#009FE3] to-[#0077C8] text-white flex items-center justify-center shadow-lg shadow-sky-400/30 animate-pulse-subtle">
              <Shield className="w-12 h-12 text-white stroke-[1.8]" />
              <div className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-emerald-500 text-white shadow-md">
                <Heart className="w-5 h-5 fill-white stroke-none" />
              </div>
            </div>

            {/* Floating Reassurance Badges */}
            <div className="absolute top-6 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-sky-100 flex items-center gap-2 text-xs font-semibold text-slate-700 animate-float-slow">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Claim Approved</span>
            </div>

            <div className="absolute bottom-6 right-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-sky-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Users className="w-3.5 h-3.5 text-[#009FE3]" />
              <span>Family Protected</span>
            </div>

            <div className="absolute top-1/2 -right-3 -translate-y-1/2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-sky-100 flex items-center gap-1.5 text-xs font-semibold text-amber-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Seamless Care</span>
            </div>

            {/* Bottom Caption inside visual */}
            <p className="mt-8 text-center text-xs font-medium text-slate-600 max-w-[240px]">
              Standing with you at every step of your health journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
