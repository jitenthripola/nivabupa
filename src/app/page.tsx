'use client';

import { useState, useRef, useEffect } from 'react';
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
import LinkedInModal from '@/components/LinkedInModal';
import ErrorState from '@/components/ErrorState';
import Footer from '@/components/Footer';
import AnalyticsInspector from '@/components/AnalyticsInspector';
import { AnalyticsProvider, useAnalytics } from '@/components/AnalyticsProvider';

import { MOCK_CLAIM_DATA, DEFAULT_SHARE_MESSAGE } from '@/lib/mockData';
import { buildPlatformIntent, getLinkedInShareUrls, getYouTubeShareUrls } from '@/lib/shareUrls';
import { SocialPlatform, ShareLinkResponse } from '@/types';

function AdvocacyJourneyPage() {
  const { trackEvent, trackingToken } = useAnalytics();

  // State management
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('linkedin');
  const [personalizedMessage, setPersonalizedMessage] = useState<string>(DEFAULT_SHARE_MESSAGE);
  const [isShareLoading, setIsShareLoading] = useState<boolean>(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [hasSharedSuccessfully, setHasSharedSuccessfully] = useState<boolean>(false);
  const [showLinkedInModal, setShowLinkedInModal] = useState<boolean>(false);
  const [pendingLinkedInUrl, setPendingLinkedInUrl] = useState<string>('');
  const [showInstagramModal, setShowInstagramModal] = useState<boolean>(false);
  const [showYouTubeModal, setShowYouTubeModal] = useState<boolean>(false);
  const [generatedShareData, setGeneratedShareData] = useState<ShareLinkResponse | null>(null);

  // Restore share state if navigating back (e.g. from Facebook redirect in iPhone Safari)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('nivabupa_has_shared');
      if (stored === 'true') {
        setHasSharedSuccessfully(true);
      }
    }
  }, []);

  // Pre-fetch share link in background so user tap triggers instantaneous navigation on iOS/mobile
  useEffect(() => {
    let isMounted = true;
    const fetchLink = async () => {
      try {
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
        if (res.ok && isMounted) {
          const data = await res.json();
          setGeneratedShareData(data);
        }
      } catch {
        // Silently ignore prefetch errors
      }
    };
    fetchLink();
    return () => {
      isMounted = false;
    };
  }, [selectedPlatform, personalizedMessage]);

  const markSharedSuccessfully = () => {
    setHasSharedSuccessfully(true);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('nivabupa_has_shared', 'true');
      } catch {
        // Ignore privacy/quota errors
      }
    }
  };

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
      // 1. Use pre-fetched share link or request live tracking link
      let shareData: ShareLinkResponse | null = generatedShareData;
      if (!shareData) {
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

        const data: ShareLinkResponse = await res.json();
        setGeneratedShareData(data);
        shareData = data;
      }

      if (!shareData) {
        throw new Error('Failed to obtain share data');
      }

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
        const intent = buildPlatformIntent(
          'youtube',
          shareData.shareUrl,
          personalizedMessage
        );
        const youtubeUrls = getYouTubeShareUrls(shareData.shareUrl, personalizedMessage);

        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(personalizedMessage).catch((clipErr) => {
            console.warn('Clipboard write error:', clipErr);
          });
        }

        setIsShareLoading(false);
        markSharedSuccessfully();

        trackEvent('share_completed', 'youtube', {
          mode: youtubeUrls.isMobile ? 'app_deep_link' : 'studio_upload',
          shareUrl: shareData.shareUrl,
        });

        // Directly open YouTube on mobile without modal
        if (youtubeUrls.isAndroid) {
          window.location.href = youtubeUrls.androidIntentUrl;
          return;
        }

        // iOS: Directly open YouTube Universal Link without any popup
        if (youtubeUrls.isIOS) {
          openUrlInNewTab(youtubeUrls.webFallbackUrl);
          return;
        }

        // Desktop: directly open YouTube upload in same tab
        openUrlInNewTab(intent.intentUrl);
        return;
      }

      if (selectedPlatform === 'linkedin') {
        const intent = buildPlatformIntent(
          'linkedin',
          shareData.shareUrl,
          personalizedMessage
        );
        const linkedInUrls = getLinkedInShareUrls(shareData.shareUrl, personalizedMessage);
        const fullShareText = personalizedMessage
          ? shareData.shareUrl && !personalizedMessage.includes(shareData.shareUrl)
            ? `${personalizedMessage}\n\n${shareData.shareUrl}`
            : personalizedMessage
          : shareData.shareUrl;

        // Copy message to clipboard without blocking navigation gesture
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(fullShareText).catch((clipErr) => {
            console.warn('Clipboard write error:', clipErr);
          });
        }

        setIsShareLoading(false);
        markSharedSuccessfully();

        trackEvent('share_completed', 'linkedin', {
          mode: linkedInUrls.isMobile ? 'app_deep_link' : 'web_intent',
          shareUrl: shareData.shareUrl,
        });

        // Android: Directly open LinkedIn via Chrome intent (opens native Create Post composer directly,
        // or falls back to web Create Post if app is not installed)
        if (linkedInUrls.isAndroid) {
          window.location.href = linkedInUrls.androidIntentUrl;
          return;
        }

        // iOS & Desktop: Open LinkedIn Create Post directly via feed/?shareActive=true
        openUrlInNewTab(intent.intentUrl);
        return;
      }

      // X, Facebook
      const intent = buildPlatformIntent(
        selectedPlatform,
        shareData.shareUrl,
        personalizedMessage
      );

      // If clipboard copy is beneficial (e.g. Facebook)
      if (intent.requiresClipboardCopy) {
        try {
          await navigator.clipboard.writeText(personalizedMessage);
        } catch (clipErr) {
          console.warn('Clipboard write error:', clipErr);
        }
      }

      // Open destination URL (handles iOS Safari redirect + cookie preservation)
      openUrlInNewTab(intent.intentUrl);

      setIsShareLoading(false);
      markSharedSuccessfully();

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

  // Safely navigate to destination platform URL in the same tab (do not open in new tab for both mobile and desktop)
  const openUrlInNewTab = (url: string) => {
    if (typeof window === 'undefined' || !url) return;
    window.location.href = url;
  };

  // LinkedIn confirm handler
  const handleLinkedInConfirmed = (customUrl?: string) => {
    setShowLinkedInModal(false);
    markSharedSuccessfully();
    trackEvent('share_completed', 'linkedin', {
      mode: customUrl ? 'app_deep_link' : 'web_intent',
      shareUrl: customUrl || pendingLinkedInUrl,
    });

    const targetUrl = customUrl || pendingLinkedInUrl;
    if (targetUrl) {
      if (!targetUrl.startsWith('intent://') && !targetUrl.startsWith('linkedin://')) {
        openUrlInNewTab(targetUrl);
      }
    }
  };

  // Instagram confirm handler
  const handleInstagramConfirmed = () => {
    setShowInstagramModal(false);
    markSharedSuccessfully();
    trackEvent('share_completed', 'instagram', { mode: 'app_deep_link' });
  };

  // YouTube confirm handler
  const handleYouTubeConfirmed = () => {
    setShowYouTubeModal(false);
    markSharedSuccessfully();
    trackEvent('share_completed', 'youtube', { mode: 'studio_upload' });

    openUrlInNewTab('https://www.youtube.com/upload');
  };

  const handleScrollToVerification = () => {
    verificationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC]">
      {/* Header */}
      <Header />

      {/* Main Single Page Content Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-28 sm:pb-8">
        {/* Verified Claim Summary Bar */}
        {/* <ClaimSummaryCard claim={MOCK_CLAIM_DATA} /> */}

        {/* Hero & Appreciation Section */}
        {/* <HeroSection onShareClick={handleScrollToSharing} /> */}

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

      {/* Sticky Mobile Share Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 shadow-lg pb-[max(12px,env(safe-area-inset-bottom))]">
        <ShareButton
          platform={selectedPlatform}
          isLoading={isShareLoading}
          onShare={handleInitiateShare}
          isStickyMobile={true}
        />
      </div>

      {/* Platform Modals */}
      <LinkedInModal
        isOpen={showLinkedInModal}
        message={personalizedMessage}
        shareUrl={generatedShareData?.shareUrl || ''}
        onClose={() => setShowLinkedInModal(false)}
        onConfirmOpenLinkedIn={handleLinkedInConfirmed}
      />

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
      {/* <AnalyticsInspector /> */}

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
