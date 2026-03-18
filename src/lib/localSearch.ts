import { siteContent, ContentSection } from './siteContent';
import { RetrievalResult } from './chatTypes';

/**
 * Local keyword-based search fallback when vector search is unavailable.
 * Scores content sections by keyword overlap with the query.
 */
export function localSearch(
  query: string,
  limit: number = 6,
  threshold: number = 0.1
): RetrievalResult[] {
  const queryTerms = tokenize(query);
  if (queryTerms.size === 0) return [];

  const scored: { section: ContentSection; score: number }[] = [];

  for (const section of siteContent) {
    const contentTerms = tokenize(section.content);
    const titleTerms = tokenize(section.title + ' ' + (section.section || ''));

    // Count matching terms
    let matches = 0;
    let titleMatches = 0;

    for (const term of queryTerms) {
      if (contentTerms.has(term)) matches++;
      if (titleTerms.has(term)) titleMatches++;
    }

    // Score: weighted combination of content and title matches
    const contentScore = matches / queryTerms.size;
    const titleScore = (titleMatches / queryTerms.size) * 1.5; // title matches worth more
    const score = Math.min(1, contentScore + titleScore);

    if (score >= threshold) {
      scored.push({ section, score });
    }
  }

  // Sort by score descending, take top N
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => ({
    content: item.section.content,
    metadata: {
      sourceType: 'page' as const,
      sourcePath: item.section.page,
      title: item.section.title,
      section: item.section.section,
      url: item.section.url,
    },
    similarity: item.score,
  }));
}

/**
 * Tokenize text into a set of normalized terms.
 * Removes stop words and normalizes to lowercase.
 */
function tokenize(text: string): Set<string> {
  const stopWords = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
    'on', 'with', 'at', 'by', 'from', 'as', 'into', 'about', 'between',
    'through', 'during', 'before', 'after', 'above', 'below', 'and', 'but',
    'or', 'nor', 'not', 'so', 'yet', 'both', 'either', 'neither', 'each',
    'every', 'all', 'any', 'few', 'more', 'most', 'other', 'some', 'such',
    'no', 'only', 'own', 'same', 'than', 'too', 'very', 'just', 'also',
    'it', 'its', 'that', 'this', 'these', 'those', 'i', 'me', 'my', 'we',
    'our', 'you', 'your', 'he', 'she', 'they', 'them', 'their', 'what',
    'which', 'who', 'whom', 'how', 'when', 'where', 'why',
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  return new Set(words);
}

/**
 * Generate a response from matched content when Claude API is unavailable.
 * Assembles a coherent answer from the top search results.
 */
export function generateLocalResponse(
  query: string,
  results: RetrievalResult[]
): string {
  if (results.length === 0) {
    return "I don't have specific information about that. For detailed questions, please contact AutonOps directly at bob.lee@autonops.us or call (937) 269-6420.\n\nYou can also explore our website sections for more information about our services, technology, and operations.";
  }

  // Take the best matching content and format it
  const topResult = results[0];
  const section = topResult.metadata.section
    ? ` (${topResult.metadata.section})`
    : '';

  // Trim content to a reasonable length
  let content = topResult.content;
  if (content.length > 600) {
    // Cut at the last sentence boundary within 600 chars
    const truncated = content.slice(0, 600);
    const lastPeriod = truncated.lastIndexOf('.');
    content = lastPeriod > 200 ? truncated.slice(0, lastPeriod + 1) : truncated + '...';
  }

  let response = content;

  // Add a second result if available and relevant
  if (results.length > 1 && results[1].similarity > 0.3) {
    let extra = results[1].content;
    if (extra.length > 300) {
      const truncated = extra.slice(0, 300);
      const lastPeriod = truncated.lastIndexOf('.');
      extra = lastPeriod > 100 ? truncated.slice(0, lastPeriod + 1) : truncated + '...';
    }
    response += '\n\n' + extra;
  }

  response += '\n\nWould you like more details on any of these topics, or would you prefer to speak with our team directly?';

  return response;
}
