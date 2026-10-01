import { SocialPlatform } from '@/types';

export const SUPPORTED_DOMAINS: Record<SocialPlatform, string[]> = {
  linkedin: ['linkedin.com', 'www.linkedin.com'],
  x: ['x.com', 'twitter.com', 'www.x.com', 'www.twitter.com'],
  facebook: ['facebook.com', 'www.facebook.com', 'fb.watch', 'fb.com', 'm.facebook.com'],
  instagram: ['instagram.com', 'www.instagram.com'],
  youtube: ['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com'],
};

export interface UrlValidationResult {
  isValid: boolean;
  platform?: SocialPlatform;
  errorMessage?: string;
  normalizedUrl?: string;
}

export function validatePostUrl(inputUrl: string, expectedPlatform?: SocialPlatform): UrlValidationResult {
  const trimmed = inputUrl.trim();

  if (!trimmed) {
    return {
      isValid: false,
      errorMessage: 'Please enter a post URL.',
    };
  }

  let parsed: URL;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    parsed = new URL(withProtocol);
  } catch {
    return {
      isValid: false,
      errorMessage: 'Please enter a valid web URL (e.g. https://www.linkedin.com/posts/...)',
    };
  }

  const hostname = parsed.hostname.toLowerCase();

  // Find which platform this domain belongs to
  let detectedPlatform: SocialPlatform | undefined;
  for (const [platformKey, domains] of Object.entries(SUPPORTED_DOMAINS)) {
    if (domains.some((d) => hostname === d || hostname.endsWith(`.${d}`))) {
      detectedPlatform = platformKey as SocialPlatform;
      break;
    }
  }

  if (!detectedPlatform) {
    return {
      isValid: false,
      errorMessage: 'URL must be from a supported platform: LinkedIn, X, Facebook, Instagram, or YouTube.',
    };
  }

  if (expectedPlatform && detectedPlatform !== expectedPlatform) {
    return {
      isValid: true,
      platform: detectedPlatform,
      normalizedUrl: parsed.toString(),
      errorMessage: `Note: You selected ${expectedPlatform.toUpperCase()}, but submitted a link from ${detectedPlatform.toUpperCase()}. We will verify it accordingly.`,
    };
  }

  // Ensure path is not just root domain
  if (parsed.pathname === '/' || parsed.pathname === '') {
    return {
      isValid: false,
      errorMessage: 'Please provide the direct link to your specific post or video, not the homepage.',
    };
  }

  return {
    isValid: true,
    platform: detectedPlatform,
    normalizedUrl: parsed.toString(),
  };
}
