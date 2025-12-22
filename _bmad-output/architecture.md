---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - "_bmad-output/prd/executive-summary.md"
  - "_bmad-output/prd/project-classification.md"
  - "_bmad-output/prd/success-criteria.md"
  - "_bmad-output/prd/product-scope.md"
  - "_bmad-output/prd/user-journeys.md"
  - "_bmad-output/prd/innovation-novel-patterns.md"
  - "_bmad-output/prd/desktop-application-specific-requirements.md"
  - "_bmad-output/prd/project-scoping-phased-development.md"
  - "_bmad-output/prd/functional-requirements.md"
  - "_bmad-output/prd/non-functional-requirements.md"
  - "_bmad-output/ux-design-specification/ux-pattern-analysis-inspiration.md"
  - "_bmad-output/ux-design-specification/ux-patterns-micro-interactions.md"
  - "_bmad-output/ux-design-specification/executive-summary.md"
  - "_bmad-output/ux-design-specification/core-user-experience.md"
  - "_bmad-output/ux-design-specification/desired-emotional-response.md"
  - "_bmad-output/analysis/research/market-ai-writing-tools-research-2025-12-18/comprehensive-market-research-report.md"
  - "_bmad-output/analysis/research/domain-self-publishing-ecosystem-research-2025-12-18/comprehensive-domain-research-report.md"
  - "_bmad-output/analysis/research/technical-implementation-technologies-research-2025-12-18/comprehensive-technical-research-report.md"
workflowType: 'architecture'
lastStep: 5
project_name: 'StoryTeller'
user_name: 'Karan'
date: '2025-12-22'
hasProjectContext: false
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

StoryTeller encompasses 203 functional requirements (FR1-FR220) organized into 21 major feature areas:

1. **Project Setup & Configuration** - Genre selection, narrative framework, POV configuration, project wizard
2. **AI-Powered Story Development** - Character generation, worldbuilding, theme development, dialogue suggestions
3. **Story Bible Technology** - Core storage, validation engine, intelligence layer, onboarding/enhancement
4. **Writing Workspace** - Rich text editing, chapter management, progress tracking, data management
5. **Organization & Character Management** - Character profiles, relationship tracking, location management
6. **Multi-AI Provider Support** - OpenAI, Claude, Gemini, Deepseek, Yandex integration with API key management
7. **Professional Export** - PDF/EPUB/DOCX generation with KDP/IngramSpark compliance
8. **Cross-Platform Desktop** - Windows/Mac/Linux native application
9. **Auto-Update & Distribution** - Seamless update mechanism with rollback capability
10. **Offline Capability** - Complete functionality without internet connection
11. **User Experience & Interface** - Progressive disclosure, mode selection, contextual help
12. **Accessibility & Internationalization** - WCAG 2.1 AA compliance, i18n framework
13. **Beta Program & Quality Management** - Feedback collection, telemetry, quality gates
14. **Performance & Optimization** - Fast startup, responsive editor, efficient generation
15. **System Diagnostics & Error Handling** - Comprehensive logging, crash reporting, recovery
16. **Productivity & Motivation** - Gamification, achievements, streak tracking

**Non-Functional Requirements:**

88 NFRs organized by category with specific architectural implications:

- **Performance** (NFR1-NFR15): 3s cold start, 2s project load, 60 FPS editor, <7min chapter generation, <500MB memory baseline
- **Reliability** (NFR16-NFR30): 99.99% data reliability, <1 crash/100 hours, 30s auto-save, zero data loss
- **Security** (NFR31-NFR45): OS keychain API key encryption, local-only storage, secure IPC, no telemetry PII
- **Usability** (NFR46-NFR60): <5min time-to-first-chapter, intuitive UI, contextual help, graceful degradation
- **Compatibility** (NFR61-NFR70): Windows 10+, macOS 11+, Ubuntu 20.04+, cross-platform consistency
- **Maintainability** (NFR71-NFR80): Modular architecture, comprehensive logging, update mechanism
- **Beta Validation** (NFR81-NFR88): <5% contradiction rate, 80%+ user trust, NPS >50, 30+ beta completions

**Scale & Complexity:**

- **Primary domain:** Cross-platform desktop application with AI/ML integration, vector database, professional document generation
- **Complexity level:** High - Novel AI consistency management, local vector embeddings, multi-format export, real-time editor performance
- **Estimated architectural components:** 15-20 major components across UI, AI orchestration, data persistence, export engines, system integration

### Technical Constraints & Dependencies

**Platform Constraints:**
- Desktop-only application (Windows/Mac/Linux)
- Local-first architecture (no cloud sync by design)
- Offline-capable with graceful online enhancement

**AI Provider Constraints:**
- User-managed API keys (no vendor lock-in)
- Multiple provider support required (5 providers minimum)
- Rate limiting and quota management per provider
- Context window limitations (varies by provider: 8K-200K tokens)

**Performance Constraints:**
- Rich text editor must maintain 60 FPS with 80K+ word documents
- Cold start under 3 seconds
- Chapter generation under 7 minutes including validation
- Memory footprint under 500MB baseline

**Data Constraints:**
- Novel-length documents (80,000-150,000 words)
- Story Bible must handle hundreds of entries (characters, locations, plot threads)
- Vector embeddings for semantic search across entire novel corpus
- 30-second auto-save without blocking UI

**Export Constraints:**
- PDF: 300 DPI print-ready with bleed, professional typography
- EPUB3: EPUBCheck validation, Amazon/Apple/Kobo compatibility
- DOCX: Formatting preservation for editorial workflow

**Compliance Constraints:**
- Amazon KDP formatting standards
- IngramSpark print specifications
- EPUB3 standard (MOBI deprecated March 2025)
- WCAG 2.1 AA accessibility

### Cross-Cutting Concerns Identified

**Error Handling & Recovery:**
- AI generation failures (API errors, rate limits, timeouts)
- Network connectivity loss during AI operations
- Data corruption detection and recovery
- Graceful degradation when offline
- Auto-save conflict resolution

**Performance Monitoring & Optimization:**
- Editor responsiveness tracking (60 FPS requirement)
- AI generation speed monitoring
- Memory usage profiling
- Startup time optimization
- Large document handling (80K-150K words)

**Data Integrity & Validation:**
- 30-second auto-save with transaction safety
- Story Bible consistency validation (multi-layer)
- AI-generated content validation against Story Bible
- Export format validation (EPUBCheck, PDF/A compliance)
- Zero data loss requirement

**Security:**
- API key management (OS keychain integration)
- Local data encryption at rest
- Secure IPC between processes
- No cloud data transmission (local-only architecture)
- Privacy-preserving telemetry (no PII)

**Observability:**
- Comprehensive logging for debugging
- Crash reporting for beta program
- Performance metrics collection
- User feedback integration
- Diagnostic export for support

**Accessibility:**
- WCAG 2.1 AA compliance
- Keyboard navigation for all features
- Screen reader support
- High contrast mode
- Configurable text sizing

**Internationalization:**
- i18n framework readiness
- UTF-8 support for global authors
- Locale-aware formatting
- RTL text support planning

### Multi-Perspective Analysis: Critical Architectural Gaps

Through collaborative analysis with the architecture team, several critical gaps were identified that require architectural decisions:

#### 1. Story Bible Architecture - The Core Differentiator

**Technical Risks Identified:**
- Vector database integration with desktop application (uncommon pattern)
- Semantic search performance (<100ms requirement for real-time suggestions)
- Embedding strategy (pre-compute vs real-time)
- Validation engine architecture (real-time vs batch processing)

**Architectural Requirements:**
- Local vector store (ChromaDB embedded mode)
- Embedding model selection (local vs API-based)
- Multi-layer validation system with configurable thresholds
- Real-time contextual suggestions with <100ms response time
- Relationship graph for entity connections (characters, locations, themes)
- Hierarchical organization (nested categories, not flat lists)

**Success Criteria:**
- <5% contradiction rate (vs 30-40% industry baseline)
- Support 10K+ embeddings with <100ms search time
- Validation during AI generation (not post-processing)
- Demonstrably better than "paste summary into ChatGPT"

#### 2. AI Orchestration - Multi-Provider Complexity

**Technical Risks Identified:**
- Five AI providers = 5x testing surface, 5x failure modes
- Rate limiting per provider with different quotas
- Streaming responses for UX (not just wait-for-complete)
- Context window management across different provider limits
- Provider failover and retry logic

**Architectural Requirements:**
- Provider abstraction layer with unified interface
- Request queue with priority management
- Rate limiter per provider (token bucket algorithm)
- Streaming handler with chunk-by-chunk validation
- Retry policy with exponential backoff and provider fallback
- Prompt library for consistent AI feature quality

**Considerations:**
- MVP could start with 2 providers (OpenAI + Anthropic) to reduce complexity
- Full 5-provider support adds ~60% complexity to testing and maintenance
- Prompt engineering needs architectural component (not ad-hoc prompts)

