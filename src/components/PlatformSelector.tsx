'use client';

import React from 'react';
import PlatformCard from './PlatformCard';
import { PLATFORMS_LIST } from '@/lib/mockData';
import { SocialPlatform } from '@/types';
import { Share2 } from 'lucide-react';

interface PlatformSelectorProps {
  selectedPlatform: SocialPlatform;
  onSelectPlatform: (platform: SocialPlatform) => void;
}

export default function PlatformSelector({
  selectedPlatform,
  onSelectPlatform,
}: PlatformSelectorProps) {
  return (
    <section id="sharing-section" className="scroll-mt-20">
      <div className="text-center sm:text-left mb-5">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-md bg-sky-100 text-[#0077C8] flex items-center justify-center">
            <Share2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8]">
            Step 1 of 2
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] tracking-tight">
          Share your experience
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Choose where you’d like to share your experience.
        </p>
      </div>

      {/* Grid: 2 columns on mobile, 5 columns on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        {PLATFORMS_LIST.map((platform, idx) => {
          // On mobile, the 5th item can span both columns to look centered and balanced
          const isFifthOnMobile = idx === 4;
          return (
            <div
              key={platform.id}
              className={isFifthOnMobile ? 'col-span-2 md:col-span-1' : 'col-span-1'}
            >
              <PlatformCard
                platform={platform}
                isSelected={selectedPlatform === platform.id}
                onSelect={onSelectPlatform}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
