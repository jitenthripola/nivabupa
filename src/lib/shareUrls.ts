import { SocialPlatform } from '@/types';

export interface PlatformShareIntent {
  intentUrl: string;
  mobileAppUrl?: string;
  requiresClipboardCopy: boolean;
  instructions?: string;
}

export function buildPlatformIntent(
  platform: SocialPlatform,
  shareUrl: string,
  personalizedText: string
): PlatformShareIntent {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(personalizedText);

  switch (platform) {
    case 'linkedin': {
      const fullText = personalizedText
        ? shareUrl && !personalizedText.includes(shareUrl)
          ? `${personalizedText}\n\n${shareUrl}`
          : personalizedText
        : shareUrl;
      const encodedFullText = encodeURIComponent(fullText);

      return {
        // Direct link to LinkedIn's "Create a post" composer modal on desktop and mobile web
        intentUrl: `https://www.linkedin.com/feed/?shareActive=true&text=${encodedFullText}`,
        mobileAppUrl: 'linkedin://',
        requiresClipboardCopy: true, // Also copy so users can paste in the LinkedIn post body
        instructions: 'Opening LinkedIn Create Post. Your message has also been copied to your clipboard.',
      };
    }

    case 'x':
      return {
        intentUrl: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        requiresClipboardCopy: false,
        instructions: 'Opening X with your pre-filled advocacy post.',
      };

    case 'facebook':
      return {
        // Meta has deprecated the 'quote' parameter in sharer.php. Passing quote in query strings
        // causes mobile Safari and Facebook's mobile routing to trigger redirect loops or force a login page
        // even when the user is already logged in. A clean URL ensures Facebook directly opens the share/dialog.
        intentUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        requiresClipboardCopy: true,
        instructions: 'Opening Facebook. Your message is copied to your clipboard in case you want to customize your post text.',
      };

    case 'instagram':
      return {
        // Instagram does not support web intent text injection
        intentUrl: 'https://www.instagram.com/',
        mobileAppUrl: 'instagram://app',
        requiresClipboardCopy: true,
        instructions: 'Your message has been copied! Open Instagram and paste it in a new post, reel, or story.',
      };

    case 'youtube':
      return {
        // Direct to YouTube Studio upload or video testimonial guide
        intentUrl: 'https://www.youtube.com/upload',
        mobileAppUrl: 'vnd.youtube://',
        requiresClipboardCopy: true,
        instructions: 'Share a quick video or testimonial on YouTube. Your recommended title & description are copied to clipboard.',
      };

    default:
      return {
        intentUrl: shareUrl,
        requiresClipboardCopy: false,
      };
  }
}

export interface LinkedInShareUrls {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  androidIntentUrl: string;
  iosSchemeUrl: string;
  webFallbackUrl: string;
}

/**
 * Builds mobile app deep links for LinkedIn across iOS & Android,
 * with graceful fallback to LinkedIn's official web sharer.
 */
export function getLinkedInShareUrls(shareUrl: string, message: string): LinkedInShareUrls {
  const fullText = message
    ? shareUrl && !message.includes(shareUrl)
      ? `${message}\n\n${shareUrl}`
      : message
    : shareUrl;
  const encodedFullText = encodeURIComponent(fullText);
  // Official LinkedIn feed URL with shareActive=true to automatically open the Create Post composer modal
  const webFallbackUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodedFullText}`;

  // Android Chrome Intent: Opens LinkedIn app ACTION_SEND composer directly with text & url,
  // falling back to mobile web Create Post if LinkedIn app is not installed.
  const androidIntentUrl = `intent://#Intent;action=android.intent.action.SEND;package=com.linkedin.android;type=text/plain;S.android.intent.extra.TEXT=${encodedFullText};S.browser_fallback_url=${encodeURIComponent(
    webFallbackUrl
  )};end;`;

  // iOS LinkedIn custom URL scheme
  const iosSchemeUrl = 'linkedin://';

  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      androidIntentUrl,
      iosSchemeUrl,
      webFallbackUrl,
    };
  }

  const ua = navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (typeof navigator.platform === 'string' &&
      navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints > 1);
  const isMobile = isAndroid || isIOS || /webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  return {
    isMobile,
    isIOS,
    isAndroid,
    androidIntentUrl,
    iosSchemeUrl,
    webFallbackUrl,
  };
}

export interface YouTubeShareUrls {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  androidIntentUrl: string;
  iosSchemeUrl: string;
  webFallbackUrl: string;
}

/**
 * Builds mobile app deep links for YouTube across iOS & Android,
 * with graceful fallback to YouTube Studio/Upload on the web.
 */
export function getYouTubeShareUrls(shareUrl: string, message: string): YouTubeShareUrls {
  const webFallbackUrl = 'https://www.youtube.com/upload';

  // Android Chrome Intent: Opens the official YouTube app, falling back to upload URL
  const androidIntentUrl = `intent://www.youtube.com/#Intent;package=com.google.android.youtube;scheme=https;S.browser_fallback_url=${encodeURIComponent(
    webFallbackUrl
  )};end;`;

  // iOS YouTube custom URL scheme (vnd.youtube:// is the registered scheme for the YouTube app on iOS)
  const iosSchemeUrl = 'vnd.youtube://';

  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isMobile: false,
      isIOS: false,
      isAndroid: false,
      androidIntentUrl,
      iosSchemeUrl,
      webFallbackUrl,
    };
  }

  const ua = navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (typeof navigator.platform === 'string' &&
      navigator.platform === 'MacIntel' &&
      navigator.maxTouchPoints > 1);
  const isMobile = isAndroid || isIOS || /webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  return {
    isMobile,
    isIOS,
    isAndroid,
    androidIntentUrl,
    iosSchemeUrl,
    webFallbackUrl,
  };
}
