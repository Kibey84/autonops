import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client with service role key
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      document_chunks: {
        Row: {
          id: string;
          content: string;
          metadata: {
            sourceType: string;
            sourcePath: string;
            title: string;
            section?: string;
            url?: string;
          };
          embedding: number[];
          created_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          metadata: {
            sourceType: string;
            sourcePath: string;
            title: string;
            section?: string;
            url?: string;
          };
          embedding: number[];
          created_at?: string;
        };
      };
      chat_contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: string | null;
          agency: string | null;
          question: string;
          session_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: string | null;
          agency?: string | null;
          question: string;
          session_id?: string | null;
          created_at?: string;
        };
      };
      chat_analytics: {
        Row: {
          id: string;
          event_type: string;
          session_id: string;
          metadata: Record<string, unknown> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          session_id: string;
          metadata?: Record<string, unknown> | null;
          created_at?: string;
        };
      };
    };
  };
}

// SQL to create the tables (run this in Supabase SQL editor)
export const SETUP_SQL = `
-- Enable the vector extension
create extension if not exists vector;

-- Document chunks table for RAG
create table if not exists document_chunks (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  metadata jsonb not null,
  embedding vector(1536),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for vector similarity search
create index if not exists document_chunks_embedding_idx
  on document_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Contact form submissions
create table if not exists chat_contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  role text,
  agency text,
  question text not null,
  session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Analytics events
create table if not exists chat_analytics (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  session_id text not null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Function to search documents by similarity
create or replace function match_documents(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    document_chunks.id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) as similarity
  from document_chunks
  where 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
  order by document_chunks.embedding <=> query_embedding
  limit match_count;
$$;
`;
