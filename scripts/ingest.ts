/**
 * Content Ingestion Script
 *
 * Usage:
 *   npx tsx scripts/ingest.ts
 *
 * Or with npm script:
 *   npm run ingest
 *
 * Requires environment variables:
 *   - ADMIN_INGEST_SECRET
 *   - OPENAI_API_KEY
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *
 * You can also run ingestion via the API:
 *   curl -X POST http://localhost:3000/api/ingest \
 *     -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
 *     -H "Content-Type: application/json"
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

async function main() {
  console.log('AutonOps Content Ingestion Script');
  console.log('==================================\n');

  const adminSecret = process.env.ADMIN_INGEST_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!adminSecret) {
    console.error('Error: ADMIN_INGEST_SECRET environment variable is required');
    process.exit(1);
  }

  console.log(`Using base URL: ${baseUrl}`);
  console.log('Starting ingestion...\n');

  try {
    const response = await fetch(`${baseUrl}/api/ingest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminSecret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clearExisting: true }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Ingestion failed:', data.error || data.details);
      process.exit(1);
    }

    console.log('Ingestion completed successfully!\n');
    console.log('Stats:');
    console.log(`  - Chunks created: ${data.stats.chunksCreated}`);
    console.log(`  - Estimated tokens: ${data.stats.estimatedTokens}`);
    console.log(`  - Average chunk size: ${data.stats.avgChunkSize} chars`);
    console.log(`  - Total stored: ${data.stats.totalStored}`);
    console.log('\nChunks by page:');
    for (const [page, count] of Object.entries(data.stats.byPage)) {
      console.log(`  - ${page}: ${count}`);
    }
  } catch (error) {
    console.error('Error running ingestion:', error);
    process.exit(1);
  }
}

main();
