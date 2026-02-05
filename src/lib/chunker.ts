import { ContentSection } from './siteContent';
import { DocumentChunk } from './chatTypes';
import { v4 as uuidv4 } from 'uuid';

/**
 * Configuration for text chunking
 */
const CHUNK_CONFIG = {
  maxChunkSize: 600, // Target ~500-600 tokens (roughly 1 token per 4 chars)
  chunkOverlap: 100, // Overlap between chunks for context continuity
  minChunkSize: 100, // Minimum chunk size to avoid tiny fragments
};

/**
 * Split text into chunks with overlap
 */
function splitTextIntoChunks(text: string, maxSize: number, overlap: number): string[] {
  const chunks: string[] = [];

  // Split by sentences first for cleaner breaks
  const sentences = text.split(/(?<=[.!?])\s+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    // If adding this sentence would exceed max size, save current chunk and start new one
    if (currentChunk.length + sentence.length > maxSize && currentChunk.length >= CHUNK_CONFIG.minChunkSize) {
      chunks.push(currentChunk.trim());

      // Start new chunk with overlap from previous
      const overlapText = currentChunk.slice(-overlap);
      currentChunk = overlapText + ' ' + sentence;
    } else {
      currentChunk += (currentChunk ? ' ' : '') + sentence;
    }
  }

  // Don't forget the last chunk
  if (currentChunk.trim().length >= CHUNK_CONFIG.minChunkSize) {
    chunks.push(currentChunk.trim());
  } else if (chunks.length > 0) {
    // Append tiny last chunk to previous
    chunks[chunks.length - 1] += ' ' + currentChunk.trim();
  } else if (currentChunk.trim()) {
    // Only chunk, even if small
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Convert site content sections into document chunks for embedding
 */
export function createChunksFromContent(sections: ContentSection[]): DocumentChunk[] {
  const allChunks: DocumentChunk[] = [];

  for (const section of sections) {
    const textChunks = splitTextIntoChunks(
      section.content,
      CHUNK_CONFIG.maxChunkSize,
      CHUNK_CONFIG.chunkOverlap
    );

    for (let i = 0; i < textChunks.length; i++) {
      const chunk: DocumentChunk = {
        id: uuidv4(),
        content: textChunks[i],
        metadata: {
          sourceType: 'page',
          sourcePath: section.page,
          title: section.title,
          section: section.section,
          url: section.url,
        },
      };

      // Add chunk number if there are multiple chunks from this section
      if (textChunks.length > 1) {
        chunk.metadata.section = `${section.section || 'Content'} (part ${i + 1}/${textChunks.length})`;
      }

      allChunks.push(chunk);
    }
  }

  return allChunks;
}

/**
 * Estimate token count (rough approximation: 1 token ≈ 4 characters)
 */
export function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Get statistics about chunks
 */
export function getChunkStats(chunks: DocumentChunk[]): {
  totalChunks: number;
  avgChunkSize: number;
  totalTokens: number;
  byPage: Record<string, number>;
} {
  const totalChunks = chunks.length;
  const totalChars = chunks.reduce((sum, c) => sum + c.content.length, 0);
  const avgChunkSize = Math.round(totalChars / totalChunks);
  const totalTokens = estimateTokenCount(chunks.map(c => c.content).join(' '));

  const byPage: Record<string, number> = {};
  for (const chunk of chunks) {
    const page = chunk.metadata.sourcePath;
    byPage[page] = (byPage[page] || 0) + 1;
  }

  return { totalChunks, avgChunkSize, totalTokens, byPage };
}
