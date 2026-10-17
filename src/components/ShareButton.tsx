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
      style={{ touchAction: 'manipulation' }}
      className={`group relative inline-flex items-center justify-center gap-2.5 w-full min-h-[50px] sm:min-h-[54px] px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-white shadow-md transition-all duration-150 cursor-pointer disabled:opacity-70 disabled:cursor-wait focus:outline-hidden focus:ring-4 focus:ring-sky-200 active:opacity-90 ${isLoading
          ? 'bg-slate-400'
          : 'bg-gradient-to-r from-[#009FE3] via-[#0089C5] to-[#0077C8] hover:from-[#0089C5] hover:to-[#005B99] hover:shadow-lg hover:shadow-sky-500/25'
        } ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-white shrink-0" />
          <span className="text-sm sm:text-base tracking-wide">Preparing Share...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <span className="text-sm sm:text-base tracking-wide">{config.actionText}</span>
          <ExternalLink className="w-4 h-4 opacity-80 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      )}
    </button>
  );
}
