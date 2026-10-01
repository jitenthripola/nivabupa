'use client';

import React, { useState } from 'react';
import { Check, Copy, ExternalLink, X, Smartphone, Globe, ArrowRight } from 'lucide-react';

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
  const [copied, setCopied] = useState(true); // Automatically copied on open

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top brand header */}
        <div className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold">Share to Instagram</h3>
              <p className="text-xs text-white/90">2 quick steps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Step 1: Confirmation banner */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-sm font-semibold text-emerald-900">
                Your message has been copied!
              </span>
            </div>
            <button
              onClick={handleCopyAgain}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Snippet preview */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic max-h-24 overflow-y-auto">
            &ldquo;{message}&rdquo;
          </div>

          {/* Simple 2-Step Instructions */}
          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0077C8] font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <span>Tap below to open Instagram on your mobile app or browser.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0077C8] font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <span>
                Create a New Post or Story and <strong>Paste</strong> the copied text into your caption!
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={onConfirmOpenApp}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#E1306C] via-[#FD1D1D] to-[#FCB045] hover:opacity-95 shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>Open Instagram App</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onConfirmOpenApp}
              className="w-full py-2.5 px-4 rounded-xl font-medium text-slate-600 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-2 text-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Or open in web browser (instagram.com)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
