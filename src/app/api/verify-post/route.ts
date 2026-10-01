import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { validatePostUrl } from '@/lib/validation';
import { VerificationRequest, VerificationResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as VerificationRequest;
    const { postUrl, platform, claimId, userId, trackingToken } = body;

    if (!postUrl || typeof postUrl !== 'string') {
      return NextResponse.json<VerificationResponse>(
        {
          success: false,
          message: 'Post URL is required.',
          error: 'EMPTY_URL',
        },
        { status: 400 }
      );
    }

    // Run server-side validation against domain whitelist
    const validation = validatePostUrl(postUrl, platform);

    if (!validation.isValid) {
      return NextResponse.json<VerificationResponse>(
        {
          success: false,
          message: validation.errorMessage || 'Invalid URL or unsupported platform domain.',
          error: 'INVALID_DOMAIN_OR_URL',
        },
        { status: 422 }
      );
    }

    // Generate unique verification code
    const verificationId = `VER-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

    return NextResponse.json<VerificationResponse>({
      success: true,
      verificationId,
      verifiedPlatform: validation.platform,
      message: 'Thanks! Your post has been submitted successfully.',
    });
  } catch (error) {
    console.error('Error verifying post URL:', error);
    return NextResponse.json<VerificationResponse>(
      {
        success: false,
        message: 'Something went wrong while verifying your post link. Please try again.',
        error: 'SERVER_ERROR',
      },
      { status: 500 }
    );
  }
}
