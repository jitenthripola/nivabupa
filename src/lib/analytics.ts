import { SocialPlatform, TrackingEvent, TrackingEventType } from '@/types';

class AnalyticsService {
  private claimId: string = 'clm_enc_8923fd7a';
  private userId: string = 'usr_enc_4198ab2c';
  private campaign: string = 'claim_advocacy';
  private trackingToken: string = 'tok_init_' + Math.random().toString(36).substring(2, 9);
  private eventListeners: ((event: TrackingEvent) => void)[] = [];
  private eventHistory: TrackingEvent[] = [];

  public init(config: { claimId: string; userId: string; campaign?: string; trackingToken?: string }) {
    this.claimId = config.claimId;
    this.userId = config.userId;
    if (config.campaign) this.campaign = config.campaign;
    if (config.trackingToken) this.trackingToken = config.trackingToken;
  }

  public setTrackingToken(token: string) {
    this.trackingToken = token;
  }

  public getTrackingToken(): string {
    return this.trackingToken;
  }

  public getHistory(): TrackingEvent[] {
    return [...this.eventHistory];
  }

  public subscribe(callback: (event: TrackingEvent) => void): () => void {
    this.eventListeners.push(callback);
    return () => {
      this.eventListeners = this.eventListeners.filter((cb) => cb !== callback);
    };
  }

  public async track(
    eventType: TrackingEventType,
    platform?: SocialPlatform,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const event: TrackingEvent = {
      id: 'evt_' + Math.random().toString(36).substring(2, 10),
      eventType,
      claimId: this.claimId,
      userId: this.userId,
      platform,
      timestamp: new Date().toISOString(),
      campaign: this.campaign,
      trackingToken: this.trackingToken,
      metadata,
    };

    // Store locally for audit preview
    this.eventHistory.unshift(event);
    if (this.eventHistory.length > 50) this.eventHistory.pop();

    // Broadcast to UI subscribers
    this.eventListeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.warn('Listener error in analytics:', err);
      }
    });

    // Send to backend API asynchronously (non-blocking)
    try {
      if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
        fetch('/api/track-click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        }).catch((err) => {
          console.warn('Silent analytics track warning:', err);
        });
      }
    } catch {
      // ignore network errors in client analytics delivery
    }
  }
}

export const analytics = new AnalyticsService();
