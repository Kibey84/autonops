import { createServerSupabaseClient } from './supabase';
import { generateEmbedding, generateEmbeddings } from './embeddings';
import { DocumentChunk, RetrievalResult } from './chatTypes';

/**
 * Store document chunks with their embeddings in the vector database
 */
export async function storeChunks(chunks: DocumentChunk[]): Promise<void> {
  const supabase = createServerSupabaseClient();

  // Generate embeddings for all chunks
  console.log(`Generating embeddings for ${chunks.length} chunks...`);
  const texts = chunks.map(c => c.content);
  const embeddings = await generateEmbeddings(texts);

  // Prepare data for insertion
  const records = chunks.map((chunk, i) => ({
    id: chunk.id,
    content: chunk.content,
    metadata: chunk.metadata,
    embedding: embeddings[i],
  }));

  // Insert in batches of 100
  const batchSize = 100;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    console.log(`Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(records.length / batchSize)}...`);

    const { error } = await supabase
      .from('document_chunks')
      .insert(batch);

    if (error) {
      throw new Error(`Failed to insert chunks: ${error.message}`);
    }
  }

  console.log(`Successfully stored ${chunks.length} chunks`);
}

/**
 * Clear all existing chunks from the database
 */
export async function clearAllChunks(): Promise<void> {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from('document_chunks')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (workaround for no .deleteAll())

  if (error) {
    throw new Error(`Failed to clear chunks: ${error.message}`);
  }

  console.log('Cleared all existing chunks');
}

/**
 * Search for similar documents using vector similarity
 */
export async function searchSimilarDocuments(
  query: string,
  limit: number = 5,
  threshold: number = 0.7
): Promise<RetrievalResult[]> {
  const supabase = createServerSupabaseClient();

  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query);

  // Call the match_documents function
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count: limit,
  });

  if (error) {
    console.error('Search error:', error);
    throw new Error(`Search failed: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Transform results
  return data.map((row: { content: string; metadata: DocumentChunk['metadata']; similarity: number }) => ({
    content: row.content,
    metadata: row.metadata,
    similarity: row.similarity,
  }));
}

/**
 * Get statistics about stored documents
 */
export async function getStoredDocumentStats(): Promise<{
  totalChunks: number;
  byPage: Record<string, number>;
}> {
  const supabase = createServerSupabaseClient();

  const { data, error, count } = await supabase
    .from('document_chunks')
    .select('metadata', { count: 'exact' });

  if (error) {
    throw new Error(`Failed to get stats: ${error.message}`);
  }

  const byPage: Record<string, number> = {};
  if (data) {
    for (const row of data) {
      const page = row.metadata?.sourcePath || 'unknown';
      byPage[page] = (byPage[page] || 0) + 1;
    }
  }

  return {
    totalChunks: count || 0,
    byPage,
  };
}
