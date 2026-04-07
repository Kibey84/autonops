import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerSupabaseClient } from '@/lib/supabase';

/**
 * Validate Shopify webhook HMAC signature
 */
function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const computed = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('base64');
  // Use timing-safe comparison
  try {
    return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
  } catch {
    return false;
  }
}

interface ShopifyOrder {
  id: number;
  email?: string;
  total_price?: string;
  currency?: string;
  note?: string | null;
  customer?: {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  line_items?: Array<{
    title: string;
    quantity: number;
    price: string;
  }>;
  note_attributes?: Array<{
    name: string;
    value: string;
  }>;
  shipping_address?: {
    city?: string;
    province?: string;
    country?: string;
  };
}

function extractAttribute(order: ShopifyOrder, name: string): string | undefined {
  const attr = order.note_attributes?.find(
    (a) => a.name.toLowerCase() === name.toLowerCase()
  );
  return attr?.value;
}

function buildLocation(order: ShopifyOrder): string {
  // Priority: custom attribute > note > shipping address
  const attrLoc = extractAttribute(order, 'location') || extractAttribute(order, 'mission_location');
  if (attrLoc) return attrLoc;
  if (order.note) return order.note;
  const addr = order.shipping_address;
  if (addr) {
    return [addr.city, addr.province, addr.country].filter(Boolean).join(', ');
  }
  return 'TBD';
}

export async function POST(request: NextRequest) {
  try {
    // Read raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-shopify-hmac-sha256');
    const topic = request.headers.get('x-shopify-topic');

    // Verify HMAC
    if (!verifySignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Only handle orders/paid
    if (topic !== 'orders/paid') {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const order: ShopifyOrder = JSON.parse(rawBody);

    // Extract mission data
    const missionType = order.line_items?.[0]?.title || 'General Mission';
    const location = buildLocation(order);
    const requesterName = [order.customer?.first_name, order.customer?.last_name]
      .filter(Boolean)
      .join(' ') || 'Unknown';
    const requesterEmail = order.customer?.email || order.email || '';
    const amount = parseFloat(order.total_price || '0');
    const currency = order.currency || 'USD';

    // Insert into Supabase
    const supabase = createServerSupabaseClient();

    // Create mission record (status = New / planning)
    const { data: missionRow, error: missionErr } = await supabase
      .from('missions')
      .insert({
        display_id: `MSN-SHOPIFY-${order.id}`,
        type: missionType,
        status: 'planning',
        location,
      })
      .select()
      .single();

    if (missionErr) {
      console.error('Mission insert error:', missionErr);
      return NextResponse.json({ error: missionErr.message }, { status: 500 });
    }

    // Create order record linked to mission
    const { error: orderErr } = await supabase.from('orders').insert({
      shopify_order_id: String(order.id),
      display_id: `ORD-SHOPIFY-${order.id}`,
      mission_id: missionRow.id,
      mission_type: missionType,
      location,
      requester_name: requesterName,
      requester_email: requesterEmail,
      amount,
      currency,
      status: 'paid',
      raw_payload: order as unknown as Record<string, unknown>,
    });

    if (orderErr) {
      console.error('Order insert error:', orderErr);
      return NextResponse.json({ error: orderErr.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      mission_id: missionRow.id,
      shopify_order_id: order.id,
    });
  } catch (error) {
    console.error('Shopify webhook error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