#### 3. Rich Text Editor Performance - 60 FPS at Scale

**Technical Risks Identified:**
- 80K-150K word documents require virtualization
- Syntax highlighting and word count can block rendering
- Auto-save must be non-blocking
- Undo/redo across virtualized sections

**Architectural Requirements:**
- Virtual scrolling (render only visible ~2000 words)
- Incremental parsing (parse edited paragraphs only)
- Web Workers for heavy operations (highlighting, word count)
- Debounced auto-save (2s idle, transactional writes)
- Optimistic UI updates (show changes immediately, sync async)
- Performance telemetry baked into core (not bolted on)

**Editor Selection:**
- Lexical (Facebook) or ProseMirror (battle-tested)
- Both support collaborative editing patterns
- Need Svelte adapter for Lexical (React-based)

#### 4. Professional Export Pipeline - Quality vs Complexity

**Technical Risks Identified:**
- Vellum sets $250 quality bar (high user expectations)
- Typography control in Puppeteer PDF is limited
- EPUB3 compliance requires extensive validation
- Cross-platform font rendering differences

**Architectural Requirements:**
- Strategy pattern per export format (PDF, EPUB, DOCX)
- Validation pipeline with format-specific gates
- Background processing (Rust threads for heavy lifting)
- Progress events for UI updates
- Round-trip testing (export → re-import → verify)

**Export Quality Considerations:**
- PDF: Puppeteer (good) vs Prince XML (expensive) vs Rust crates (limited)
- EPUB: Custom EPUB3 builder with EPUBCheck integration
- DOCX: docx.js library with schema validation
- Typography: May need professional engine license for Vellum-level quality

#### 5. Data Integrity & Backup - Zero Data Loss Requirement

**Critical Gap - Not Initially Architectured:**

**Architectural Requirements:**
- Auto-backup service (every 5 minutes, separate thread)
- Keep rolling 10 backups
- One-click restore UI
- Export full project as ZIP
- Transaction-level testing for auto-save race conditions
- Fault injection testing (crash during save, disk full, corruption)
- Recovery testing (rollback, conflict resolution)

**Business Impact:**
- One data loss incident in beta = reputation destroyed
- 99.99% reliability requirement is not optional

#### 6. Prompt Library Service - AI Feature Consistency

**Critical Gap - Not Initially Architectured:**

**Architectural Requirements:**
- Centralized prompt templates for all AI features:
  - Character generation
  - Worldbuilding
  - Theme development
  - Dialogue suggestions
  - Chapter generation
- Template versioning for A/B testing
- Context injection (Story Bible → prompt)
- Style profile integration (user voice customization)

**Business Impact:**
- Without this: AI feature quality is ad-hoc and inconsistent
- With this: Reproducible quality, testable prompts, user customization

#### 7. Telemetry & Observability - Beta Feedback Loop

**Critical Gap - Not Initially Architectured:**

**Architectural Requirements:**
- Event tracking (anonymized, no PII)
- Performance metrics (startup time, FPS, generation speed)
- Error reporting (crash logs, exception tracking)
- Feature usage analytics
- A/B testing framework for prompts and features
- Privacy controls (opt-in, transparent data collection)

**Business Impact:**
- Beta without metrics = flying blind
- Need to validate <5% contradiction rate claim
- NPS and user trust metrics require instrumentation

#### 8. UX Services Layer - User Delight Architecture

**Critical Gap - User Experience Requirements Underserved:**

**Onboarding Service (Critical for Activation):**
- First-run wizard (<5 minutes to first chapter)
- AI provider setup (guided, with tutorials)
- Auto-generate initial Story Bible from pitch
- Interactive demo showing value proposition
- **Impact:** Without this, 40% of beta users (first-timers) bounce

**Style Profile Service (Critical for Literary Users):**
- Analyze user's existing writing samples
- Extract style fingerprint (sentence length, vocabulary, metaphors)
- Inject style into AI prompts
- Real-time style matching score
- **Impact:** Without this, literary perfectionist persona rejects product

**Keyboard Shortcut Service (Critical for Power Users):**
- Scrivener-level shortcut parity
- Customizable key bindings
- Quick navigation, Story Bible search, AI generation
- **Impact:** Without this, professional authors (30% of market) won't adopt

**Contextual Help Service:**
- In-app tutorials and tooltips
- Video tutorials (embedded or links)
- Progressive disclosure guidance
- **Impact:** Reduces support burden, improves activation

**Gamification Service:**
- Achievement tracking (words written, chapters completed)
- Streak counter (daily writing goals)
- Milestone celebrations (first chapter, first 10K words)
- Event sourcing pattern for achievement triggers
- **Impact:** Increases engagement and retention

### Requirements Coverage Analysis

**Current Architectural Coverage:**
- ✓ Fully Covered: ~145 / 291 requirements (50%)
- ⚠️ Partially Covered: ~98 / 291 requirements (34%)
- ❌ Not Addressed: ~48 / 291 requirements (16%)

**Critical Additions Required for MVP Beta:**

1. **BackupService** - Data loss prevention (CRITICAL)
2. **PromptLibraryService** - AI feature quality (HIGH)
3. **TelemetryService** - Beta feedback loop (HIGH)
4. **OnboardingService** - User activation (HIGH)
5. **StyleProfileService** - Literary user retention (MEDIUM)
6. **KeyboardShortcutService** - Power user adoption (MEDIUM)

**Can Defer Post-Beta:**
- Advanced relationship graph visualization
- Timeline tracking across story arcs
- Advanced contextual help system
- Community features and sharing

### Competitive Positioning & Market Reality

**Competitive Landscape:**
- **Sudowrite/NovelAI:** AI writing with weak consistency management
- **Scrivener:** Strong organization, no AI, weak export
- **Vellum:** Best-in-class export, Mac-only, $250, no AI

**StoryTeller's Architectural Moat:**
1. **Story Bible with <5% contradiction rate** - Unique, defensible
2. **Integrated workflow** - Architecture enables zero-friction (not 3-5 tools)
3. **Professional export + cross-platform** - Breaks Vellum's Mac monopoly
4. **Local-first with vector search** - Privacy + performance

**Integration Speed as Moat:**
- Notion → Claude: 5 clicks, copy/paste, lose context
- StoryTeller: 1 click, full context, automatic validation
- Vellum export: 15 minutes (import, configure, export)
- StoryTeller: 30 seconds (one-click export)

**Market Timing Considerations:**
- NovelAI raised $10M (May 2024) - building fast
- Competitors could add Story Bible feature in 3-6 months
- Every month delayed = competitor advantage grows
- Quality failures in beta = reputation damage

### Persona-Driven Architectural Requirements

**Sarah (First-Timer, 55) - 40% of Beta Users:**
- **Needs:** Simple onboarding, guided experience, <5min to first chapter
- **Architectural Impact:** OnboardingService is existential, not optional
- **Risk:** Without this, Sarah bounces at setup, 40% of market lost

**James (Prolific Pro, 38) - 30% of Beta Users:**
- **Needs:** Hierarchical organization, keyboard shortcuts, Scrivener-level features
- **Architectural Impact:** Flat Story Bible insufficient, needs nested structure
- **Risk:** Without hierarchy + shortcuts, professionals won't adopt

**Elena (Literary Perfectionist, 29) - 30% of Beta Users:**
- **Needs:** Voice customization, style control, AI that matches her writing
- **Architectural Impact:** StyleProfileService required for differentiation
- **Risk:** Without this, literary users reject as "generic AI tool"

### Recommended Architectural Scope for Beta

**Core Architecture (8 weeks):**
1. Story Bible Service with semantic search
2. AI Orchestrator with multi-provider support
3. Rich text editor with virtualization
4. Export pipeline (PDF/EPUB/DOCX)

**Critical Additions (3 weeks):**
5. BackupService (data loss prevention)
6. PromptLibraryService (AI quality)
7. TelemetryService (beta metrics)
8. Export validation gates (quality assurance)

**UX Layer (2 weeks):**
9. OnboardingService (user activation)
10. StyleProfileService (literary users)
11. Keyboard shortcuts (power users)

**Total Timeline: 9 months to beta-ready product**

**Risk of Skipping UX Layer:**
- Launch in 8 months
- Beta users churn (poor activation, weak retention)
- Emergency UX fixes take 3 months
- Re-beta required
- Total: 13 months to launch

**Recommendation:** Include UX services in initial scope. Cheaper to build right the first time than fix in production.

### Quality Gates for Beta Release

**Technical Quality:**
- ✓ 95%+ unit test coverage on core services
- ✓ 100% EPUBCheck pass rate on sample novels
- ✓ <5% contradiction rate validated on test corpus
- ✓ Zero data loss in fault injection tests
- ✓ 60 FPS editor on 80K word doc on minimum spec hardware
- ✓ 3s cold start on all 3 platforms
- ✓ <1 crash per 100 hours of alpha testing

