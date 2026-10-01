import { PlatformConfig, SocialPlatform, UserClaim } from '@/types';

export const MOCK_CLAIM_DATA: UserClaim = {
  claimId: 'CLM-DEMO-001',
  userId: 'USER-DEMO-001',
  encryptedClaimId: 'clm_enc_8923fd7a',
  encryptedUserId: 'usr_enc_4198ab2c',
  claimantName: 'Priya Sharma',
  policyNumberMasked: 'POL-****-8842',
  settlementAmount: '₹1,45,000',
  settlementType: 'Cashless Hospitalization',
  hospitalName: 'Max Super Speciality Hospital, New Delhi',
  settledDate: 'Settled Yesterday',
  turnaroundTime: 'Approved in 38 mins',
  campaign: 'claim_advocacy',
};

export const DEFAULT_SHARE_MESSAGE =
  'Recently had a seamless claim experience with Niva Bupa. Thank you @Niva_Bupa for making the process smooth and stress-free. #NivaBupa #HealthInsurance #ClaimSettled';

export const CAMPAIGN_HASHTAGS = [
  '#NivaBupa',
  '#HealthInsurance',
  '#ClaimSettled',
  '#ZindagiKoClaimKar',
  '#CashlessCare',
];

export const PLATFORMS_CONFIG: Record<SocialPlatform, PlatformConfig> = {
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    tagline: 'Share with professional network',
    brandColor: '#0A66C2',
    characterLimit: 3000,
    handle: '@Niva Bupa Health Insurance',
    iconName: 'Linkedin',
    actionText: 'Share on LinkedIn',
    requiresClipboardFallback: false,
  },
  x: {
    id: 'x',
    name: 'X (Twitter)',
    tagline: 'Tweet to your followers',
    brandColor: '#000000',
    characterLimit: 280,
    handle: '@Niva_Bupa',
    iconName: 'Twitter',
    actionText: 'Post on X',
    requiresClipboardFallback: false,
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    tagline: 'Share with friends & family',
    brandColor: '#1877F2',
    characterLimit: 2000,
    handle: '@NivaBupaHealthInsurance',
    iconName: 'Facebook',
    actionText: 'Share on Facebook',
    requiresClipboardFallback: true,
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    tagline: 'Post to feed or stories',
    brandColor: '#E1306C',
    characterLimit: 2200,
    handle: '@nivabupa',
    iconName: 'Instagram',
    actionText: 'Share on Instagram',
    requiresClipboardFallback: true,
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    tagline: 'Video review or community post',
    brandColor: '#FF0000',
    characterLimit: 5000,
    handle: '@NivaBupa',
    iconName: 'Youtube',
    actionText: 'Share on YouTube',
    requiresClipboardFallback: true,
  },
};

export const PLATFORMS_LIST: PlatformConfig[] = [
  PLATFORMS_CONFIG.linkedin,
  PLATFORMS_CONFIG.x,
  PLATFORMS_CONFIG.facebook,
  PLATFORMS_CONFIG.instagram,
  PLATFORMS_CONFIG.youtube,
];
