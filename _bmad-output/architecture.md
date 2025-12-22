---
stepsCompleted: [1, 2, 3, 4]
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
lastStep: 4
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
