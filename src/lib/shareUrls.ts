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
    case 'linkedin':
      return {
        intentUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        requiresClipboardCopy: true, // Also copy so users can paste in the LinkedIn post body
        instructions: 'We are opening LinkedIn. Your message has also been copied to your clipboard to paste into your update.',
      };

    case 'x':
      return {
        intentUrl: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
        requiresClipboardCopy: false,
        instructions: 'Opening X with your pre-filled advocacy post.',
      };

    case 'facebook':
      return {
        // Facebook sharer supports url param; quote param is supported on desktop web dialogs
        intentUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
        requiresClipboardCopy: true,
        instructions: 'Opening Facebook. Your message is copied to your clipboard in case Facebook dialog requests manual paste.',
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
