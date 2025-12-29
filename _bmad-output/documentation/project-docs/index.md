# StoryTeller Project Documentation

**Generated:** 2025-12-29
**Project:** StoryTeller - Desktop Storytelling Application
**Status:** Early Development (Epic 2.2 Complete)

---

## Project Overview

- **Type:** Desktop Application (Tauri v2)
- **Primary Language:** TypeScript/JavaScript + Rust
- **Architecture:** Three-Layer Architecture (Presentation → Application → Data)
- **Frontend:** SvelteKit 2.9.0 + Svelte 5.0.0
- **Backend:** Rust 2021 + Tauri v2 + SQLite

---

## Quick Reference

### Tech Stack
- **UI Framework:** Svelte 5 with runes-based reactivity
- **Application Framework:** SvelteKit (SPA mode)
- **Desktop Framework:** Tauri v2
- **Database:** SQLite 3 (embedded, WAL mode)
- **Styling:** Tailwind CSS 4.1.18 + Fluent Design tokens
- **Testing:** Vitest (unit), Playwright (E2E)
- **Language:** TypeScript (strict mode) + Rust (2021 edition)

### Entry Points
- **Frontend:** `src/routes/+page.svelte` (Home page with recent projects)
- **Backend:** `src-tauri/src/lib.rs` (App initialization, command registration)
- **Database:** `src-tauri/migrations/` (Schema migrations)

### Architecture Pattern
Three-layer architecture with IPC bridge:
1. **Presentation Layer** - SvelteKit SPA (browser)
2. **Application Layer** - Rust backend (native)
3. **Data Layer** - SQLite database (embedded)

Communication via Tauri IPC (JSON serialization over command pattern).

---

## Generated Documentation

### Core Documentation
- **[Project Overview](./project-overview.md)** - Executive summary, tech stack, status, and roadmap
- **[Architecture](./architecture.md)** - System architecture, design patterns, data flow, and security
- **[Source Tree Analysis](./source-tree-analysis.md)** - Directory structure, file organization, and navigation guide
- **[Component Inventory](./component-inventory/index.md)** - Complete catalog of all UI and domain components

### API & Data
- **[API Contracts](./api-contracts/index.md)** - Tauri command reference, request/response types, and examples
- **[Data Models](./data-models/index.md)** - Database schema, Rust structs, TypeScript interfaces, and migrations

### Development
- **[Development Guide](./development-guide/index.md)** - Setup instructions, common tasks, code style, and testing guide
- **[Project Context (AI Agent Rules)](./project-context.md)** - Critical implementation rules for AI-assisted development

### Additional Resources
- **[Deployment Guide](./deployment-guide/index.md)** - Building, packaging, and distributing for Windows, macOS, and Linux

---

## Existing Documentation

### Project Root
- **[README.md](../README.md)** - Project introduction and basic setup instructions
- **[AUTO-COMMIT-README.md](../AUTO-COMMIT-README.md)** - Documentation for auto-commit workflow script

### BMAD Workflow System
- **[_bmad/](../_bmad/)** - BMAD workflow system files (meta-tooling for AI-guided development)

---

## Getting Started

### For Developers

1. **Prerequisites:**
   - Node.js 18+, pnpm, Rust, platform-specific build tools

2. **Setup:**
   ```bash
   pnpm install
   pnpm tauri dev
   ```

3. **Essential Reading:**
   - [Development Guide](./development-guide/index.md) - Complete setup and workflow
   - [Project Context](./project-context.md) - **MUST READ before writing code**
   - [Architecture](./architecture.md) - Understand system design

4. **Common Commands:**
   ```bash
   pnpm check          # TypeScript validation
   pnpm test           # Unit tests
   pnpm test:e2e       # E2E tests
   pnpm tauri build    # Production build
   ```

---

### For AI Agents

**⚠️ CRITICAL:** Read [Project Context](./project-context.md) BEFORE implementing any code.

**Key Reference Documents:**
1. [Project Context](./project-context.md) - Implementation rules (MANDATORY)
2. [Architecture](./architecture.md) - System design and patterns
3. [API Contracts](./api-contracts/index.md) - Tauri command reference
4. [Data Models](./data-models/index.md) - Database schema and types
5. [Source Tree Analysis](./source-tree-analysis.md) - File organization

