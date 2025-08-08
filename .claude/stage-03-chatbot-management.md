# Stage 3: Chatbot Creation & Management (Weeks 5-6)

## Chatbot Configuration
- [ ] Create new chatbot wizard
- [ ] Basic chatbot settings (name, description, branding)
- [ ] Knowledge base upload (documents, FAQs)
- [ ] Chatbot personality/tone configuration
- [ ] Preview and testing interface

## Database Extensions
**Additional tables needed:**
```sql
-- Enhanced chatbot settings
ChatbotSettings: id, chatbot_id, welcome_message, fallback_message, ai_model, integrations (JSON)

-- Knowledge base management
Documents: id, chatbot_id, filename, file_url, file_type, processed_at, status
DocumentChunks: id, document_id, content, embedding, chunk_index, token_count

-- Chatbot branding and appearance
ChatbotAppearance: id, chatbot_id, primary_color, secondary_color, avatar_url, position, theme
```

## File Management
- [ ] AWS S3 or similar for document storage
- [ ] File processing for knowledge base (PDF, TXT, DOC parsing)
- [ ] Vector database integration (Pinecone/Weaviate) for semantic search
- [ ] Document chunking and embedding generation
- [ ] File upload progress tracking

## Implementation Tasks

### 1. Chatbot Creation Wizard
**Step 1: Basic Information**
- [ ] Chatbot name and description
- [ ] Domain selection
- [ ] Initial greeting message
- [ ] Fallback response configuration

**Step 2: Knowledge Base**
- [ ] File upload interface (drag & drop)
- [ ] Supported formats: PDF, TXT, DOC, DOCX, CSV
- [ ] FAQ manual entry interface
- [ ] URL crawling for website content
- [ ] Processing status indicators

**Step 3: Personality & Tone**
- [ ] Personality selector (professional, friendly, casual, etc.)
- [ ] Tone configuration (formal, conversational, technical)
- [ ] Response length settings (concise, detailed)
- [ ] Language selection

**Step 4: Appearance Customization**
- [ ] Color scheme picker
- [ ] Avatar upload/selection
- [ ] Widget positioning (bottom-right, bottom-left, etc.)
- [ ] Welcome bubble configuration

### 2. Knowledge Base Processing
- [ ] Document parsing pipeline:
  - PDF text extraction
  - Word document processing
  - CSV/Excel data import
  - Web scraping capabilities
- [ ] Text chunking algorithms
- [ ] Embedding generation (OpenAI/Cohere)
- [ ] Vector storage and indexing
- [ ] Semantic search implementation

### 3. Chatbot Management Dashboard
- [ ] List view of all chatbots
- [ ] Chatbot status indicators (active, inactive, processing)
- [ ] Quick actions (edit, duplicate, delete, preview)
- [ ] Performance metrics per chatbot
- [ ] Knowledge base status and health

### 4. Testing & Preview Interface
- [ ] Built-in chat testing interface
- [ ] Response quality evaluation
- [ ] Knowledge base coverage analysis
- [ ] A/B testing setup for responses
- [ ] Performance benchmarking

## File Structure

```
src/
├── actions/chatbots/
│   ├── create.ts           # Chatbot creation
│   ├── update.ts           # Chatbot updates
│   ├── knowledge-base.ts   # KB management
│   └── processing.ts       # Document processing
├── app/dashboard/chatbots/
│   ├── page.tsx           # Chatbot list
│   ├── new/
│   │   └── page.tsx       # Creation wizard
│   └── [id]/
│       ├── page.tsx       # Chatbot details
│       ├── settings/
│       │   └── page.tsx   # Settings page
│       └── knowledge-base/
│           └── page.tsx   # KB management
├── components/chatbots/
│   ├── creation-wizard/
│   │   ├── basic-info.tsx
│   │   ├── knowledge-base.tsx
│   │   ├── personality.tsx
│   │   └── appearance.tsx
│   ├── file-upload.tsx
│   ├── chat-preview.tsx
│   └── chatbot-card.tsx
├── lib/
│   ├── document-processor.ts
│   ├── vector-store.ts
│   └── embeddings.ts
└── workers/
    └── document-processing.ts  # Background processing
```

## Third-party Integrations

### Vector Database Options
**Pinecone**:
- Managed vector database
- Easy integration
- Good for smaller datasets
- Pay-per-use pricing

**Weaviate**:
- Self-hosted option
- More control over data
- Better for larger datasets
- One-time setup cost

### Document Processing
- **PDF**: pdf-parse or PDF.js
- **Word**: mammoth.js
- **Web scraping**: Puppeteer or Cheerio
- **Text chunking**: LangChain text splitters

### AI Model Integration
- **OpenAI**: GPT-4 for embeddings and chat
- **Cohere**: Alternative for embeddings
- **Claude**: Anthropic's API for responses

## Environment Variables
```env
# Vector Database
PINECONE_API_KEY=your_key
PINECONE_ENVIRONMENT=your_env
PINECONE_INDEX_NAME=chatbot_knowledge

# OpenAI
OPENAI_API_KEY=sk_your_key

# File Storage
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET_NAME=chatbot-files
```

## API Endpoints
- `POST /api/chatbots` - Create new chatbot
- `PUT /api/chatbots/[id]` - Update chatbot
- `POST /api/chatbots/[id]/documents` - Upload documents
- `DELETE /api/chatbots/[id]/documents/[docId]` - Remove document
- `POST /api/chatbots/[id]/test` - Test chatbot responses
- `GET /api/chatbots/[id]/analytics` - Get performance metrics

## Processing Workflows

### Document Upload Flow
1. User uploads file → S3 storage
2. Background job processes document
3. Extract text and create chunks
4. Generate embeddings for each chunk
5. Store in vector database
6. Update chatbot status

### Response Generation Flow
1. User query received
2. Generate query embedding
3. Search vector database for relevant chunks
4. Rank and select top results
5. Construct context with retrieved information
6. Generate AI response with context
7. Log interaction and update analytics

## Testing Checklist
- [ ] File upload and processing
- [ ] Document parsing accuracy
- [ ] Embedding generation and storage
- [ ] Semantic search quality
- [ ] Response relevance and accuracy
- [ ] Chatbot customization options
- [ ] Performance under load