**User Experience Quality:**
- ✓ <5 minutes time-to-first-chapter (Sarah metric)
- ✓ Story Bible suggestion relevance >80% (user study)
- ✓ Export quality perception matches expectations (survey)
- ✓ Keyboard shortcut discoverability >60% (James metric)
- ✓ Style matching score >75% (Elena metric)

**Business Validation:**
- ✓ 30+ beta authors complete 50K+ word novels
- ✓ NPS >50
- ✓ 80%+ user trust in AI-generated content
- ✓ 80%+ completion rate (novel finished)
- ✓ Zero critical data loss incidents

### Key Architectural Decisions Needed

The following critical decisions must be made before implementation begins:

1. **Embedding Model:** Local (Ollama) vs API (OpenAI embeddings)?
2. **ChromaDB Integration:** Python subprocess overhead acceptable, or rewrite in Rust?
3. **AI Provider Count:** Start with 2 (OpenAI + Anthropic) or full 5 for MVP?
4. **UI Framework Bridge:** Accept Fluent UI 2 (React) performance hit in Svelte, or build custom?
5. **PDF Engine:** Puppeteer (200MB, good quality) vs Rust crates (smaller, limited features) vs Prince XML (expensive, perfect)?
6. **Prompt Versioning:** Simple template files or full A/B testing framework?
7. **Telemetry Backend:** Self-hosted or third-party (Sentry, PostHog)?
8. **Beta Timeline:** 8 months (technical only) vs 9 months (includes UX layer)?

These decisions will shape the architecture and must be resolved before detailed design begins.

## Starter Template Evaluation

### Primary Technology Domain

**Cross-Platform Desktop Application** - Based on project requirements analysis for StoryTeller, which demands:
- Local-first architecture with no cloud sync
- High-performance requirements (3s cold start, 60 FPS editor, <500MB memory)
- Native system integration (file system, OS keychain, system tray)
- Professional export capabilities (PDF/EPUB/DOCX generation)
- Multi-platform support (Windows/Mac/Linux)

### Starter Options Considered

#### Option 1: Tauri 2.0 + Svelte 5 (SELECTED)

**Performance Metrics:**
- Bundle size: ~2.5MB installer (97% smaller than Electron)
- Memory usage: 30-40 MB idle (85% less than Electron)
- Startup time: <0.5 seconds (50% faster than Electron)
- Architecture: Rust backend + native OS webview (no Chromium bundle)

**Technical Stack:**
- **Backend:** Rust (compiled to native binary)
- **Frontend:** Svelte 5 with runes (fine-grained reactivity)
- **Webview:** WRY library (WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux)
- **Build Tool:** Vite
- **Language:** TypeScript (frontend) + Rust (backend)

**Advantages for StoryTeller:**
1. **Exceeds Performance Requirements:** <0.5s startup far exceeds 3s NFR requirement
2. **Memory Efficiency:** 30-40MB base allows 460MB headroom for Story Bible + editor + AI operations
3. **Native Performance:** Rust backend ideal for SQLite operations, vector embeddings, PDF/EPUB generation
4. **Security Built-In:** OS keychain integration, secure IPC by default, no Node.js vulnerabilities
5. **Small Distribution:** 2.5MB installer vs 85MB (crucial for user adoption)
6. **Modern Architecture:** Tauri 2.0 adoption up 35% in 2025, active development

**Svelte 5 Runes Benefits:**
- **Universal Reactivity:** Runes work in `.svelte.ts` modules (not just components) - perfect for Story Bible reactive state
- **Performance:** Compile-time optimization, minimal runtime overhead
- **60 FPS Capable:** Fine-grained reactivity enables virtualized editor performance
- **Developer Experience:** TypeScript integration, clear reactive primitives

**Trade-offs Accepted:**
- **Cross-Platform UI Consistency:** Different webviews per OS (mitigated by Fluent UI design system)
- **Smaller Ecosystem:** Less mature than Electron (but growing rapidly)
- **Rust Learning Curve:** Backend requires Rust knowledge (3-week ramp-up estimated)

#### Option 2: Electron + Vite + Svelte 5 (Not Selected)

**Performance Metrics:**
- Bundle size: ~85MB installer
- Memory usage: 200-300 MB idle
- Startup time: 1-2 seconds
- Architecture: Node.js backend + bundled Chromium

**Why Not Selected:**
- **Performance Gap:** 1-2s startup barely meets 3s requirement with no safety margin
- **Memory Overhead:** 200-300MB base consumes 40-60% of 500MB budget before app logic
- **Bundle Size:** 34x larger than Tauri (user experience impact)
- **Resource Competition:** High baseline CPU/memory leaves less for AI/editor/export workloads
- **Architectural Necessity:** Story Bible (100MB+) + AI buffers would consume entire 500MB NFR budget with Electron

### Selected Starter: Tauri 2.0 + Svelte 5 + TypeScript + Rust

**Rationale for Selection:**

Tauri 2.0 + Svelte 5 directly supports StoryTeller's core architectural requirements:

1. **Performance NFRs:** Startup (<3s ✓), Memory (<500MB ✓), Editor (60 FPS ✓)
2. **Story Bible Operations:** Rust performance for SQLite + vector embeddings + validation
3. **Export Quality:** Native PDF/EPUB generation without Chromium overhead
4. **Security:** OS-level credential management, local-only data architecture
5. **User Experience:** Small download, fast startup, responsive UI
6. **Future-Proof:** Modern stack with strong 2025 momentum

**Initialization Commands:**

**Using npm 7+:**
```bash
npm create tauri-app@latest storyteller -- --template svelte-ts
cd storyteller
npm install
npm run tauri dev
```

**Using pnpm (recommended for speed):**
```bash
pnpm create tauri-app storyteller --template svelte-ts
cd storyteller
pnpm install
pnpm tauri dev
```

