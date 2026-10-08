'use client';

import React from 'react';
import { Loader2, ExternalLink } from 'lucide-react';
import { PLATFORMS_CONFIG } from '@/lib/mockData';
import { SocialPlatform } from '@/types';

interface ShareButtonProps {
  platform: SocialPlatform;
  isLoading: boolean;
  onShare: () => void;
  className?: string;
  isStickyMobile?: boolean;
}

export default function ShareButton({
  platform,
  isLoading,
  onShare,
  className = '',
  isStickyMobile = false,
}: ShareButtonProps) {
  const config = PLATFORMS_CONFIG[platform];

  return (
    <button
      type="button"
      onClick={onShare}
      disabled={isLoading}
      id={isStickyMobile ? 'sticky-mobile-share-btn' : 'main-share-cta-btn'}
      aria-label={`${config.actionText} - Open sharing flow`}
      className={`group relative inline-flex items-center justify-center gap-3 w-full min-h-[52px] px-6 py-3.5 rounded-xl font-bold text-white shadow-md transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-wait focus:outline-hidden focus:ring-4 focus:ring-sky-200 ${isLoading
          ? 'bg-slate-400'
          : 'bg-gradient-to-r from-[#009FE3] via-[#0089C5] to-[#0077C8] hover:from-[#0089C5] hover:to-[#005B99] hover:shadow-lg hover:shadow-sky-500/25 active:scale-[0.99]'
        } ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="text-base tracking-wide">Preparing Share...</span>
        </>
      ) : (
        <>
          <span className="text-base tracking-wide flex items-center gap-2">
            <span>{config.actionText}</span>
          </span>
          <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </>
      )}
    </button>
  );
}
