'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { analytics } from '@/lib/analytics';
import { MOCK_CLAIM_DATA } from '@/lib/mockData';
import { SocialPlatform, TrackingEvent, TrackingEventType } from '@/types';

interface AnalyticsContextType {
  trackEvent: (
    eventType: TrackingEventType,
    platform?: SocialPlatform,
    metadata?: Record<string, unknown>
  ) => void;
  events: TrackingEvent[];
  lastEvent: TrackingEvent | null;
  trackingToken: string;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [lastEvent, setLastEvent] = useState<TrackingEvent | null>(null);

  useEffect(() => {
    // Initialize with safe encrypted identifiers
    analytics.init({
      claimId: MOCK_CLAIM_DATA.encryptedClaimId,
      userId: MOCK_CLAIM_DATA.encryptedUserId,
      campaign: MOCK_CLAIM_DATA.campaign,
    });

    // Fire page_view on load
    analytics.track('page_view', undefined, {
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'mobile',
      deviceType: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
    });

    const unsubscribe = analytics.subscribe((evt) => {
      setLastEvent(evt);
      setEvents((prev) => [evt, ...prev.slice(0, 49)]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const trackEvent = (
    eventType: TrackingEventType,
    platform?: SocialPlatform,
    metadata?: Record<string, unknown>
  ) => {
    analytics.track(eventType, platform, metadata);
  };

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
        events,
        lastEvent,
        trackingToken: analytics.getTrackingToken(),
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}
