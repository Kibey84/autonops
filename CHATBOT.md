# AutonOps AI Chatbot

An AI-powered chatbot for the AutonOps website that answers questions about services, operations, technology, and the Aeryl AI partnership using RAG (Retrieval-Augmented Generation).

## Features

- **RAG-based answers**: Grounds responses in site content to avoid hallucinations
- **Compliance-safe**: Never claims autonomous operations or FAA shortcuts
- **Command authority**: Always emphasizes IC retains control
- **Quick-action chips**: Guided conversation starters
- **Escalation flow**: Contact form for human assistance
- **Analytics**: Tracks usage patterns (anonymous)
- **Rate limiting**: Protects against abuse
- **Dark mode support**: Matches site theme

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    ChatWidget.tsx                        │   │
│  │  - Chat bubble (bottom-right)                           │   │
│  │  - Message history                                      │   │
│  │  - Quick-action chips                                   │   │
│  │  - Contact form (escalation)                            │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Routes                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ /api/chat    │  │ /api/ingest  │  │ /api/chat-contact    │  │
│  │              │  │              │  │                      │  │
│  │ - RAG query  │  │ - Ingest     │  │ - Store contact      │  │
│  │ - Claude LLM │  │   content    │  │   submissions        │  │
│  │ - Rate limit │  │ - Protected  │  │ - Rate limited       │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                  /api/chat-analytics                      │  │
│  │  - Track events (opened, messageSent, escalation)        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Supabase     │  │ OpenAI       │  │ Anthropic            │  │
│  │ (pgvector)   │  │ (embeddings) │  │ (Claude LLM)         │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Setup

### 1. Environment Variables

Create a `.env.local` file in the project root:

```env
# Anthropic API Key for Claude LLM
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI API Key for embeddings
OPENAI_API_KEY=sk-...

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Admin secret for protected endpoints
ADMIN_INGEST_SECRET=your-secret-here

# Optional: Site URL for ingestion script
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Go to the SQL Editor and run the following setup script:

```sql
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
```

### 3. Ingest Content

After setting up the database and environment variables, ingest the site content:

**Option A: Via npm script** (requires dev server running)
```bash
npm run dev  # In one terminal
npm run ingest  # In another terminal
```

**Option B: Via API call**
```bash
curl -X POST http://localhost:3000/api/ingest \
  -H "Authorization: Bearer YOUR_ADMIN_SECRET" \
  -H "Content-Type: application/json"
```

### 4. Run Locally

```bash
npm run dev
```

The chatbot will appear as a chat bubble in the bottom-right corner of all pages.

## Content Management

### Updating Site Content

Site content for RAG is defined in `src/lib/siteContent.ts`. When you update site pages:

1. Update the corresponding content in `siteContent.ts`
2. Re-run ingestion: `npm run ingest`

### Content Structure

Each content section has:
- `page`: Page identifier
- `url`: URL for source linking
- `title`: Section title
- `section`: Optional subsection name
- `content`: The actual text content

## API Endpoints

### POST /api/chat

Main chat endpoint for sending messages.

**Request:**
```json
{
  "sessionId": "sess_abc123",
  "message": "What services does AutonOps provide?"
}
```

**Response:**
```json
{
  "answer": "AutonOps provides...",
  "sources": [
    { "title": "AutonOps Services", "url": "/services", "type": "page" }
  ],
  "suggestedChips": ["Learn more about pricing", "Talk to a human"]
}
```

### POST /api/ingest

Ingest site content (admin protected).

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_SECRET
```

### POST /api/chat-contact

Submit contact form from escalation flow.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Fire Chief",
  "agency": "Springfield FD",
  "question": "I'd like to learn about pricing.",
  "sessionId": "sess_abc123"
}
```

### POST /api/chat-analytics

Track analytics events.

**Request:**
```json
{
  "eventType": "messageSent",
  "sessionId": "sess_abc123",
  "metadata": { "queryLength": 50 }
}
```

## Security

- **Rate limiting**: 20 chat requests/minute, 5 contact submissions/hour per IP
- **Input sanitization**: HTML stripped, length limits enforced
- **Prompt injection defense**: Suspicious patterns removed from queries
- **Admin protection**: Ingestion and analytics endpoints require secret
- **No secrets in client**: All API keys server-side only

## Compliance Rules (Built into System Prompt)

1. Never claim "fully autonomous" firefighting or operations
2. Always state IC (Incident Commander) retains authority
3. Never imply FAA requirements are bypassed
4. Never guarantee outcomes like "fire contained"
5. Avoid em dashes (use commas, colons, periods)
6. Ground all factual claims in retrieved context
7. Say "I don't have that detail" if not in knowledge base

## Files Overview

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Main chat endpoint
│   │   ├── chat-analytics/route.ts # Analytics tracking
│   │   ├── chat-contact/route.ts   # Contact form
│   │   └── ingest/route.ts         # Content ingestion
│   └── layout.tsx                  # Includes ChatWidget
├── components/
│   └── ChatWidget.tsx              # Chat UI component
└── lib/
    ├── chatTypes.ts                # TypeScript types
    ├── chunker.ts                  # Text chunking utility
    ├── embeddings.ts               # OpenAI embeddings
    ├── siteContent.ts              # Site content for RAG
    ├── supabase.ts                 # Supabase client
    └── vectorStore.ts              # Vector operations
scripts/
└── ingest.ts                       # CLI ingestion script
```

## Troubleshooting

### Chat returns errors

1. Check that all environment variables are set
2. Verify Supabase tables are created
3. Run ingestion to populate vector store
4. Check browser console for client-side errors

### Ingestion fails

1. Verify ADMIN_INGEST_SECRET matches
2. Check Supabase connection (URL and key)
3. Verify OpenAI API key has embeddings access

### No relevant results

1. Check that content was ingested (view document_chunks table)
2. Try lowering similarity threshold in vectorStore.ts
3. Verify query is related to ingested content

## Deployment

The chatbot works with any Next.js deployment:

1. **Vercel**: Set environment variables in project settings
2. **Railway/Render**: Configure env vars in dashboard
3. **Self-hosted**: Use `.env.local` or system environment

Remember to run ingestion after deployment to populate the vector store.
