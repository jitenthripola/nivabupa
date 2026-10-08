'use client';

import React, { useState } from 'react';
import { Check, Copy, ExternalLink, X, ArrowRight, Keyboard, ShieldAlert } from 'lucide-react';

interface LinkedInModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirmOpenLinkedIn: () => void;
}

export default function LinkedInModal({
  isOpen,
  message,
  onClose,
  onConfirmOpenLinkedIn,
}: LinkedInModalProps) {
  const [copied, setCopied] = useState(true);

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
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* LinkedIn Branded Header */}
        <div className="bg-[#0A66C2] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold">Ready to Post on LinkedIn</h3>
              <p className="text-xs text-white/90">Message copied to your clipboard</p>
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

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Success Banner: Copied to Clipboard */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-emerald-900 block">
                  Your message has been copied!
                </span>
                <span className="text-[11px] text-emerald-700">
                  Ready to paste into your LinkedIn post
                </span>
              </div>
            </div>
            <button
              onClick={handleCopyAgain}
              className="text-xs font-medium text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer px-2 py-1 rounded bg-emerald-100/60 hover:bg-emerald-200/60 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Copy again'}</span>
            </button>
          </div>

          {/* Explanation Callout: Why LinkedIn does this */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Why doesn&apos;t the text appear automatically?</strong> LinkedIn&apos;s anti-spam security policy blocks external websites from automatically filling your post text. You only need to paste your copied message!
            </p>
          </div>

          {/* Message Preview */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700">Copied Message Preview:</span>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic max-h-24 overflow-y-auto whitespace-pre-wrap">
              &ldquo;{message}&rdquo;
            </div>
          </div>

          {/* Clear 2-Step Instructions */}
          <div className="space-y-2 text-xs text-slate-600 bg-sky-50/50 p-3.5 rounded-xl border border-sky-100">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0A66C2] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <span>
                Click <strong>&ldquo;Open LinkedIn &amp; Paste&rdquo;</strong> below. Your claim card preview will load automatically.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#0A66C2] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>Click into the LinkedIn post box and press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[11px] font-semibold text-slate-800 shadow-2xs">
                  Ctrl + V
                </kbd>
                <span>or</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[11px] font-semibold text-slate-800 shadow-2xs">
                  Cmd + V
                </kbd>
                <span>to paste your message!</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={onConfirmOpenLinkedIn}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl font-bold text-white bg-[#0A66C2] hover:bg-[#004182] shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer transition-colors"
            >
              <span>Open LinkedIn &amp; Paste</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl font-medium text-slate-600 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