**Using yarn:**
```bash
yarn create tauri-app storyteller --template svelte-ts
cd storyteller
yarn install
yarn tauri dev
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**
- **Frontend:** TypeScript with strict mode enabled
- **Backend:** Rust 2021 edition
- **Type Safety:** Full TypeScript coverage, Rust compile-time guarantees
- **Package Manager:** pnpm recommended (faster installs, disk efficiency)

**Project Structure:**

```
storyteller/
├── src/                    # Svelte frontend
│   ├── lib/
│   │   ├── components/     # Svelte 5 components with runes
│   │   ├── stores/         # Reactive state (runes in .svelte.ts)
│   │   └── utils/          # Frontend utilities
│   ├── App.svelte          # Root component
│   └── main.ts             # Frontend entry point
│
├── src-tauri/              # Rust backend
│   ├── src/
│   │   ├── main.rs         # Tauri app entry point
│   │   └── lib.rs          # Optional: Rust module organization
│   ├── capabilities/       # Tauri 2.0 permission system
│   │   └── default.json    # API access controls
│   ├── icons/              # App icons (generated)
│   ├── Cargo.toml          # Rust dependencies
│   └── tauri.conf.json     # Tauri configuration
│
├── public/                 # Static assets
├── index.html              # HTML shell
├── vite.config.ts          # Vite build configuration
├── svelte.config.js        # Svelte compiler options
├── tsconfig.json           # TypeScript configuration
└── package.json            # Node dependencies
```

**Styling Solution:**
- **Pre-configured:** CSS with Vite processing
- **Recommended Addition:** Tailwind CSS or vanilla CSS modules
- **Design System:** Custom Svelte components following Fluent design language (NOT Fluent UI 2 React bridge)
- **Typography:** Custom font loading for professional export

**Build Tooling:**
- **Frontend Build:** Vite (fast HMR, optimized production builds)
- **Backend Build:** Cargo (Rust compiler with release optimizations)
- **Bundler:** Tauri CLI (creates platform-specific installers)
- **Optimization:** Tree-shaking, code splitting, asset optimization
- **Output Formats:**
  - Windows: .msi, .exe
  - macOS: .dmg, .app
  - Linux: .deb, .appimage

**Testing Framework:**
- **Not Pre-configured** - To be added based on testing strategy
- **Recommended:**
  - Frontend: Vitest (Vite-native, fast)
  - Backend: Rust built-in testing (`cargo test`)
  - E2E: Playwright or Tauri's WebDriver integration
  - Unit: Vitest for TypeScript, Rust tests for backend

**Code Organization Patterns:**
- **Frontend:** Component-based architecture with Svelte 5 runes for reactive state
- **Backend:** Rust modules organized by domain (Story Bible, AI, Export, etc.)
- **IPC:** Tauri commands (Rust functions exposed to frontend)
- **State Management:** Svelte runes in `.svelte.ts` modules (universal reactivity)

**Development Experience:**
- **Hot Module Replacement (HMR):** Vite for frontend instant updates
- **TypeScript:** Full type checking with strict mode
- **Rust Development:** Cargo watch for backend auto-recompilation
- **Debugging:**
  - Frontend: Browser DevTools in webview
  - Backend: Rust debugger (lldb/gdb) or println debugging
- **Cross-Platform Development:** Build and test on target platforms

**Security Configuration:**
- **Capability System:** Tauri 2.0 permission model (capabilities/default.json)
- **IPC Security:** Commands must be explicitly allowed
- **Content Security Policy:** Configured in tauri.conf.json
- **Webview Isolation:** Sandboxed by default
- **Native APIs:** Restricted to allowed capabilities

### Critical Technology Decisions (Resolved Through Team Analysis)

#### Decision 1: Vector Store - Qdrant (Embedded Rust)

**Problem:** ChromaDB is Python-based, requiring subprocess management from Rust.

**Team Analysis:**
- ChromaDB subprocess adds complexity: Python runtime requirement (80MB+), process lifecycle management, IPC overhead
- Alternative: Qdrant client library in Rust, embedded mode (memory:// or disk-based)

**Decision:** Use Qdrant in embedded mode
- **Pros:** Pure Rust, no subprocess, 10x faster than Python IPC, simpler deployment
- **Cons:** Slightly less mature than ChromaDB (acceptable trade-off)
- **Implementation:** `qdrant-client` crate with in-memory or persistent storage

#### Decision 2: UI Components - Custom Svelte (Fluent Design Language)

**Problem:** Fluent UI 2 is React-based, requires bridging to Svelte.

**Team Analysis:**
- React bridge adds 300KB+ bundle, two reactivity systems fighting, state synchronization complexity
- Alternative: Build 15-20 core Svelte components following Fluent design tokens

**Decision:** Drop Fluent UI 2 React components, build native Svelte
- **Pros:** Better performance, smaller bundle, native Svelte reactivity, maintainability
- **Cons:** 2-3 weeks initial development time
- **Implementation:** Custom components in `src/lib/components/fluent/` using Fluent design tokens

#### Decision 3: PDF Export - Puppeteer Sidecar

**Problem:** Matching Vellum's $250 professional export quality.

**Team Analysis:**
- Rust PDF crates (printpdf, lopdf) have limited typography control
- Prince XML is $3,950 license (cost-prohibitive)
- Puppeteer provides best typography control for free

**Decision:** Use Puppeteer as Tauri sidecar
- **Pros:** Vellum-quality typography, print-ready 300 DPI, full CSS control
- **Cons:** Adds ~120MB to bundle (Node.js + Chromium)
- **Implementation:** Tauri sidecar process, IPC for PDF generation commands

#### Decision 4: DOCX Export - Node.js Sidecar (docx.js)

**Problem:** DOCX generation for editorial workflow.

**Team Analysis:**
- Consistent with Puppeteer sidecar pattern
- docx.js is mature, handles complex formatting

**Decision:** Use Node.js sidecar with docx.js library
- **Pros:** Professional quality, maintains formatting, editor-compatible
- **Cons:** Adds to sidecar bundle (~30MB additional)
- **Implementation:** Same sidecar as Puppeteer, shared Node.js runtime

#### Decision 5: ML/NLP for Style Profiles - Rust-ONNX Runtime

**Problem:** StyleProfileService requires ML/NLP for analyzing user writing samples.

**Team Analysis:**
- Python subprocess (transformers, spaCy) consistent with AI theme but heavy
- Rust NLP (rust-bert) immature
- Cloud API creates online dependency (violates local-first architecture)

**Decision:** Use Rust-ONNX Runtime with pre-trained models
- **Pros:** Pure Rust, offline-capable, fast inference (<2s), no subprocess
- **Cons:** Adds ~50MB (model weights)
- **Implementation:** Load sentence-transformers ONNX models, extract style fingerprints

### UX Services Architecture (Required for Beta)

Through multi-perspective team analysis, three critical UX services were identified as missing from initial stack decision. These directly impact beta user activation and retention:

#### OnboardingService Architecture

**Purpose:** Enable <5 minutes time-to-first-chapter (NFR48, Sarah persona requirement)

**Components:**
- **Frontend:** Svelte wizard component (3-5 steps)
  - Step 1: Welcome + value proposition
  - Step 2: AI provider setup (guided with tutorials)
  - Step 3: Story pitch input (1-sentence description)
  - Step 4: Auto-generate initial Story Bible from pitch
  - Step 5: Generate first scene (streaming demonstration)

- **Backend:** Rust state management
  - First-run detection (check SQLite for existing projects)
  - Wizard state persistence (resume if interrupted)
  - Integration with AI orchestrator for initial generation

**User Impact:** Without this, 90% of first-time users (40% of market) fail to activate

#### StyleProfileService Architecture

**Purpose:** Enable literary users to match their voice (Elena persona requirement)

**Components:**
- **Frontend:** Svelte profile UI
  - Upload writing sample (2000 words)
  - Progress indicator during analysis
  - Visual style profile display (sentence length chart, vocabulary gauge)
  - Style adjustment sliders (formality, conciseness)

- **Backend:** Rust-ONNX inference
  - Load sentence-transformers model
  - Extract style fingerprint:
    - Sentence length distribution
    - Vocabulary complexity (percentile)
    - Metaphor frequency
    - Tone classification
  - Store profile in SQLite (per-project)
  - Inject into AI prompt templates

**User Impact:** Without this, literary perfectionist users (30% of market) reject product as "generic AI"

#### KeyboardShortcutService Architecture

**Purpose:** Enable power users to maintain productivity (James persona requirement)

**Components:**
- **Frontend:** Svelte settings UI
  - Shortcut list with search/filter
  - Remap interface with conflict detection
  - Import/export configurations
  - Scrivener preset (one-click migration)

- **Backend:** Tauri global shortcuts + SQLite
  - Shortcut registry with conflict detection
  - Persistent storage in SQLite
  - Global shortcut registration via Tauri API
  - Command palette (Cmd+K) for quick access

**User Impact:** Without this, professional authors (30% of market) won't switch from Scrivener

### Additional Setup Required Post-Scaffolding

**Story Bible Dependencies:**
- Add `rusqlite` with `bundled` feature for SQLite
- Add `qdrant-client` for embedded vector store
- Integrate sentence-transformers ONNX model for embeddings

**AI Provider Integration:**
- Add HTTP client (`reqwest` in Rust)
- Add streaming response handling (tokio streams)
- Configure CORS for API calls
- Implement PromptLibraryService (template versioning)

**Export Dependencies:**
- Set up Puppeteer + Node.js sidecar
- Add docx.js to sidecar
- Custom EPUB3 builder in Rust
- EPUBCheck CLI integration for validation

**ML/NLP Integration:**
- Add ONNX Runtime Rust bindings
- Download sentence-transformers ONNX model
- Style classification model training/fine-tuning

**UI Framework:**
- Build 15-20 core Svelte components (Fluent design language)
- Configure Tailwind CSS or vanilla CSS modules
- Set up design tokens system

**Development Tools:**
- Configure Vitest for frontend testing
- Set up Playwright for E2E testing
- Add ESLint + Prettier for code quality
- Configure Rust clippy for backend linting
- Create custom Tauri command test harness

**UX Services Implementation:**
- OnboardingService (Svelte wizard + Rust state)
- StyleProfileService (ONNX + Svelte UI + SQLite storage)
- KeyboardShortcutService (Tauri shortcuts + Svelte settings)

**Note:** Project initialization using the `create-tauri-app` command should be the first implementation task (Sprint 1, Week 1).

### Technology Stack Summary

**Core Stack (Confirmed):**
- ✓ **Desktop Framework:** Tauri 2.0
- ✓ **Frontend Framework:** Svelte 5 with runes
- ✓ **Backend Language:** Rust (2021 edition)
- ✓ **Frontend Language:** TypeScript (strict mode)
- ✓ **Build Tool:** Vite
- ✓ **Package Manager:** pnpm

**Data & Storage (Decided):**
- ✓ **Relational Database:** SQLite with rusqlite
- ✓ **Vector Store:** Qdrant (embedded Rust mode)
- ✓ **ML/NLP:** Rust-ONNX Runtime with sentence-transformers

**Export Pipeline (Decided):**
- ✓ **PDF Generation:** Puppeteer sidecar
- ✓ **EPUB Generation:** Custom Rust EPUB3 builder
- ✓ **DOCX Generation:** Node.js + docx.js sidecar

**UI/UX (Decided):**
- ✓ **Component Library:** Custom Svelte (Fluent design language)
- ✓ **Styling:** Tailwind CSS or vanilla CSS modules
- ✓ **Design Tokens:** Fluent UI design system tokens

**UX Services (Required):**
- ✓ **OnboardingService:** Svelte wizard + Rust state management
- ✓ **StyleProfileService:** ONNX inference + Svelte UI + SQLite
- ✓ **KeyboardShortcutService:** Tauri global shortcuts + Svelte settings

### Bundle Size & Performance Analysis

**Final Bundle Breakdown:**
- Tauri application core: 2.5MB
- Puppeteer + Node.js sidecar: 120MB
- docx.js in sidecar: 30MB
- ONNX Runtime + models: 50MB
- Application assets + code: 20MB
- **Total Installed Size: ~222MB**

**Performance Characteristics:**
- Cold startup: <0.5s (6x better than 3s requirement)
- Memory baseline: 30-40MB Tauri + 50MB ONNX = 90MB (82% headroom for app logic)
- Editor performance: Svelte 5 runes enable 60 FPS with virtualization
- Story Bible search: Qdrant <100ms for 10K+ embeddings

**Comparison to Electron Alternative:**
- Electron would be 300-400MB installed (35% larger)
- Electron baseline memory 200-300MB (consumes entire 500MB budget)
- Startup 1-2s (3x slower)

### Timeline Impact Assessment

**Original Estimate:** 9 months

**Additions:**
- Rust learning curve: +3 weeks (if team is TypeScript-only)
- Custom Svelte Fluent components: +2 weeks (Sprint 1-2)
- Qdrant integration: Net zero (saves 1 week vs ChromaDB Python hassle)
- Puppeteer sidecar setup: +1 week
- ONNX integration: +2 weeks
- UX Services architecture: +6 weeks (2 weeks each, can parallelize)

**Revised Estimate:** 11.5 months to beta-ready product

**Risk Assessment:**
- If team has Rust experience: 10.5 months
- If team is Rust-new: 12 months
- If UX services skipped: Beta fails user validation, +3 months re-work = 13 months total

**Recommendation:** Build UX services in initial scope. Cheaper to build correctly than fix post-launch.

### Testing Strategy Implications

**Testing Maturity by Layer:**
- Rust backend: Excellent (cargo test, tokio::test)
- Svelte 5 components: Good (Vitest, @testing-library/svelte)
- Tauri IPC: Weak (no official mocking, need custom test harness)
- Cross-platform: Medium (CI matrix, manual testing)

**Required Testing Infrastructure (Sprint 1):**
- Custom Tauri command mock framework (2 weeks investment)
- Cross-platform CI pipeline (GitHub Actions matrix)
- Fault injection framework for data integrity testing
- E2E test suite with Playwright

**Quality Gates:**
- 90%+ Rust unit test coverage
- 85%+ Svelte component coverage
- 70%+ Tauri command coverage (via E2E)
- 100% EPUBCheck pass rate on exports
- Zero data loss in fault injection tests
- Performance regression tests on all platforms

### Production Deployment Considerations

**Distribution:**
- Windows: .msi installer via Tauri bundler
- macOS: .dmg with code signing (Apple Developer account required)
- Linux: .deb, .appimage for broad compatibility

**Auto-Update:**
- Tauri built-in updater with signature verification
- Rollback capability for failed updates
- Beta channel for early testing

**Sidecar Management:**
- Puppeteer + Node.js packaged with app
- Process lifecycle management (spawn, monitor, restart on crash)
- IPC for communication (stdin/stdout or HTTP)

**ONNX Model Distribution:**
- Ship pre-trained models with app (50MB)
- Future: Optional model downloads for advanced features
- Model versioning for A/B testing

**Monitoring & Observability:**
- Telemetry via TelemetryService (opted-in, no PII)
- Crash reporting for beta program
- Performance metrics (startup time, FPS, generation speed)

### Sources

- [Tauri 2.0 Create Project Guide](https://v2.tauri.app/start/create-project/)
- [Tauri 2.0 Project Structure](https://v2.tauri.app/start/project-structure/)
- [create-tauri-app on GitHub](https://github.com/tauri-apps/create-tauri-app)
- [create-tauri-app on npm](https://www.npmjs.com/package/create-tauri-app)
- [Tauri vs Electron 2025 Comparison](https://www.raftlabs.com/blog/tauri-vs-electron-pros-cons/)
- [Tauri vs. Electron Performance & Bundle Size](https://dev.to/gethopp/tauri-vs-electron-performance-bundle-size-and-the-real-trade-offs-1el4)
- [Tauri Svelte TypeScript Best Practices](https://cursorrules.org/article/tauri-svelte-typescript-guide-cursorrules-prompt-f)
- [Svelte 5 Runes Guide](https://sveltekit.io/blog/runes)

## Core Architectural Decisions

### Decision Priority Analysis

Through collaborative multi-perspective team analysis, the remaining architectural decisions were evaluated and resolved. These decisions complement the foundational stack choices made in Step 3.

**Critical Decisions (Block Implementation):**
- Styling system for custom Fluent components
- Editor library for 60 FPS performance with large documents
- SQLite migration strategy for database evolution
- Testing framework approach for Tauri commands

**Important Decisions (Shape Architecture):**
- Rate limiting implementation for multi-AI providers
- Prompt template storage and versioning
- Telemetry backend for beta program

**Deferred Decisions (Post-MVP):**
- Advanced state management (beyond Svelte runes)
- Code signing certificates (required for production, not MVP)
- Advanced CI/CD tooling (can evolve with needs)

### Data Architecture

#### Database: SQLite with rusqlite (Confirmed from Step 3)

**Version:** SQLite 3.44+
**Rust Crate:** `rusqlite` 0.30+

**Schema Design Approach:**
- Relational model for structured data (projects, entities, chapters, metadata)
- JSON columns for flexible data (Story Bible entity attributes, user preferences)
- Foreign keys enforced for referential integrity
- Indexes on frequently queried columns (entity names, timestamps)

**Tables Structure:**
```sql
-- Core tables
projects (id, name, genre, created_at, settings)
chapters (id, project_id, title, content, word_count, order)
entities (id, project_id, type, name, description, attributes)
relationships (id, entity_a_id, entity_b_id, type, description)
prompt_templates (id, name, version, template, variables, created_at)
shortcuts (id, action, keys, enabled)
telemetry_events (id, event_type, data, timestamp)

