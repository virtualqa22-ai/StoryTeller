# Starter Template Evaluation

## Primary Technology Domain

**Cross-Platform Desktop Application** - Based on project requirements analysis for StoryTeller, which demands:
- Local-first architecture with no cloud sync
- High-performance requirements (3s cold start, 60 FPS editor, <500MB memory)
- Native system integration (file system, OS keychain, system tray)
- Professional export capabilities (PDF/EPUB/DOCX generation)
- Multi-platform support (Windows/Mac/Linux)

## Starter Options Considered

### Option 1: Tauri 2.0 + Svelte 5 (SELECTED)

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

### Option 2: Electron + Vite + Svelte 5 (Not Selected)

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

## Selected Starter: Tauri 2.0 + Svelte 5 + TypeScript + Rust

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

## Architectural Decisions Provided by Starter

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

## Critical Technology Decisions (Resolved Through Team Analysis)

### Decision 1: Vector Store - Qdrant (Embedded Rust)

**Problem:** ChromaDB is Python-based, requiring subprocess management from Rust.

**Team Analysis:**
- ChromaDB subprocess adds complexity: Python runtime requirement (80MB+), process lifecycle management, IPC overhead
- Alternative: Qdrant client library in Rust, embedded mode (memory:// or disk-based)

**Decision:** Use Qdrant in embedded mode
- **Pros:** Pure Rust, no subprocess, 10x faster than Python IPC, simpler deployment
- **Cons:** Slightly less mature than ChromaDB (acceptable trade-off)
- **Implementation:** `qdrant-client` crate with in-memory or persistent storage

### Decision 2: UI Components - Custom Svelte (Fluent Design Language)

**Problem:** Fluent UI 2 is React-based, requires bridging to Svelte.

**Team Analysis:**
- React bridge adds 300KB+ bundle, two reactivity systems fighting, state synchronization complexity
- Alternative: Build 15-20 core Svelte components following Fluent design tokens

**Decision:** Drop Fluent UI 2 React components, build native Svelte
- **Pros:** Better performance, smaller bundle, native Svelte reactivity, maintainability
- **Cons:** 2-3 weeks initial development time
- **Implementation:** Custom components in `src/lib/components/fluent/` using Fluent design tokens

### Decision 3: PDF Export - Puppeteer Sidecar

**Problem:** Matching Vellum's $250 professional export quality.

**Team Analysis:**
- Rust PDF crates (printpdf, lopdf) have limited typography control
- Prince XML is $3,950 license (cost-prohibitive)
- Puppeteer provides best typography control for free

**Decision:** Use Puppeteer as Tauri sidecar
- **Pros:** Vellum-quality typography, print-ready 300 DPI, full CSS control
- **Cons:** Adds ~120MB to bundle (Node.js + Chromium)
- **Implementation:** Tauri sidecar process, IPC for PDF generation commands

### Decision 4: DOCX Export - Node.js Sidecar (docx.js)

**Problem:** DOCX generation for editorial workflow.

**Team Analysis:**
- Consistent with Puppeteer sidecar pattern
- docx.js is mature, handles complex formatting

**Decision:** Use Node.js sidecar with docx.js library
- **Pros:** Professional quality, maintains formatting, editor-compatible
- **Cons:** Adds to sidecar bundle (~30MB additional)
- **Implementation:** Same sidecar as Puppeteer, shared Node.js runtime

### Decision 5: ML/NLP for Style Profiles - Rust-ONNX Runtime

**Problem:** StyleProfileService requires ML/NLP for analyzing user writing samples.

**Team Analysis:**
- Python subprocess (transformers, spaCy) consistent with AI theme but heavy
- Rust NLP (rust-bert) immature
- Cloud API creates online dependency (violates local-first architecture)

**Decision:** Use Rust-ONNX Runtime with pre-trained models
- **Pros:** Pure Rust, offline-capable, fast inference (<2s), no subprocess
- **Cons:** Adds ~50MB (model weights)
- **Implementation:** Load sentence-transformers ONNX models, extract style fingerprints

## UX Services Architecture (Required for Beta)

Through multi-perspective team analysis, three critical UX services were identified as missing from initial stack decision. These directly impact beta user activation and retention:

### OnboardingService Architecture

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

### StyleProfileService Architecture

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

### KeyboardShortcutService Architecture

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

## Additional Setup Required Post-Scaffolding

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

## Technology Stack Summary

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

## Bundle Size & Performance Analysis

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

## Timeline Impact Assessment

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

## Testing Strategy Implications

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

## Production Deployment Considerations

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

## Sources

- [Tauri 2.0 Create Project Guide](https://v2.tauri.app/start/create-project/)
- [Tauri 2.0 Project Structure](https://v2.tauri.app/start/project-structure/)
- [create-tauri-app on GitHub](https://github.com/tauri-apps/create-tauri-app)
- [create-tauri-app on npm](https://www.npmjs.com/package/create-tauri-app)
- [Tauri vs Electron 2025 Comparison](https://www.raftlabs.com/blog/tauri-vs-electron-pros-cons/)
- [Tauri vs. Electron Performance & Bundle Size](https://dev.to/gethopp/tauri-vs-electron-performance-bundle-size-and-the-real-trade-offs-1el4)
- [Tauri Svelte TypeScript Best Practices](https://cursorrules.org/article/tauri-svelte-typescript-guide-cursorrules-prompt-f)
- [Svelte 5 Runes Guide](https://sveltekit.io/blog/runes)
