'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
}

export default function LoadingState({
  message = 'Preparing your secure advocacy link...',
  subtext = 'Connecting to Niva Bupa share gateway',
}: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs text-center animate-in fade-in duration-200">
      <div className="w-12 h-12 rounded-full bg-sky-50 text-[#009FE3] flex items-center justify-center mb-3">
        <Loader2 className="w-6 h-6 animate-spin text-[#009FE3]" />
      </div>
      <h4 className="text-sm font-bold text-slate-800">{message}</h4>
      <p className="text-xs text-slate-500 mt-1">{subtext}</p>
    </div>
  );
}