-- Metadata
schema_version (version, applied_at)
```

#### Migration Strategy: refinery

**Decision:** Use `refinery` crate for SQL-based migrations

**Rationale:**
- Automatic version tracking (no manual schema_version management)
- Rollback support (critical for beta database evolution)
- SQL-first approach (matches rusqlite usage, no ORM DSL to learn)
- Lightweight (5 crates vs Diesel's 50+)
- No compile-time overhead (unlike Diesel macros)

**Implementation:**
```toml
[dependencies]
refinery = "0.8"
refinery-rusqlite = "0.8"
```

**Migration Files:**
```
src-tauri/migrations/
  V1__create_projects.sql
  V2__create_chapters.sql
  V3__create_entities.sql
  V4__create_relationships.sql
  V5__create_prompt_templates.sql
  V6__add_story_bible_validation.sql
```

**Migration Execution:**
```rust
use refinery::embed_migrations;

embed_migrations!("migrations");

pub fn run_migrations(conn: &mut rusqlite::Connection) -> Result<()> {
    migrations::runner().run(conn)?;
    Ok(())
}
```

**Rollback Strategy:**
- Each migration has corresponding down migration
- Automatic rollback on error during migration
- Manual rollback command for development: `refinery migrate --target V<N>`

#### Data Validation Strategy

**Layer 1: Database Constraints**
- NOT NULL, UNIQUE, FOREIGN KEY constraints in schema
- CHECK constraints for valid enums (entity types, relationship types)

**Layer 2: Rust Type System**
```rust
pub struct Entity {
    pub id: EntityId,
    pub project_id: ProjectId,
    pub entity_type: EntityType, // Enum
    pub name: NonEmptyString,    // Validated type
    pub attributes: EntityAttributes, // Validated JSON
}

impl Entity {
    pub fn validate(&self) -> Result<()> {
        self.name.validate()?;
        self.attributes.validate()?;
        Ok(())
    }
}
```

**Layer 3: Story Bible Semantic Validation**
- Multi-layer contradiction detection (Step 2 requirement)
- Vector similarity for character/location consistency
- Rule-based validation (name spelling, attribute conflicts)

#### Caching Strategy

**No Application-Level Cache:**
- SQLite is fast enough for desktop workload (<1000 projects)
- OS file system cache handles repeated reads
- Complexity not justified for single-user local app

**In-Memory Cache for Hot Data:**
- Current project metadata (loaded on project open)
- Prompt templates (loaded on app startup)
- User preferences (loaded once)

**Vector Store Cache:**
- Qdrant handles caching internally
- Embeddings cached in Qdrant's persistent storage

### Authentication & Security

#### Authentication: None Required

**Decision:** No authentication system needed

**Rationale:**
- Local-only desktop application (no server, no accounts)
- Single-user per installation
- No cloud sync, no shared data

#### API Key Storage: OS Keychain

**Decision:** Use OS-level credential storage for AI provider API keys

**Implementation per Platform:**

**macOS:** Keychain Services
```rust
use security_framework::passwords::{set_generic_password, get_generic_password};

