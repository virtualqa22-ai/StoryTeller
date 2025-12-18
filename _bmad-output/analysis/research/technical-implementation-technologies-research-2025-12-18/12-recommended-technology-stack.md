# 12. Recommended Technology Stack

## 12.1 Core Stack Recommendation

Based on comprehensive research, here's the recommended technology stack for StoryTeller:

### **Desktop Framework: Tauri**
- **Rationale**: 97% smaller, 50% faster, better security, superior UX
- **Backend**: Rust
- **Frontend**: Web technologies (HTML/CSS/JS)
- **Cross-platform**: Windows, macOS, Linux

### **UI Framework: Svelte 5**
- **Rationale**: Best performance, smallest bundles, highest developer satisfaction, modern architecture
- **Alternative**: React if hiring/ecosystem priority
- **UI Library**: ShadcN-style components (accessible, customizable)

### **Text Editor: Lexical**
- **Rationale**: Meta-backed, excellent performance, modern, collaborative support
- **Alternative**: ProseMirror if extreme customization needed
- **Features**: Rich formatting, distraction-free mode, word count, auto-save

### **Local Database: SQLite**
- **Rationale**: Perfect for relational data, single file portability, SQL queries, proven desktop DB
- **Library**: better-sqlite3 (Node.js) or rusqlite (Rust)
- **Schema**: Projects, chapters, characters, plots, rules

### **Vector Database: ChromaDB**
- **Rationale**: Local, open-source, simple, perfect for RAG prototyping, integrates well
- **Use**: Story Bible embeddings, semantic search
- **Deployment**: Embedded in desktop app

### **PDF Generation: Puppeteer**
- **Rationale**: Best HTML/CSS rendering, print-ready quality, familiar web technologies
- **Process**: HTML templates → Puppeteer → 300 DPI PDF
- **Fallback**: PDFKit for programmatic generation

### **EPUB Generation: Custom EPUB3 Builder**
- **Rationale**: Full EPUB3 compliance, Amazon KDP optimization, no dependency on incomplete libraries
- **Validation**: EPUBCheck for compliance
- **Testing**: Thorium Reader for cross-platform verification

### **AI Integration: Multi-Provider with User Keys**
- **Primary Models**:
  - Claude Sonnet 4 (best creative fiction)
  - GPT-4o (speed, dialogue, plot creativity)
  - Gemini 1.5 Pro (massive context for series analysis)
- **Orchestration**: Custom lightweight wrapper (not LangChain initially)
- **User API Keys**: Users provide, manage costs directly

### **Text Chunking: Hybrid Strategy**
- **Story Bible**: Document-based (character profiles, plot threads)
- **Manuscript**: Chapter/scene-based
- **Chunk size**: 1000-2000 characters with 10% overlap
- **Method**: Recursive (respect paragraphs)

## 12.2 Supporting Technologies

**Additional Components:**

**State Management:**
- Svelte stores (built-in, sufficient for most needs)
- Zustand if React chosen (lightweight, simple)

**Auto-Save:**
- Debounced saves (every 30 seconds or after N keystrokes)
- Local SQLite updates
- Background thread to avoid UI blocking

**File System:**
- Tauri FS API for project import/export
- Save projects as portable SQLite files
- Backup/restore functionality

**Git Integration (Optional Future):**
- Version control for manuscripts
- Branching for alternate storylines
- Track changes over time

---