**Common Tasks:**
- Adding UI component → See [Development Guide § Adding a New UI Component](./development-guide/index.md#adding-a-new-ui-component)
- Adding Tauri command → See [Development Guide § Adding a New Tauri Command](./development-guide/index.md#adding-a-new-tauri-command)
- Database migration → See [Development Guide § Adding a Database Migration](./development-guide/index.md#adding-a-database-migration)

---

## Project Statistics

### Codebase Overview
- **Languages:** TypeScript (frontend), Rust (backend), SQL (migrations)
- **UI Components:** 22 reusable components in `src/lib/components/ui/`
- **Domain Components:** 2 components in `src/lib/components/projects/`
- **Tauri Commands:** 9 registered commands (see [API Contracts](./api-contracts/index.md))
- **Database Tables:** 1 (`projects` table with 19 columns)
- **Migration Version:** V2

### Test Coverage
- **Unit Tests:** Components tested with Vitest + Testing Library
- **E2E Tests:** Home screen scenarios (some skipped pending DB fixtures)
- **Rust Tests:** Database layer tested with in-memory SQLite

---

## Architecture Highlights

### Key Design Decisions

**1. SPA Mode (Client-Side Only)**
- SvelteKit configured with `adapter-static`
- No server-side rendering (Tauri requirement)
- All rendering in webview

**2. Graceful Degradation**
- Database initialization failures don't crash app
- User-friendly error messages
- Logging for debugging

**3. Type Safety End-to-End**
- TypeScript strict mode (frontend)
- Rust Result types (backend)
- Serde automatic serialization (IPC bridge)

**4. Modern Svelte 5 Runes**
- `$props()`, `$state()`, `$derived()`, `$effect()`
- Snippet type for render props
- Component-local state (no global store yet)

**5. Migration-Based Schema**
- Refinery tracks database versions
- Embedded migrations (compile-time)
- Automatic application on startup

---

## Current Status

### Completed Features
- ✅ Project CRUD operations
- ✅ Recent projects list (sorted by last opened)
- ✅ Fluent Design-inspired UI with 22 components
- ✅ Database migrations and schema management
- ✅ E2E testing infrastructure

### In Progress
- ⏳ Component test coverage
- ⏳ E2E test fixtures (database seeding)

### Planned
- Story structure and chapter management
- Character and world-building tools
- Writing interface with distraction-free mode
- Export functionality (DOCX, PDF, ePub)

---

## Security & Performance Notes

### Security
- **SQL Injection Protection:** All queries use parameterized statements (`rusqlite::params![]`)
- **XSS Protection:** Svelte auto-escapes by default
- **IPC Allowlist:** Only registered Tauri commands can be invoked
- **Input Validation:** Both frontend and backend validate user inputs

### Performance
- **SQLite WAL Mode:** Better concurrent read/write performance
- **Indexed Queries:** `last_opened_at` and `created_at` columns indexed
- **Code Splitting:** SvelteKit automatically splits routes
- **Vite HMR:** Fast development feedback (<100ms updates)

---

## Documentation Maintenance

### Last Updated
**2025-12-29** - Full project rescan completed, all documentation updated

### Update Guidelines
- **Technology Stack Changes:** Update [Project Overview](./project-overview.md) and [Project Context](./project-context.md)
- **New API Endpoints:** Update [API Contracts](./api-contracts/index.md)
- **Database Migrations:** Update [Data Models](./data-models/index.md)
- **Architecture Changes:** Update [Architecture](./architecture.md)
- **New Features:** Update relevant documentation + this index

### Regeneration
To regenerate all documentation:
```bash
# Run the document-project workflow
# (This will update all generated docs)
```

---

## Quick Navigation

| I need to... | Go to... |
|-------------|----------|
| Understand the project | [Project Overview](./project-overview.md) |
| Learn the architecture | [Architecture](./architecture.md) |
| Find a file | [Source Tree Analysis](./source-tree-analysis.md) |
| Call a Tauri command | [API Contracts](./api-contracts/index.md) |
| Understand the database | [Data Models](./data-models/index.md) |
| Set up dev environment | [Development Guide](./development-guide/index.md) |
| Write code (as AI agent) | [Project Context](./project-context.md) |
| Add a UI component | [Development Guide § Adding a New UI Component](./development-guide/index.md#adding-a-new-ui-component) |
| Add a database field | [Development Guide § Adding a Database Migration](./development-guide/index.md#adding-a-database-migration) |
| Run tests | [Development Guide § Code Quality Checks](./development-guide/index.md#code-quality-checks) |

---

## Contact & Support

### For Questions
- Check documentation first (especially [Development Guide](./development-guide/index.md))
- Review [Project Context](./project-context.md) for implementation rules
- Search codebase for similar patterns

### For Issues
- Database errors: Check [Data Models](./data-models/index.md) for schema
- Build errors: See [Development Guide § Troubleshooting](./development-guide/index.md#troubleshooting)
- Type errors: Ensure strict mode compliance ([Project Context](./project-context.md))

---

**Generated by:** BMAD Document Project Workflow
**Workflow Version:** 1.2.0
**Documentation Format:** Markdown
**Optimized for:** AI-assisted development + human developers