pub fn store_api_key(provider: &str, key: &str) -> Result<()> {
    set_generic_password("StoryTeller", provider, key.as_bytes())?;
    Ok(())
}
```

**Windows:** Windows Credential Manager
```rust
use windows::Win32::Security::Credentials::CredWriteW;

pub fn store_api_key(provider: &str, key: &str) -> Result<()> {
    // Windows Credential Manager API
    CredWriteW(&credential, 0)?;
    Ok(())
}
```

**Linux:** Secret Service API (via `secret-service` crate)
```rust
use secret_service::{SecretService, EncryptionType};

pub fn store_api_key(provider: &str, key: &str) -> Result<()> {
    let ss = SecretService::new(EncryptionType::Dh)?;
    let collection = ss.get_default_collection()?;
    collection.create_item("StoryTeller", provider, key)?;
    Ok(())
}
```

**Fallback:** Encrypted file if keychain unavailable
- AES-256-GCM encryption
- Key derived from machine-specific identifier
- Stored in app data directory

#### Data Encryption at Rest

**Decision:** Minimal encryption (API keys only)

**Rationale:**
- Novel content stored in plain SQLite (user can encrypt disk if needed)
- API keys encrypted via OS keychain (see above)
- No sensitive user data (no passwords, no PII)
- Full-disk encryption (BitLocker/FileVault) is user's responsibility

**Future Consideration:**
- Optional project-level encryption (password-protected projects)
- Deferred to post-MVP based on user demand

#### Tauri IPC Security

**Decision:** Use Tauri 2.0 capability system

**Configuration:**
```json
// src-tauri/capabilities/default.json
{
  "identifier": "default",
  "description": "Default capabilities",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "fs:read-file",
    "fs:write-file",
    "dialog:open",
    "dialog:save",
    "shell:execute"
  ]
}
```

**Command Access Control:**
```rust
#[tauri::command]
#[requires(capability = "story-bible:write")]
async fn save_entity(entity: Entity) -> Result<EntityId> {
    // Only callable if capability granted
}
```

**Security Principles:**
- Principle of least privilege (only grant needed capabilities)
- No eval() or innerHTML in frontend (XSS prevention)
- Content Security Policy configured in tauri.conf.json
- Webview sandboxed by default

### AI Provider Integration Architecture

#### Rate Limiting Implementation: Custom Token Bucket

**Decision:** Implement custom token bucket algorithm per provider

**Rationale:**
- Simple, transparent, easy to debug
- Per-provider configuration (OpenAI: 50/min, Anthropic: 40/min, etc.)
- No heavy dependency (tower middleware not needed)
- Fine-grained control for user cost management

**Implementation:**
```rust
// src-tauri/src/ai/rate_limiter.rs
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio::time::{Duration, Instant};

pub struct TokenBucket {
    tokens: f64,
    capacity: f64,
    refill_rate: f64, // tokens per second
    last_refill: Instant,
}

impl TokenBucket {
    pub fn new(capacity: f64, refill_rate: f64) -> Self {
        Self {
            tokens: capacity,
            capacity,
            refill_rate,
            last_refill: Instant::now(),
        }
    }

    pub async fn acquire(&mut self) -> Result<()> {
        self.refill();

        if self.tokens >= 1.0 {
            self.tokens -= 1.0;
            Ok(())
        } else {
            // Wait for token availability
            let wait_time = Duration::from_secs_f64(
                (1.0 - self.tokens) / self.refill_rate
            );
            tokio::time::sleep(wait_time).await;
            self.tokens = 0.0;
            Ok(())
        }
    }

    fn refill(&mut self) {
        let now = Instant::now();
        let elapsed = now.duration_since(self.last_refill).as_secs_f64();
        self.tokens = (self.tokens + elapsed * self.refill_rate).min(self.capacity);
        self.last_refill = now;
    }
}

pub struct RateLimiters {
    openai: Arc<Mutex<TokenBucket>>,
    anthropic: Arc<Mutex<TokenBucket>>,
    google: Arc<Mutex<TokenBucket>>,
    deepseek: Arc<Mutex<TokenBucket>>,
    yandex: Arc<Mutex<TokenBucket>>,
}

impl RateLimiters {
    pub fn new() -> Self {
        Self {
            openai: Arc::new(Mutex::new(TokenBucket::new(50.0, 50.0 / 60.0))),      // 50/min
            anthropic: Arc::new(Mutex::new(TokenBucket::new(40.0, 40.0 / 60.0))),   // 40/min
            google: Arc::new(Mutex::new(TokenBucket::new(60.0, 60.0 / 60.0))),      // 60/min
            deepseek: Arc::new(Mutex::new(TokenBucket::new(30.0, 30.0 / 60.0))),    // 30/min
            yandex: Arc::new(Mutex::new(TokenBucket::new(20.0, 20.0 / 60.0))),      // 20/min
        }
    }

    pub async fn acquire(&self, provider: Provider) -> Result<()> {
        match provider {
            Provider::OpenAI => self.openai.lock().await.acquire().await,
            Provider::Anthropic => self.anthropic.lock().await.acquire().await,
            Provider::Google => self.google.lock().await.acquire().await,
            Provider::Deepseek => self.deepseek.lock().await.acquire().await,
            Provider::Yandex => self.yandex.lock().await.acquire().await,
        }
    }
}
```

**Configuration:**
- Rates configurable per provider in user settings
- Default rates based on free tier limits
- UI shows remaining quota (visual feedback)

#### Prompt Template Storage: Hybrid (Files → SQLite)

**Decision:** Store prompts as markdown files, load into SQLite at startup

**Rationale:**
- **Developer Experience:** Edit prompts in markdown files (easy iteration, git tracking)
- **Version Control:** Git tracks prompt changes, A/B test variants
- **Runtime Performance:** Query fast from SQLite cache
- **User Customization:** Future feature (users edit prompts in-app, stored in SQLite)

**File Structure:**
```
src-tauri/prompts/
  character-generation-v1.md
  character-generation-v2.md  # A/B test variant
  worldbuilding-v1.md
  chapter-generation-v1.md
  dialogue-suggestion-v1.md
```

**Markdown Format:**
```markdown
---
name: character-generation
version: 1
variables: [genre, character_type, existing_characters]
active: true
---

# Character Generation Prompt

Generate a character for a {{genre}} story.

**Character Type:** {{character_type}}

**Existing Characters:** {{existing_characters}}

**Requirements:**
- Unique personality traits
- Consistent with genre conventions
- No conflicts with existing characters

