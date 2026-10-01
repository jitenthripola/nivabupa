import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { SocialPlatform } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { claimId, userId, platform, message } = body;

    if (!platform || !claimId || !userId) {
      return NextResponse.json(
        { error: 'Missing required parameters: platform, claimId, userId' },
        { status: 400 }
      );
    }

    // Generate secure opaque tracking token
    const tokenSeed = `${claimId}:${userId}:${platform}:${Date.now()}`;
    const trackingToken = 'tok_' + crypto.createHash('sha256').update(tokenSeed).digest('hex').substring(0, 16);

    const utmSource = platform;
    const utmMedium = 'social';
    const utmCampaign = 'claim_advocacy';

    // In production, the share URL points to Niva Bupa's advocacy landing page
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nivabupa.com';
    const encodedClaimRef = encodeURIComponent(claimId);
    const shareUrl = `${baseUrl}/advocacy-story?ref=${encodedClaimRef}&utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&trk=${trackingToken}`;

    return NextResponse.json({
      shareUrl,
      trackingToken,
      utmSource,
      utmMedium,
      utmCampaign,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error generating share link:', error);
    return NextResponse.json(
      { error: 'Failed to generate secure share link' },
      { status: 500 }
    );
  }
}
