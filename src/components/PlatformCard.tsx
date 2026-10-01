'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { PlatformConfig, SocialPlatform } from '@/types';

interface PlatformCardProps {
  platform: PlatformConfig;
  isSelected: boolean;
  onSelect: (platformId: SocialPlatform) => void;
}

export default function PlatformCard({
  platform,
  isSelected,
  onSelect,
}: PlatformCardProps) {
  // Brand specific icons/SVGs
  const renderIcon = () => {
    switch (platform.id) {
      case 'linkedin':
        return (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        );
      case 'x':
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.76 5.6c1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(platform.id)}
      id={`platform-btn-${platform.id}`}
      aria-label={`Share on ${platform.name}`}
      aria-pressed={isSelected}
      className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 cursor-pointer text-center select-none outline-hidden focus-visible:ring-4 focus-visible:ring-sky-200 ${
        isSelected
          ? 'bg-gradient-to-b from-sky-50/90 to-blue-50/70 border-2 border-[#009FE3] shadow-md shadow-sky-500/15 translate-y-[-2px]'
          : 'bg-white border border-slate-200 hover:border-sky-300 hover:bg-slate-50/70 hover:shadow-xs'
      }`}
    >
      {/* Selection indicator pill */}
      {isSelected && (
        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#009FE3] text-white flex items-center justify-center shadow-xs animate-in zoom-in-50 duration-150">
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        </span>
      )}

      {/* Platform Icon with brand accent tint on hover/active */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
          isSelected
            ? 'bg-white shadow-xs text-[#009FE3]'
            : 'bg-slate-100 text-slate-700 group-hover:bg-sky-50 group-hover:text-[#0077C8]'
        }`}
        style={isSelected ? { color: platform.brandColor } : undefined}
      >
        {renderIcon()}
      </div>

      {/* Platform Name */}
      <span
        className={`mt-2.5 text-sm font-bold tracking-tight transition-colors ${
          isSelected ? 'text-[#0A192F]' : 'text-slate-700 group-hover:text-slate-900'
        }`}
      >
        {platform.name}
      </span>

      {/* Tagline / subtext */}
      <span className="mt-0.5 text-[11px] text-slate-500 leading-tight hidden sm:block">
        {platform.tagline}
      </span>
    </button>
  );
}