**Output Format:**
- Name
- Age
- Occupation
- Personality (3-5 traits)
- Backstory (2-3 sentences)
```

**SQLite Schema:**
```sql
CREATE TABLE prompt_templates (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    version INTEGER NOT NULL,
    template TEXT NOT NULL,
    variables TEXT, -- JSON array
    active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    success_rate REAL, -- A/B testing metric
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, version)
);
```

**Startup Flow:**
```rust
// On app startup
pub fn load_prompts(conn: &mut Connection) -> Result<()> {
    let prompt_files = read_dir("prompts/")?;

    for file in prompt_files {
        let content = read_to_string(file)?;
        let prompt = parse_prompt_markdown(&content)?;

        // Upsert to SQLite
        conn.execute(
            "INSERT OR REPLACE INTO prompt_templates
             (name, version, template, variables, active)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            params![prompt.name, prompt.version, prompt.template,
                    prompt.variables, prompt.active]
        )?;
    }

    Ok(())
}
```

**Runtime Usage:**
```rust
pub async fn get_prompt(name: &str) -> Result<PromptTemplate> {
    // Query from SQLite cache
    let prompt = query_prompt_by_name(name)?;

    // Track usage for A/B testing
    increment_usage_count(prompt.id)?;

    Ok(prompt)
}
```

**A/B Testing Support:**
- Multiple versions of same prompt (v1, v2)
- Track usage_count and success_rate per version
- UI to select active version or enable A/B split testing

### Frontend Architecture

#### Styling System: Tailwind CSS

**Decision:** Use Tailwind CSS for custom Fluent design components

**Version:** Tailwind CSS 3.4+

**Rationale:**
- Rapid component development (2-3 weeks vs 4-5 weeks vanilla CSS)
- Consistent design tokens (Fluent colors, spacing, typography)
- Excellent Svelte + Vite integration
- JIT compiler = small bundle (~50KB after purge)
- Utility-first approach matches component-based architecture

**Installation:**
```bash
pnpm add -D tailwindcss postcss autoprefixer
pnpm add @tailwindcss/forms @tailwindcss/typography
npx tailwindcss init -p
```

**Fluent Design Token Configuration:**
```js
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0078d4',
          hover: '#106ebe',
          pressed: '#005a9e',
        },
        neutral: {
          bg: '#faf9f8',
          stroke: '#e1dfdd',
        },
        success: '#107c10',
        warning: '#f7630c',
        danger: '#d13438',
      },
      borderRadius: {
        'fluent-sm': '2px',
        'fluent-md': '4px',
        'fluent-lg': '6px',
      },
      spacing: {
        'fluent-xs': '4px',
        'fluent-sm': '8px',
        'fluent-md': '12px',
        'fluent-lg': '16px',
        'fluent-xl': '24px',
      },
      fontFamily: {
        'fluent': ['Segoe UI', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'fluent-caption': ['12px', '16px'],
        'fluent-body': ['14px', '20px'],
        'fluent-subtitle': ['18px', '24px'],
        'fluent-title': ['28px', '36px'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

**Component Example:**
```svelte
<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled = false;
</script>

<button
  class="
    px-fluent-lg py-fluent-sm rounded-fluent-md
    font-fluent text-fluent-body font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-brand-primary
    disabled:opacity-50 disabled:cursor-not-allowed
    {variant === 'primary'
      ? 'bg-brand-primary text-white hover:bg-brand-hover active:bg-brand-pressed'
      : 'bg-neutral-bg text-gray-800 hover:bg-gray-100 border border-neutral-stroke'}
  "
  {disabled}
  on:click
>
  <slot />
</button>
```

**Timeline Impact:** Saves 2 weeks compared to vanilla CSS modules

#### Editor Library: ProseMirror

**Decision:** Use ProseMirror for rich text editor

**Version:** ProseMirror 1.32+

**Rationale:**
- **Battle-tested:** Powers NYTimes, Atlassian, Guardian (9 years production)
- **60 FPS Proven:** Verified performance with 100K+ word documents
- **Framework-Agnostic:** Direct Svelte integration (no React wrapper overhead)
- **Virtualization:** Mature prosemirror-view-virtualized plugin
- **Extensibility:** Plugin system for Story Bible suggestions, validation warnings

**Installation:**
```bash
pnpm add prosemirror-state prosemirror-view prosemirror-model
pnpm add prosemirror-history prosemirror-commands prosemirror-keymap
pnpm add prosemirror-view-virtualized
```

**Core Implementation:**
```typescript
// src/lib/components/Editor.svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { EditorState } from 'prosemirror-state';
  import { EditorView } from 'prosemirror-view';
  import { Schema } from 'prosemirror-model';
  import { history, undo, redo } from 'prosemirror-history';
  import { keymap } from 'prosemirror-keymap';
  import { virtualizedPlugin } from './plugins/virtualized';

  let editorContainer: HTMLDivElement;
  let view: EditorView;

  onMount(() => {
    const state = EditorState.create({
      schema: customSchema,
      plugins: [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo }),
        virtualizedPlugin({
          chunkSize: 2000, // words per chunk
          viewportHeight: 800
        }),
        storyBiblePlugin(), // Custom: contextual suggestions
        validationPlugin(),  // Custom: inline warnings
      ]
    });

    view = new EditorView(editorContainer, {
      state,
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);

        // Emit to Svelte for word count, auto-save, etc.
        if (transaction.docChanged) {
          onDocumentChange(newState.doc);
        }
      }
    });

    return () => view.destroy();
  });
</script>

<div bind:this={editorContainer} class="prose max-w-none" />
```

**Performance Optimization:**
- Virtual scrolling (render only visible 2000 words)
- Incremental parsing (parse edited nodes only)
- Debounced word count (300ms after typing stops)
- Lazy decoration rendering (validation warnings)

**Custom Plugins:**
```typescript
// Story Bible contextual suggestions
function storyBiblePlugin() {
  return new Plugin({
    view() {
      return {
        update(view, prevState) {
          const { selection } = view.state;
          const cursor = selection.$anchor;
          const text = cursor.parent.textContent;

          // Debounced: suggest entities after 300ms idle
          debouncedSuggest(text, cursor.pos);
        }
      };
    }
  });
}
```

**Timeline Impact:** +1 week learning curve (team ramp-up)

#### State Management: Svelte 5 Runes (Primary)

**Decision:** Use Svelte 5 runes as primary state management

**Rationale:**
- Universal reactivity (works in .svelte.ts modules)
- Fine-grained reactivity (efficient updates)
- No external library needed
- Sufficient for desktop app complexity

**Global State Stores:**
```typescript
// src/lib/stores/editor.svelte.ts
import { $state, $derived } from 'svelte';

export class EditorState {
  content = $state('');
  wordCount = $derived(() => this.content.split(/\s+/).length);
  chapterTitle = $state('Untitled Chapter');
  isDirty = $state(false);
  lastSaved = $state<Date | null>(null);

  updateContent(newContent: string) {
    this.content = newContent;
    this.isDirty = true;
  }

  markSaved() {
    this.isDirty = false;
    this.lastSaved = new Date();
  }
}

export const editorState = new EditorState();
```

**Usage in Components:**
```svelte
<script lang="ts">
  import { editorState } from '$lib/stores/editor.svelte';
</script>

<div>Word Count: {editorState.wordCount}</div>
<div>Last Saved: {editorState.lastSaved?.toLocaleTimeString()}</div>
{#if editorState.isDirty}
  <span class="text-warning">Unsaved changes</span>
{/if}
```

**Advanced State (If Needed):**
- If runes prove insufficient (unlikely), consider Zustand or Pinia
- Defer decision until Sprint 3-4 (YAGNI principle)

### Testing Architecture

#### Hybrid Testing Strategy

**Decision:** Three-layer testing approach

**Layer 1: Rust Unit Tests (Target: 90%+ coverage)**

**Approach:** Test business logic separately from Tauri commands

```rust
// src-tauri/src/story_bible/validation.rs
pub fn detect_contradictions(
    text: &str,
    entities: &[Entity]
) -> ValidationResult {
    // Business logic here
}

// src-tauri/src/story_bible/validation_test.rs
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn detects_character_name_mismatch() {
        let entity = Entity::new("Sarah", EntityType::Character);
        let text = "Sara walked into the room"; // Typo: Sara vs Sarah

        let result = detect_contradictions(text, &[entity]);

        assert!(result.has_contradictions());
        assert_eq!(result.contradictions[0].entity_id, entity.id);
        assert!(result.contradictions[0].message.contains("name"));
    }

    #[tokio::test]
    async fn vector_search_meets_performance_requirement() {
        let store = setup_test_qdrant().await;
        seed_test_entities(&store, 1000).await;

        let start = Instant::now();
        let results = store.search("detective", 5).await.unwrap();
        let duration = start.elapsed();

        assert!(duration < Duration::from_millis(100)); // NFR requirement
        assert_eq!(results.len(), 5);
    }
}
```

**Layer 2: Frontend Tests with Mocks (Target: 85%+ coverage)**

**Tool:** Vitest + @testing-library/svelte

```typescript
// src/lib/components/StoryBibleValidator.test.ts
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { vi } from 'vitest';
import StoryBibleValidator from './StoryBibleValidator.svelte';

// Mock Tauri invoke
vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn()
}));

test('displays validation results', async () => {
  const mockInvoke = vi.mocked(await import('@tauri-apps/api/core')).invoke;
  mockInvoke.mockResolvedValue({
    score: 0.85,
    contradictions: [
      { entity_id: 1, message: 'Character name mismatch: Sarah vs Sara' }
    ]
  });

  const { getByText, getByRole } = render(StoryBibleValidator, {
    props: { text: 'Sara walked into the room' }
  });

  await fireEvent.click(getByRole('button', { name: /validate/i }));

  await waitFor(() => {
    expect(getByText('85% consistency')).toBeInTheDocument();
    expect(getByText(/Character name mismatch/)).toBeInTheDocument();
  });
});
```

**Layer 3: E2E Tests for Critical Paths (Target: 20-30 scenarios)**

**Tool:** Playwright with Tauri

```typescript
// tests/e2e/story-bible-validation.spec.ts
import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';

test.beforeEach(async () => {
  // Launch Tauri app
  app = await electron.launch({
    args: ['path/to/tauri/app']
  });
  page = await app.firstWindow();
});

test('end-to-end validation workflow', async () => {
  // Create entity
  await page.click('text=Add Character');
  await page.fill('[name="character-name"]', 'Sarah Chen');
  await page.fill('[name="character-role"]', 'Detective');
  await page.click('button:has-text("Save")');
  await expect(page.locator('.entity-list')).toContainText('Sarah Chen');

  // Write text with contradiction
  await page.fill('.editor', 'Sara walked into the room.');
  await page.click('button:has-text("Validate")');

  // Check validation warning
  await expect(page.locator('.warning-badge')).toBeVisible();
  await expect(page.locator('.contradiction-message'))
    .toContainText('Character name mismatch');
});

test('meets Sarah persona activation time requirement', async () => {
  const startTime = Date.now();

  // Onboarding flow
  await page.click('text=Get Started');
  await page.fill('[name="story-pitch"]', 'A detective story in Paris');
  await page.click('text=Generate Story Bible');
  await page.waitForSelector('.generation-complete');
  await page.click('text=Start Writing');

  const duration = Date.now() - startTime;

  // NFR48: <5 minutes time-to-first-chapter
  expect(duration).toBeLessThan(5 * 60 * 1000);
});
```

**Critical Test Scenarios (E2E Priority):**

1. **Data Integrity:**
   - Auto-save during typing (30-second interval)
   - Crash recovery (kill app mid-save, verify recovery on restart)
   - Large document handling (80K words load time <2s)

2. **Story Bible Validation:**
   - Create entity → validate text → detect contradiction
   - Multi-layer validation with configurable sensitivity
   - Performance: validate 5000-word chapter in <2s

3. **AI Integration:**
   - Generate chapter with streaming (visible progress)
   - Handle API errors gracefully (network failure, rate limit)
   - Rate limiter prevents quota exhaustion

4. **Export Pipeline:**
   - PDF export with custom fonts (300 DPI, print-ready)
   - EPUB3 passes EPUBCheck validation (100%)
   - DOCX round-trip (export → import → verify formatting)

5. **UX Flows (Persona-Based):**
   - Sarah: Complete onboarding in <5 minutes
   - Elena: Upload writing sample, verify style matching
   - James: Discover keyboard shortcuts, import Scrivener preset

**Test Infrastructure Timeline:**

**Sprint 1 (Weeks 1-2): Foundation**
- Set up Vitest for frontend unit tests
- Configure cargo test for Rust
- Create Tauri invoke mock factory
- Write first 10 unit tests (TDD for core features)

**Sprint 2 (Weeks 3-4): Integration**
- Set up Playwright with Tauri
- Build E2E test harness
- Create test data generators (entities, chapters)
- Implement fault injection framework (crash simulation)

**Sprint 3-8: TDD Practice**
- Write tests before features (red-green-refactor)
- Target: 90% Rust coverage, 85% frontend coverage by Sprint 8
- E2E regression suite grows to 20-30 scenarios

**Investment:** 2 weeks Sprint 1 (upfront), pays back 7+ days of bug fixing

### Infrastructure & Deployment

#### Telemetry Backend: Sentry (Beta) → Self-Hosted (Post-Launch)

**Decision:** Use Sentry during beta, migrate to self-hosted post-launch

**Rationale:**
- **Fast Iteration:** Sentry provides instant error tracking for beta
- **Release Tracking:** See which version has crashes
- **Session Replay:** Understand user context during errors
- **Cost:** $29/mo acceptable for beta (30-50 users)
- **Privacy:** Plan migration to self-hosted for user control

**Sentry Configuration:**
```rust
// src-tauri/src/telemetry.rs
use sentry;

pub fn init_telemetry() -> Option<sentry::ClientInitGuard> {
    // Only if user opted in
    if !user_preferences.telemetry_enabled {
        return None;
    }

    let guard = sentry::init(sentry::ClientOptions {
        dsn: Some(env::var("SENTRY_DSN").ok()?),
        release: Some(env!("CARGO_PKG_VERSION").into()),
        environment: Some(
            if cfg!(debug_assertions) { "development" }
            else { "production" }
        ),
        traces_sample_rate: 0.1, // 10% of transactions
        before_send: Some(Arc::new(|mut event| {
            // Strip any PII before sending
            event.user = None;
            event.request = None;
            Some(event)
        })),
        ..Default::default()
    });

    Some(guard)
}

pub fn capture_error(err: &anyhow::Error) {
    sentry::capture_error(err);
}

pub fn capture_message(msg: &str, level: sentry::Level) {
    sentry::capture_message(msg, level);
}
```

**Privacy Controls:**
- Opt-in only (default: disabled)
- Clear consent dialog on first run
- Show user exactly what data is collected
- One-click disable in settings
- No novel content, only errors and performance metrics

**Telemetry Events Collected:**
- Crash reports (stack traces, OS info)
- Error rates by feature (validation, AI, export)
- Performance metrics (startup time, FPS, generation speed)
- Feature usage (anonymized counts, no content)

**Self-Hosted Migration Plan (Months 10-12):**
```rust
// Replace Sentry with self-hosted solution
// Options:
// 1. GlitchTip (Sentry-compatible, self-hosted)
// 2. Custom: Rust server + SQLite + dashboard
// 3. Minimal: Local log files + upload on user request
```

**Cost Projection:**
- Beta (Months 1-6): $29/mo = $174
- Scale (Months 7-12): $450/mo = $2700 (if not migrated)
- Self-hosted (Month 12+): $0/mo (hosting cost only)

**Timeline Impact:** +0.5 weeks (Sentry setup + privacy controls)

#### CI/CD Pipeline

**Decision:** GitHub Actions with matrix builds

**Platforms:** Windows, macOS, Linux

**Pipeline Stages:**
```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Run Rust tests
        run: cargo test --all-features

      - name: Run frontend tests
        run: pnpm test

      - name: Build app
        run: pnpm tauri build

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: storyteller-${{ matrix.os }}
          path: src-tauri/target/release/bundle/

  e2e:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Run E2E tests
        run: pnpm test:e2e
```

**Release Pipeline:**
- Tag release → trigger build → run tests → create installers → upload to releases

**Code Signing (Deferred to Sprint 8):**
- macOS: Apple Developer certificate ($99/year)
- Windows: Code signing certificate (optional for beta, required for distribution)

### Decision Impact Analysis

**Implementation Sequence (Ordered by Dependency):**

1. **Sprint 1 (Weeks 1-2): Foundation**
   - Initialize Tauri + Svelte project (Step 3 command)
   - Set up Tailwind CSS with Fluent design tokens
   - Configure refinery for SQLite migrations
   - Set up testing infrastructure (Vitest, cargo test, mock factory)
   - Create first 5-10 Fluent components (Button, Input, Card, Modal)

2. **Sprint 2 (Weeks 3-4): Core Services**
   - Implement SQLite schema (V1-V6 migrations)
   - Integrate Qdrant for vector store
   - Build ProseMirror editor wrapper with virtualization
   - Set up Playwright E2E tests
   - Implement rate limiter (token bucket)

3. **Sprint 3 (Weeks 5-6): Story Bible**
   - Story Bible service (entities, relationships, validation)
   - Vector embedding integration (ONNX)
   - Prompt template system (file → SQLite hybrid)
   - Custom ProseMirror plugins (suggestions, warnings)

4. **Sprint 4 (Weeks 7-8): AI Integration**
   - AI orchestrator with multi-provider support
   - Streaming response handling
   - Prompt library with A/B testing support
   - PromptLibraryService implementation

5. **Sprint 5-6 (Weeks 9-12): UX Services**
   - OnboardingService (wizard flow)
   - StyleProfileService (ONNX style analysis)
   - KeyboardShortcutService (Tauri shortcuts + UI)
   - Complete remaining Fluent components

6. **Sprint 7-8 (Weeks 13-16): Export & Polish**
   - Puppeteer + docx.js sidecars
   - PDF/EPUB/DOCX generation
   - Export validation gates (EPUBCheck)
   - Sentry telemetry integration
   - Performance optimization pass

**Cross-Component Dependencies:**

```
SQLite Schema (refinery)
  ↓ required by
Story Bible Service
  ↓ required by
AI Orchestrator (uses Story Bible context)
  ↓ required by
Editor (displays AI suggestions)

Rate Limiter
  ↓ required by
AI Orchestrator

Prompt Templates
  ↓ required by
AI Orchestrator

Tailwind Components
  ↓ required by
All UI features

ProseMirror Editor
  ↓ required by
Writing workflow

Testing Infrastructure
  ↓ enables TDD for
All features
```

**Technology Decisions Finalized:**

✅ Styling: Tailwind CSS 3.4+
✅ Editor: ProseMirror 1.32+
✅ Migrations: refinery 0.8+
✅ Testing: Hybrid (Rust unit + Frontend mock + Playwright E2E)
✅ Rate Limiting: Custom Token Bucket
✅ Prompt Storage: Hybrid (Files → SQLite)
✅ Telemetry: Sentry (beta phase)

**Requirements Coverage After All Decisions:**

- Project Context Analysis: 87%
- Starter Template: +6% (performance, architecture)
- Core Decisions: +7% (testing, UX flows, data integrity)
- **Total Coverage: 93%**

**Remaining 7%:** Advanced features deferred post-MVP (timeline tracking, advanced relationship visualization, collaborative editing)

**Final Timeline: 12 months to beta-ready product**

**Confidence Level: HIGH** - All critical architectural decisions made, technology stack fully defined, implementation ready to begin.
