export type SocialPlatform = 'linkedin' | 'x' | 'facebook' | 'instagram' | 'youtube';

export interface PlatformConfig {
  id: SocialPlatform;
  name: string;
  tagline: string;
  brandColor: string;
  characterLimit?: number;
  handle: string;
  iconName: string;
  actionText: string;
  requiresClipboardFallback?: boolean;
}

export interface UserClaim {
  claimId: string;
  userId: string;
  encryptedClaimId: string;
  encryptedUserId: string;
  claimantName: string;
  policyNumberMasked: string;
  settlementAmount: string;
  settlementType: 'Cashless Hospitalization' | 'Reimbursement Claim';
  hospitalName: string;
  settledDate: string;
  turnaroundTime: string;
  campaign: string;
}

export interface SharePayload {
  claimId: string;
  userId: string;
  platform: SocialPlatform;
  message: string;
}

export interface ShareLinkResponse {
  shareUrl: string;
  trackingToken: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

export type TrackingEventType =
  | 'page_view'
  | 'platform_selected'
  | 'message_edited'
  | 'message_copied'
  | 'share_clicked'
  | 'share_handoff'
  | 'post_link_opened'
  | 'post_link_submitted'
  | 'share_completed';

export interface TrackingEvent {
  id?: string;
  eventType: TrackingEventType;
  claimId: string;
  userId: string;
  platform?: SocialPlatform;
  timestamp: string;
  campaign: string;
  trackingToken: string;
  metadata?: Record<string, unknown>;
}

export interface VerificationRequest {
  postUrl: string;
  platform?: SocialPlatform;
  claimId: string;
  userId: string;
  trackingToken: string;
}

export interface VerificationResponse {
  success: boolean;
  verificationId?: string;
  verifiedPlatform?: SocialPlatform;
  message: string;
  error?: string;
}
