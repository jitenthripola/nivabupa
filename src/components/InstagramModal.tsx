'use client';

import React, { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  X,
  Smartphone,
  Globe,
  ExternalLink,
  PlusSquare,
  Share2,
  AtSign,
} from 'lucide-react';

interface InstagramModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirmOpenApp: () => void;
}

export default function InstagramModal({
  isOpen,
  message,
  onClose,
  onConfirmOpenApp,
}: InstagramModalProps) {
  const [copied, setCopied] = useState(true);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanShare(true);
    }
  }, []);

  if (!isOpen) return null;

  const handleCopyAgain = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Copy error', e);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: 'Niva Bupa Claim Experience',
        text: message,
        url: 'https://www.instagram.com/nivabupa/',
      });
      onConfirmOpenApp();
    } catch (err) {
      console.warn('Native share dismissed or failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col">
        {/* Top Brand Header */}
        <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold">Post on Instagram</h3>
              <p className="text-xs text-white/90">Direct access &amp; instructions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {/* Clipboard Banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-emerald-900 block">
                  Message copied to clipboard!
                </span>
                <span className="text-[11px] text-emerald-700">
                  Ready to paste into your Instagram post caption
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyAgain}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer px-2.5 py-1 rounded-lg bg-emerald-100/60 hover:bg-emerald-200/60 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Copy again'}</span>
            </button>
          </div>

          {/* Copied Text Preview */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-700">Your Advocacy Caption:</span>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic max-h-20 overflow-y-auto whitespace-pre-wrap">
              &ldquo;{message}&rdquo;
            </div>
          </div>

          {/* Explanation Box: Why Instagram doesn't show a post popup automatically */}
          <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <PlusSquare className="w-4 h-4 text-amber-600" />
              <span>How to create your post on Instagram:</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Instagram strictly restricts external websites from automatically triggering the &ldquo;New Post&rdquo; popup. Follow these steps:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-amber-200/80 shadow-2xs">
                <span className="font-bold text-slate-900 block mb-1">💻 On Computer:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  In Instagram&apos;s left sidebar, click the{' '}
                  <strong className="text-[#E1306C] bg-pink-50 px-1 py-0.5 rounded border border-pink-200">
                    + Create
                  </strong>{' '}
                  button to open the post popup dialog.
                </p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-amber-200/80 shadow-2xs">
                <span className="font-bold text-slate-900 block mb-1">📱 On Phone App:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Tap the{' '}
                  <strong className="text-[#E1306C] bg-pink-50 px-1 py-0.5 rounded border border-pink-200">
                    +
                  </strong>{' '}
                  icon at the bottom or top of your screen to create a post or story.
                </p>
              </div>
            </div>
          </div>

          {/* Action Links - Native Anchor tags that can NEVER be blocked by popup blockers */}
          <div className="space-y-2 pt-1 shrink-0">
            {/* Native device share sheet (if supported) */}
            {canShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full min-h-[46px] py-2.5 px-4 rounded-xl font-bold text-white bg-[#0A192F] hover:bg-[#1E293B] shadow-sm flex items-center justify-center gap-2 text-xs cursor-pointer transition-colors"
              >
                <Share2 className="w-4 h-4 text-sky-400" />
                <span>Share via Phone / Device Share Sheet</span>
              </button>
            )}

            {/* Direct Open Instagram Link - Native A tag guarantees it opens in new tab without popup blocker */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onConfirmOpenApp}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#FCB045] hover:opacity-95 shadow-md flex items-center justify-center gap-2 text-sm transition-opacity"
            >
              <Globe className="w-4 h-4" />
              <span>Open Instagram (instagram.com)</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-90" />
            </a>

            {/* Direct link to @nivabupa on Instagram */}
            <a
              href="https://www.instagram.com/nivabupa/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onConfirmOpenApp}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-2 text-xs transition-colors"
            >
              <AtSign className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>Visit &amp; Tag @nivabupa on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 rounded-xl font-medium text-slate-500 hover:bg-slate-100 flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
