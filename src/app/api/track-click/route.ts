import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { TrackingEvent } from '@/types';

// In-memory ring buffer for audit inspection in development/demo
const EVENT_LOG_STORE: TrackingEvent[] = [];
const MAX_LOG_SIZE = 100;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as TrackingEvent;
    const { eventType, claimId, userId, platform, campaign, trackingToken } = body;

    if (!eventType || !claimId || !userId) {
      return NextResponse.json(
        { error: 'Missing essential tracking fields' },
        { status: 400 }
      );
    }

    const eventRecord: TrackingEvent = {
      id: 'evt_' + crypto.randomUUID().substring(0, 12),
      eventType,
      claimId,
      userId,
      platform,
      timestamp: body.timestamp || new Date().toISOString(),
      campaign: campaign || 'claim_advocacy',
      trackingToken: trackingToken || 'tok_direct',
      metadata: body.metadata || {},
    };

    // Store in ring buffer
    EVENT_LOG_STORE.unshift(eventRecord);
    if (EVENT_LOG_STORE.length > MAX_LOG_SIZE) {
      EVENT_LOG_STORE.pop();
    }

    return NextResponse.json({
      success: true,
      eventId: eventRecord.id,
      timestamp: eventRecord.timestamp,
    });
  } catch (error) {
    console.error('Error tracking analytics event:', error);
    return NextResponse.json(
      { error: 'Internal tracking error' },
      { status: 500 }
    );
  }
}

// GET endpoint to query logged analytics for the audit inspector UI
export async function GET() {
  return NextResponse.json({
    totalEvents: EVENT_LOG_STORE.length,
    events: EVENT_LOG_STORE,
  });
}
