# Epic List

### Epic 1: Foundation - Project Initialization & Starter Template
Development team has a working Tauri 2.0 + Svelte 5 + TypeScript + Rust project scaffold with core architecture components ready for feature development.

**FRs covered:** Architecture Requirements #1-3, #8-9 (Starter Template, Technology Stack, UI Components, Migrations, Testing)

**Critical Notes:**
- **MUST BE FIRST:** Cannot implement any other epic without this foundation
- Initialize with: `pnpm create tauri-app storyteller --template svelte-ts`
- Setup includes: SQLite + rusqlite, Qdrant embedded, ProseMirror, Tailwind CSS, Vitest, Playwright
- Build 15-20 custom Svelte components with Fluent Design Language
- Configure refinery for database migrations
- Setup testing infrastructure

### Epic 2: Project Setup & Configuration Wizard
Authors can create new novel projects through a guided onboarding wizard, configuring genre, story framework, and all initial parameters. They can also open existing projects from a recent list.

**FRs covered:** FR1-FR2, FR5-FR13, FR59, FR126-FR132, FR138

**User Value:**
- First-time users can get started in <5 minutes (NFR-U1, NFR-U2)
- Wizard guides through essential configuration
- Optional demo project shows features
- Can skip API setup and add later

### Epic 3: Multi-AI Provider Integration
Authors can securely connect to multiple AI providers (OpenAI, Claude, Gemini, Deepseek, Yandex, custom), switch between them when needed, and have their API keys stored securely in OS credential storage.

**FRs covered:** FR3-FR4, FR60-FR68, FR192, NFR-S2-S3, NFR-S6, NFR-S13-S14, NFR-S17-S18, Architecture Req #7

**User Value:**
- Never locked into single AI provider
- Automatic failover if provider unavailable
- Secure credential storage (OS keychain)
- Clear error messages for troubleshooting

### Epic 4: Story Bible - Core Storage & Management
Authors can create and manage their Story Bible—a persistent knowledge base of characters, settings, world rules, themes, and plot threads—organizing everything in one place with categories and favorites.

**FRs covered:** FR22, FR34-FR37, FR53-FR59, FR156-FR157, FR165, FR169, FR180-FR183, FR187-FR188, FR194, FR197

**User Value:**
- Centralized story knowledge management
- Character profiles with relationship mapping
- Plot thread tracking
- Category organization for easy navigation
- Foundation for AI consistency features

### Epic 5: Rich Text Editor & Writing Workspace
Authors can write and edit novel chapters in a professional rich text editor with auto-save, undo/redo, word count tracking, table of contents generation, and offline capability.

**FRs covered:** FR38, FR42-FR52, FR83-FR94, FR109-FR110, FR116-FR125, FR141-FR146, FR153-FR155, FR195-FR196, FR206-FR207, FR210-FR211, FR218-FR219, Architecture Req #2, UX Req #13-19

**User Value:**
- Professional writing environment
- Never lose work (auto-save, crash recovery)
- Work offline without limitations
- Dark mode for long sessions
- Chapter snapshots and version comparison
- 60 FPS smooth performance

### Epic 6: AI-Powered Story Development & Generation
Authors can use AI to generate supporting characters, settings, themes, dialogue preferences, and full chapters (5,000-8,000 words), with all content assembled using relevant Story Bible context for consistency.

**FRs covered:** FR14-FR21, FR23-FR24, FR29-FR33, FR39-FR41, FR46, FR67, FR158-FR164, FR167-FR168, FR170-FR172, FR184-FR186, FR189, FR198-FR199, FR204-FR205, FR215-FR216, FR220-FR222

**User Value:**
- AI generates content that fits their story world
- Story Bible context ensures consistency
- Progressive streaming shows progress
- Can regenerate with different approaches
- Style profile matching for literary users
- Preview before accepting content

### Epic 7: Story Bible Intelligence - Validation & Contradiction Detection
Authors receive real-time validation that AI-generated content is consistent with their Story Bible, with contradiction detection before, during, and after generation, plus guided setup and templates.

**FRs covered:** FR25-FR28, FR68, FR135, FR148-FR152, FR173-FR179, FR208, FR217, NFR-Q1-Q2, NFR-Q9-Q12

**User Value:**
- <5% false negative, <10% false positive validation
- Catches character inconsistencies automatically
- Reports specific contradictions with sources
- Guided Story Bible setup reduces learning curve
- Genre-specific templates accelerate setup
- Interactive tutorial demonstrates value

### Epic 8: Professional Export Pipeline
Authors can export publication-ready novels in PDF (Amazon KDP/IngramSpark compliant), EPUB (EPUB3 standard), and DOCX (Word-compatible) formats with custom formatting, meeting professional publishing standards.

**FRs covered:** FR69-FR82, FR111, FR190-FR193, FR209, FR212-FR214, NFR-C4-C7, NFR-C19-C20, Architecture Req #4

**User Value:**
- Vellum-quality PDF typography
- 100% pass rate on KDP and IngramSpark validation
- EPUB3 compliant for all retailers
- Word-compatible DOCX for editors
- Custom formatting (margins, fonts, spacing)
- Export readiness validation
- Works offline

### Epic 9: Productivity & Motivation Features
Authors stay motivated and track their writing journey with milestone achievements, chapter objectives, productivity metrics, and exportable progress reports.

**FRs covered:** FR200-FR203

**User Value:**
- Celebrate milestones (first chapter, 10K words, etc.)
- Track words per session, time spent
- Define and track chapter objectives
- Export productivity reports for accountability

### Epic 10: Cross-Platform Desktop Application & Auto-Update
Authors can install and use StoryTeller seamlessly across Windows, macOS (Intel & Apple Silicon), and Linux, with automatic background updates and easy rollback if needed.

**FRs covered:** FR95-FR108, NFR-C1-C3, NFR-C11-C15, NFR-C18, NFR-C23, NFR-C25, NFR-M4-M9, NFR-M12-M13, NFR-M15-M16, Architecture Req #12

**User Value:**
- Works on Windows 10/11, macOS 11+, Linux
- Platform-native UI conventions
- Projects open identically across platforms
- Background updates don't interrupt writing
- One-click rollback if issues occur
- Embedded offline documentation

### Epic 11: Accessibility & Internationalization
Authors with disabilities or who speak different languages can use StoryTeller effectively with screen reader support, full keyboard navigation, WCAG 2.1 AA compliance, and multi-language UI.

**FRs covered:** FR138-FR140, NFR-U10-U13, NFR-U18, UX Req #14

**User Value:**
- Screen reader compatible for visually impaired
- Complete keyboard navigation (no mouse required)
- 4.5:1 contrast ratio for readability
- 44x44px touch targets for motor accessibility
- Multi-language UI support
- High contrast mode

### Epic 12: Beta Program & Telemetry Infrastructure
Product team can collect opt-in anonymous feedback, track quality metrics, validate data loss prevention, and improve the product based on real beta user usage across all platforms.

**FRs covered:** FR131, FR133-FR134, FR136-FR137, FR145, FR175-FR176, FR182, NFR-S9-S11, NFR-S19, NFR-Q3-Q8, NFR-Q13, Architecture Req #6

**User Value (for Product Team):**
- Data-driven product improvement
- 3,000+ user-hours of telemetry
- Cross-platform validation (40% Win, 40% Mac, 20% Linux)
- Human review of 500+ AI chapters for ground truth
- <10 support tickets per beta user target
- Privacy-first: opt-in, anonymous, no manuscript content

---
