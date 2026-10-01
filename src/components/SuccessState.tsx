'use client';

import React, { useEffect } from 'react';
import { CheckCircle, Link2, Sparkles, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SocialPlatform } from '@/types';
import { PLATFORMS_CONFIG } from '@/lib/mockData';

interface SuccessStateProps {
  platform: SocialPlatform;
  onDone: () => void;
  onSubmitPostLinkClick: () => void;
}

export default function SuccessState({
  platform,
  onDone,
  onSubmitPostLinkClick,
}: SuccessStateProps) {
  const currentConfig = PLATFORMS_CONFIG[platform];

  useEffect(() => {
    // Fire festive celebration confetti
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#009FE3', '#0077C8', '#16A34A', '#FFB703', '#00B4D8'],
      });
    } catch {
      // safe fallback if canvas is restricted
    }
  }, []);

  return (
    <div
      id="success-confirmation-card"
      className="rounded-3xl bg-gradient-to-b from-white via-emerald-50/20 to-sky-50/30 border border-emerald-200/90 shadow-lg p-6 sm:p-8 text-center animate-in zoom-in-95 duration-300"
    >
      {/* Large check icon */}
      <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100/80 border-2 border-emerald-300 flex items-center justify-center text-emerald-600 mb-4 shadow-md shadow-emerald-500/15 animate-bounce-subtle">
        <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2] text-[#16A34A]" />
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-xs">
          <Sparkles className="w-3.5 h-3.5 fill-white" />
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-2">
        <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
        <span>Handoff completed for {currentConfig.name}</span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
        Thank you for sharing!
      </h2>

      {/* Supporting text */}
      <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
        Your experience could help another family make a confident healthcare decision.
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={onSubmitPostLinkClick}
          id="submit-post-link-trigger-btn"
          className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#009FE3] to-[#0077C8] hover:from-[#0089C5] hover:to-[#0064A8] shadow-sm transition-all cursor-pointer"
        >
          <Link2 className="w-4 h-4" />
          <span>Submit Post Link</span>
        </button>

        <button
          type="button"
          onClick={onDone}
          id="done-btn"
          className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
        >
          <span>Done</span>
        </button>
      </div>
    </div>
  );
}
