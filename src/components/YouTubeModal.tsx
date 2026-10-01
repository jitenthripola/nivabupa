'use client';

import React, { useState } from 'react';
import { Copy, Check, Video, ArrowRight, X, ExternalLink, Sparkles } from 'lucide-react';

interface YouTubeModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirmOpenYouTube: () => void;
}

export default function YouTubeModal({
  isOpen,
  message,
  onClose,
  onConfirmOpenYouTube,
}: YouTubeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Copy error', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#FF0000] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Share your story on YouTube</h3>
              <p className="text-xs text-white/90">Video review & Short testimonial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Record a short 30-second phone video or YouTube Short sharing your cashless hospital settlement experience with Niva Bupa.
          </p>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Recommended Video Description
              </span>
              <button
                onClick={handleCopy}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-xs text-slate-700 italic max-h-24 overflow-y-auto">
              {message}
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-sky-100 text-[#0077C8] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>Copy the pre-formatted description and tags above.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-sky-100 text-[#0077C8] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <span>Open YouTube upload page or your YouTube mobile app.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-sky-100 text-[#0077C8] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <span>After publishing, return here and paste your video link!</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={onConfirmOpenYouTube}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl font-bold text-white bg-[#FF0000] hover:bg-[#CC0000] shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer transition-colors"
            >
              <span>Continue to YouTube Studio</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl font-medium text-slate-600 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
