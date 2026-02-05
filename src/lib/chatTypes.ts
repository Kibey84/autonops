// Types for the AutonOps chatbot system

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  suggestedChips?: string[];
}

export interface Source {
  title: string;
  url?: string;
  type: 'page' | 'internal';
  snippet?: string;
}

export interface ChatRequest {
  sessionId: string;
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  answer: string;
  sources: Source[];
  suggestedChips: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  role?: string;
  agency?: string;
  question: string;
  sessionId?: string;
}

export interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    sourceType: 'page' | 'faq' | 'team' | 'internal';
    sourcePath: string;
    title: string;
    section?: string;
    url?: string;
  };
  embedding?: number[];
}

export interface RetrievalResult {
  content: string;
  metadata: DocumentChunk['metadata'];
  similarity: number;
}

export interface AnalyticsEvent {
  eventType: 'opened' | 'messageSent' | 'escalationSubmitted' | 'chipClicked';
  sessionId: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}
