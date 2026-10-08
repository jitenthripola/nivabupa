'use client';

import React, { useState } from 'react';
import { Link2, CheckCircle2, AlertCircle, Loader2, Send, ExternalLink, ShieldCheck } from 'lucide-react';
import { SocialPlatform, VerificationResponse } from '@/types';
import { validatePostUrl } from '@/lib/validation';

interface PostVerificationProps {
  currentPlatform?: SocialPlatform;
  claimId: string;
  userId: string;
  trackingToken: string;
  onSubmitSuccess?: (response: VerificationResponse) => void;
  onTrackEvent?: (eventType: 'post_link_opened' | 'post_link_submitted', metadata?: Record<string, unknown>) => void;
}

export default function PostVerification({
  currentPlatform,
  claimId,
  userId,
  trackingToken,
  onSubmitSuccess,
  onTrackEvent,
}: PostVerificationProps) {
  const [urlInput, setUrlInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<VerificationResponse | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    if (validationError) setValidationError(null);
  };

  const handleFocus = () => {
    onTrackEvent?.('post_link_opened', { currentPlatform });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Client-side quick check first
    const clientCheck = validatePostUrl(urlInput, currentPlatform);
    if (!clientCheck.isValid) {
      setValidationError(clientCheck.errorMessage || 'Please enter a valid link from a supported platform.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/verify-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postUrl: urlInput.trim(),
          platform: currentPlatform,
          claimId,
          userId,
          trackingToken,
        }),
      });

      const data: VerificationResponse = await response.json();

      if (!response.ok || !data.success) {
        setValidationError(data.message || 'Verification failed. Please check the post link.');
      } else {
        setSubmittedData(data);
        onSubmitSuccess?.(data);
        onTrackEvent?.('post_link_submitted', {
          postUrl: urlInput.trim(),
          verificationId: data.verificationId,
          platform: data.verifiedPlatform,
        });
      }
    } catch {
      setValidationError('Network error while submitting post link. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetVerification = () => {
    setSubmittedData(null);
    setUrlInput('');
    setValidationError(null);
  };

  return (
    <div
      id="post-verification-section"
      className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-7 transition-all scroll-mt-20"
    >
      {/* If already submitted successfully */}
      {submittedData ? (
        <div className="text-center py-3 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#0A192F]">
            Thanks! Your post has been submitted successfully.
          </h3>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Our advocacy team has received your link. Your genuine story inspires confidence for thousands of families.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verification ID: {submittedData.verificationId}</span>
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={handleResetVerification}
              className="text-xs font-semibold text-[#0077C8] hover:text-[#005B99] underline cursor-pointer"
            >
              Submit another post link
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#009FE3] flex items-center justify-center shrink-0">
                <Link2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0A192F]">
                  Already shared your experience?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Paste your post link below to help us verify your advocacy.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={urlInput}
                onChange={handleInputChange}
                onFocus={handleFocus}
                id="post-url-input"
                placeholder="Paste your post URL (e.g. https://www.linkedin.com/posts/...)"
                aria-label="Paste your post URL"
                className={`w-full min-h-[48px] px-4 py-3 rounded-xl border text-sm text-slate-900 bg-slate-50/50 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${validationError
                    ? 'border-red-400 focus:ring-red-200'
                    : 'border-slate-300 focus:border-[#009FE3] focus:ring-sky-100'
                  }`}
              />
            </div>

            {/* Error messaging */}
            {validationError && (
              <div
                id="verification-error-msg"
                className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 animate-in fade-in duration-150"
              >
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>Supported:</span>
                <span className="font-medium text-slate-700">LinkedIn • X • Facebook • Instagram • YouTube</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !urlInput.trim()}
                id="submit-post-btn"
                className="min-h-[44px] px-6 py-2.5 rounded-xl font-bold text-white bg-[#0A192F] hover:bg-[#1E293B] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Post</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
