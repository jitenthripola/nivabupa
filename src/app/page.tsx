'use client';

import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ClaimSummaryCard from '@/components/ClaimSummaryCard';
import PlatformSelector from '@/components/PlatformSelector';
import MessageEditor from '@/components/MessageEditor';
import ShareButton from '@/components/ShareButton';
import SuccessState from '@/components/SuccessState';
import PostVerification from '@/components/PostVerification';
import InstagramModal from '@/components/InstagramModal';
import YouTubeModal from '@/components/YouTubeModal';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import Footer from '@/components/Footer';
import AnalyticsInspector from '@/components/AnalyticsInspector';
import { AnalyticsProvider, useAnalytics } from '@/components/AnalyticsProvider';

import { MOCK_CLAIM_DATA, DEFAULT_SHARE_MESSAGE } from '@/lib/mockData';
import { buildPlatformIntent } from '@/lib/shareUrls';
import { SocialPlatform, ShareLinkResponse, VerificationResponse } from '@/types';

function AdvocacyJourneyPage() {
  const { trackEvent, trackingToken } = useAnalytics();

  // State management
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('linkedin');
  const [personalizedMessage, setPersonalizedMessage] = useState<string>(DEFAULT_SHARE_MESSAGE);
  const [isShareLoading, setIsShareLoading] = useState<boolean>(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [hasSharedSuccessfully, setHasSharedSuccessfully] = useState<boolean>(false);
  const [showInstagramModal, setShowInstagramModal] = useState<boolean>(false);
  const [showYouTubeModal, setShowYouTubeModal] = useState<boolean>(false);
  const [generatedShareData, setGeneratedShareData] = useState<ShareLinkResponse | null>(null);

  // References for smooth scrolling
  const sharingSectionRef = useRef<HTMLDivElement>(null);
  const verificationSectionRef = useRef<HTMLDivElement>(null);

  // Handlers
  const handleScrollToSharing = () => {
    trackEvent('share_clicked', selectedPlatform, { source: 'hero_cta' });
    sharingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectPlatform = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setShareError(null);
    trackEvent('platform_selected', platform);
  };

  const handleMessageChange = (newMsg: string) => {
    setPersonalizedMessage(newMsg);
    trackEvent('message_edited', selectedPlatform, {
      length: newMsg.length,
    });
  };

  const handleCopyMessage = () => {
    trackEvent('message_copied', selectedPlatform, {
      messageLength: personalizedMessage.length,
    });
  };

  const handleResetMessage = () => {
    setPersonalizedMessage(DEFAULT_SHARE_MESSAGE);
    trackEvent('message_edited', selectedPlatform, { action: 'reset' });
  };

  // Main Share Trigger
  const handleInitiateShare = async () => {
    setShareError(null);
    setIsShareLoading(true);

    trackEvent('share_clicked', selectedPlatform, {
      platform: selectedPlatform,
      messageLength: personalizedMessage.length,
    });

    try {
      // 1. Request secure tracking link from backend API
      const res = await fetch('/api/generate-share-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimId: MOCK_CLAIM_DATA.encryptedClaimId,
          userId: MOCK_CLAIM_DATA.encryptedUserId,
          platform: selectedPlatform,
          message: personalizedMessage,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate secure share link');
      }

      const shareData: ShareLinkResponse = await res.json();
      setGeneratedShareData(shareData);

      // Track handoff
      trackEvent('share_handoff', selectedPlatform, {
        shareUrl: shareData.shareUrl,
        trackingToken: shareData.trackingToken,
      });

      // 2. Platform specific handling
      if (selectedPlatform === 'instagram') {
        // Copy to clipboard first
        try {
          await navigator.clipboard.writeText(personalizedMessage);
        } catch (clipErr) {
          console.warn('Clipboard write error:', clipErr);
        }
        setIsShareLoading(false);
        setShowInstagramModal(true);
        return;
      }

      if (selectedPlatform === 'youtube') {
        // Copy description & hashtags to clipboard
        try {
          await navigator.clipboard.writeText(personalizedMessage);
        } catch (clipErr) {
          console.warn('Clipboard write error:', clipErr);
        }
        setIsShareLoading(false);
        setShowYouTubeModal(true);
        return;
      }

      // LinkedIn, X, Facebook
      const intent = buildPlatformIntent(
        selectedPlatform,
        shareData.shareUrl,
        personalizedMessage
      );

      // If clipboard copy is beneficial (e.g. LinkedIn or Facebook)
      if (intent.requiresClipboardCopy) {
        try {
          await navigator.clipboard.writeText(personalizedMessage);
        } catch (clipErr) {
          console.warn('Clipboard write error:', clipErr);
        }
      }

      // Open sharing dialog in new window
      const popupWindow = window.open(
        intent.intentUrl,
        '_blank',
        'noopener,noreferrer,width=640,height=620'
      );

      // Fallback if popup blocker intercepted
      if (!popupWindow || popupWindow.closed || typeof popupWindow.closed === 'undefined') {
        window.location.href = intent.intentUrl;
      }

      setIsShareLoading(false);
      setHasSharedSuccessfully(true);

      trackEvent('share_completed', selectedPlatform, {
        mode: 'web_intent',
        shareUrl: shareData.shareUrl,
      });
    } catch (err: unknown) {
      console.error('Share process error:', err);
      setIsShareLoading(false);
      setShareError(
        'Something went wrong while opening the sharing app. Please try again or copy your message manually.'
      );
    }
  };

  // Instagram confirm handler
  const handleInstagramConfirmed = () => {
    setShowInstagramModal(false);
    setHasSharedSuccessfully(true);
    trackEvent('share_completed', 'instagram', { mode: 'app_deep_link' });

    // Attempt mobile protocol first, fallback to web
    if (typeof window !== 'undefined') {
      window.open('https://www.instagram.com', '_blank', 'noopener,noreferrer');
    }
  };

  // YouTube confirm handler
  const handleYouTubeConfirmed = () => {
    setShowYouTubeModal(false);
    setHasSharedSuccessfully(true);
    trackEvent('share_completed', 'youtube', { mode: 'studio_upload' });

    if (typeof window !== 'undefined') {
      window.open('https://www.youtube.com/upload', '_blank', 'noopener,noreferrer');
    }
  };

  const handleScrollToVerification = () => {
    verificationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      {/* Header */}
      <Header />

      {/* Main Single Page Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Verified Claim Summary Bar */}
        <ClaimSummaryCard claim={MOCK_CLAIM_DATA} />

        {/* Hero & Appreciation Section */}
        <HeroSection onShareClick={handleScrollToSharing} />

        {/* Main Sharing Interaction Card */}
        <div
          ref={sharingSectionRef}
          className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 transition-all"
        >
          {/* Platform Selector Grid */}
          <PlatformSelector
            selectedPlatform={selectedPlatform}
            onSelectPlatform={handleSelectPlatform}
          />

          {/* Personalized Message Editor */}
          <MessageEditor
            platform={selectedPlatform}
            message={personalizedMessage}
            onChangeMessage={handleMessageChange}
            onCopyMessage={handleCopyMessage}
            onResetMessage={handleResetMessage}
          />

          {/* Error notice if share fails */}
          {shareError && (
            <ErrorState
              message={shareError}
              onRetry={handleInitiateShare}
              onDismiss={() => setShareError(null)}
            />
          )}

          {/* Primary Share CTA */}
          <div className="pt-2">
            <ShareButton
              platform={selectedPlatform}
              isLoading={isShareLoading}
              onShare={handleInitiateShare}
            />

            <p className="text-center text-xs text-slate-500 mt-2.5">
              Secure sharing • Powered by Niva Bupa Claimant Advocacy Engine
            </p>
          </div>
        </div>

        {/* Success Confirmation Card (displayed when shared) */}
        {hasSharedSuccessfully && (
          <SuccessState
            platform={selectedPlatform}
            onDone={() => {
              setHasSharedSuccessfully(false);
            }}
            onSubmitPostLinkClick={handleScrollToVerification}
          />
        )}

        {/* Post Verification Card */}
        <div ref={verificationSectionRef}>
          <PostVerification
            currentPlatform={selectedPlatform}
            claimId={MOCK_CLAIM_DATA.encryptedClaimId}
            userId={MOCK_CLAIM_DATA.encryptedUserId}
            trackingToken={trackingToken}
            onTrackEvent={(eventType, meta) => trackEvent(eventType, selectedPlatform, meta)}
          />
        </div>
      </main>

      {/* Platform Modals */}
      <InstagramModal
        isOpen={showInstagramModal}
        message={personalizedMessage}
        onClose={() => setShowInstagramModal(false)}
        onConfirmOpenApp={handleInstagramConfirmed}
      />

      <YouTubeModal
        isOpen={showYouTubeModal}
        message={personalizedMessage}
        onClose={() => setShowYouTubeModal(false)}
        onConfirmOpenYouTube={handleYouTubeConfirmed}
      />

      {/* Real-time Tracking & Audit Inspector Drawer */}
      <AnalyticsInspector />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <AnalyticsProvider>
      <AdvocacyJourneyPage />
    </AnalyticsProvider>
  );
}
