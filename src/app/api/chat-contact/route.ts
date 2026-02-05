import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { ContactFormData } from '@/lib/chatTypes';

// Rate limiting for contact form
const contactRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const CONTACT_RATE_LIMIT = 5; // Max 5 submissions per hour
const CONTACT_RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkContactRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = contactRateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    contactRateLimitMap.set(ip, { count: 1, resetTime: now + CONTACT_RATE_WINDOW });
    return true;
  }

  if (record.count >= CONTACT_RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Basic email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize text input
function sanitizeText(text: string, maxLength: number = 500): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .slice(0, maxLength)
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    if (!checkContactRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body: ContactFormData = await request.json();
    const { name, email, role, agency, question, sessionId } = body;

    // Validate required fields
    if (!name || !email || !question) {
      return NextResponse.json(
        { error: 'Name, email, and question are required' },
        { status: 400 }
      );
    }

    // Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeText(name, 100),
      email: sanitizeText(email, 254),
      role: role ? sanitizeText(role, 100) : null,
      agency: agency ? sanitizeText(agency, 200) : null,
      question: sanitizeText(question, 2000),
      session_id: sessionId ? sanitizeText(sessionId, 100) : null,
    };

    // Store in database
    const supabase = createServerSupabaseClient();

    const { error } = await supabase
      .from('chat_contacts')
      .insert(sanitizedData);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save contact information' },
        { status: 500 }
      );
    }

    // TODO: Optionally send email notification
    // This could be done via Supabase Edge Functions, SendGrid, etc.

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will contact you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process contact form',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
