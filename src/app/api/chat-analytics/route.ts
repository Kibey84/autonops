import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { AnalyticsEvent } from '@/lib/chatTypes';

// Allowed event types
const ALLOWED_EVENT_TYPES = ['opened', 'messageSent', 'escalationSubmitted', 'chipClicked'];

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: Partial<AnalyticsEvent> = await request.json();
    const { eventType, sessionId, metadata } = body;

    // Validate required fields
    if (!eventType || !sessionId) {
      return NextResponse.json(
        { error: 'eventType and sessionId are required' },
        { status: 400 }
      );
    }

    // Validate event type
    if (!ALLOWED_EVENT_TYPES.includes(eventType)) {
      return NextResponse.json(
        { error: 'Invalid event type' },
        { status: 400 }
      );
    }

    // Sanitize session ID
    const sanitizedSessionId = sessionId.slice(0, 100);

    // Sanitize metadata (remove any sensitive data)
    let sanitizedMetadata: Record<string, unknown> | null = null;
    if (metadata) {
      // Only allow specific metadata fields
      const allowedFields = ['chipText', 'pageUrl', 'queryLength'];
      sanitizedMetadata = {};
      for (const [key, value] of Object.entries(metadata)) {
        if (allowedFields.includes(key) && typeof value !== 'function') {
          sanitizedMetadata[key] = typeof value === 'string' ? value.slice(0, 200) : value;
        }
      }
    }

    // Store in database
    const supabase = createServerSupabaseClient();

    const { error } = await supabase
      .from('chat_analytics')
      .insert({
        event_type: eventType,
        session_id: sanitizedSessionId,
        metadata: sanitizedMetadata,
      });

    if (error) {
      // Log but don't fail the request for analytics
      console.error('Analytics error:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Don't fail on analytics errors
    console.error('Analytics error:', error);
    return NextResponse.json({ success: true });
  }
}

// GET endpoint for admin to view analytics (protected)
export async function GET(request: NextRequest) {
  try {
    // Verify admin secret
    const authHeader = request.headers.get('Authorization');
    const adminSecret = process.env.ADMIN_INGEST_SECRET;

    if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createServerSupabaseClient();

    // Get aggregate stats
    const { data: events, error } = await supabase
      .from('chat_analytics')
      .select('event_type, created_at')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) {
      throw error;
    }

    // Aggregate by event type
    const byType: Record<string, number> = {};
    const last24h: Record<string, number> = {};
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

    for (const event of events || []) {
      byType[event.event_type] = (byType[event.event_type] || 0) + 1;

      if (new Date(event.created_at) > cutoff) {
        last24h[event.event_type] = (last24h[event.event_type] || 0) + 1;
      }
    }

    return NextResponse.json({
      success: true,
      stats: {
        total: events?.length || 0,
        byType,
        last24h,
      },
    });
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
