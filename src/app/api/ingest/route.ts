import { NextRequest, NextResponse } from 'next/server';
import { siteContent } from '@/lib/siteContent';
import { createChunksFromContent, getChunkStats } from '@/lib/chunker';
import { storeChunks, clearAllChunks, getStoredDocumentStats } from '@/lib/vectorStore';

/**
 * POST /api/ingest
 * Ingest site content into the vector database
 * Protected by admin secret
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin secret
    const authHeader = request.headers.get('Authorization');
    const adminSecret = process.env.ADMIN_INGEST_SECRET;

    if (!adminSecret) {
      return NextResponse.json(
        { error: 'Ingestion not configured' },
        { status: 500 }
      );
    }

    if (authHeader !== `Bearer ${adminSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body for options
    let clearExisting = true;
    try {
      const body = await request.json();
      clearExisting = body.clearExisting !== false;
    } catch {
      // No body or invalid JSON, use defaults
    }

    console.log('Starting content ingestion...');

    // Optionally clear existing data
    if (clearExisting) {
      await clearAllChunks();
    }

    // Create chunks from site content
    const chunks = createChunksFromContent(siteContent);
    const stats = getChunkStats(chunks);

    console.log(`Created ${stats.totalChunks} chunks (~${stats.totalTokens} tokens)`);
    console.log('Chunks by page:', stats.byPage);

    // Store chunks with embeddings
    await storeChunks(chunks);

    // Get final stats
    const storedStats = await getStoredDocumentStats();

    return NextResponse.json({
      success: true,
      message: 'Content ingested successfully',
      stats: {
        chunksCreated: stats.totalChunks,
        estimatedTokens: stats.totalTokens,
        avgChunkSize: stats.avgChunkSize,
        byPage: stats.byPage,
        totalStored: storedStats.totalChunks,
      },
    });
  } catch (error) {
    console.error('Ingestion error:', error);
    return NextResponse.json(
      {
        error: 'Ingestion failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ingest
 * Get current ingestion stats
 * Protected by admin secret
 */
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

    const stats = await getStoredDocumentStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get stats',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
