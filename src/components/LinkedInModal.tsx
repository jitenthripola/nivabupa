'use client';

import React, { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  X,
  ArrowRight,
  ShieldAlert,
  Smartphone,
  Globe,
  Share2,
} from 'lucide-react';
import { getLinkedInShareUrls } from '@/lib/shareUrls';

interface LinkedInModalProps {
  isOpen: boolean;
  message: string;
  shareUrl?: string;
  onClose: () => void;
  onConfirmOpenLinkedIn: (customUrl?: string) => void;
}

export default function LinkedInModal({
  isOpen,
  message,
  shareUrl = '',
  onClose,
  onConfirmOpenLinkedIn,
}: LinkedInModalProps) {
  const [copied, setCopied] = useState(true);
  const [canShare, setCanShare] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const urls = getLinkedInShareUrls(shareUrl, message);
      setIsMobile(urls.isMobile);
      setIsIOS(urls.isIOS);
      setIsAndroid(urls.isAndroid);
      if (typeof navigator.share === 'function') {
        setCanShare(true);
      }
    }
  }, [shareUrl, message]);

  if (!isOpen) return null;

  const handleCopyAgain = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Copy error', e);
    }
  };

  const handleOpenLinkedInApp = async () => {
    const urls = getLinkedInShareUrls(shareUrl, message);

    if (urls.isAndroid) {
      window.location.href = urls.androidIntentUrl;
      onConfirmOpenLinkedIn(urls.androidIntentUrl);
      return;
    }

    if (urls.isIOS) {
      window.location.href = urls.mobileDirectUrl;
      onConfirmOpenLinkedIn(urls.mobileDirectUrl);
      return;
    }

    // Web fallback: Open LinkedIn web Create Post
    if (typeof window !== 'undefined') {
      window.location.href = urls.webFallbackUrl;
    }
    onConfirmOpenLinkedIn(urls.webFallbackUrl);
  };

  const handleOpenWebFallback = () => {
    const urls = getLinkedInShareUrls(shareUrl, message);
    if (typeof window !== 'undefined') {
      window.location.href = urls.webFallbackUrl;
    }
    onConfirmOpenLinkedIn(urls.webFallbackUrl);
  };

  const handleNativeShareSheet = async () => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'Niva Bupa Claim Experience',
          text: message,
          url: shareUrl || (typeof window !== 'undefined' ? window.location.href : ''),
        });
        onConfirmOpenLinkedIn();
      } catch (err: unknown) {
        if ((err as Error)?.name !== 'AbortError') {
          console.warn('Share error:', err);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[94vh] flex flex-col">
        {/* LinkedIn Branded Header */}
        <div className="bg-[#0A66C2] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold">
                {isMobile ? 'Open in LinkedIn App' : 'Ready to Post on LinkedIn'}
              </h3>
              <p className="text-xs text-white/90">
                {isMobile
                  ? 'Direct mobile app access for iOS & Android'
                  : 'Message copied to your clipboard'}
              </p>
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
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
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
                  Ready to paste or share directly into LinkedIn
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

          {/* Mobile device indicator callout */}
          {isMobile ? (
            <div className="p-3.5 rounded-2xl bg-sky-50/90 border border-sky-200 text-xs text-sky-950 flex items-start gap-2.5">
              <Smartphone className="w-4 h-4 text-[#0A66C2] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-slate-900">
                  {isAndroid ? 'Android Device Detected' : isIOS ? 'iPhone / iOS Device Detected' : 'Mobile Device Detected'}
                </p>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Tapping <strong>&ldquo;Open in LinkedIn App&rdquo;</strong> will launch the official LinkedIn application on your phone so you can post without entering your password into the browser.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Why doesn&apos;t web text pre-fill automatically?</strong> LinkedIn&apos;s anti-spam policy blocks web pages from injecting post body text. You only need to paste (Ctrl+V / Cmd+V) your copied message!
              </p>
            </div>
          )}

          {/* Message Preview */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700">Advocacy Message Preview:</span>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic max-h-24 overflow-y-auto whitespace-pre-wrap">
              &ldquo;{message}&rdquo;
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            {isMobile ? (
              <>
                {/* Primary Mobile App Button */}
                <button
                  type="button"
                  onClick={handleOpenLinkedInApp}
                  className="w-full min-h-[50px] py-3 px-4 rounded-xl font-bold text-white bg-[#0A66C2] hover:bg-[#004182] shadow-md flex items-center justify-center gap-2.5 text-sm cursor-pointer transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-white" />
                  <span>Open in LinkedIn App</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-90" />
                </button>

                {/* Additional Native Share Sheet if available */}
                {canShare && !isAndroid && (
                  <button
                    type="button"
                    onClick={handleNativeShareSheet}
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl font-semibold text-white bg-[#0A192F] hover:bg-[#1E293B] shadow-xs flex items-center justify-center gap-2 text-xs cursor-pointer transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Share via Device Share Sheet</span>
                  </button>
                )}

                {/* Mobile Web Browser Fallback */}
                <button
                  type="button"
                  onClick={handleOpenWebFallback}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-2 text-xs transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>Open in Web Browser (linkedin.com)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>
              </>
            ) : (
              /* Desktop Flow */
              <button
                type="button"
                onClick={() => onConfirmOpenLinkedIn()}
                className="w-full min-h-[48px] py-3 px-4 rounded-xl font-bold text-white bg-[#0A66C2] hover:bg-[#004182] shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer transition-colors"
              >
                <span>Open LinkedIn &amp; Paste</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}

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
