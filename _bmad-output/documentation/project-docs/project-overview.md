# StoryTeller Project Overview

**Generated:** 2025-12-29
**Project Type:** Desktop Application (Tauri v2)
**Status:** Early Development (Epic 2.2 Complete)

---

## Executive Summary

StoryTeller is a **desktop application** for creative writers to manage and organize their storytelling projects. Built with **Tauri v2**, it combines a modern **SvelteKit** frontend with a **Rust** backend and embedded **SQLite** database for a fast, native desktop experience.

### Key Features (Current)
- ✅ Project creation and metadata management
- ✅ Recent projects list with last-opened tracking
- ✅ Fluent Design System-inspired UI
- ✅ Cross-platform desktop support (Windows, macOS, Linux)
- ✅ Local-first data storage with SQLite

### In Progress / Planned
- Story structure and chapter management
- Character and world-building tools
- Writing interface with distraction-free mode
- Export to various formats (DOCX, PDF, ePub)

---

## Technology Stack

### Frontend
- **Svelte 5.0.0** - Modern UI framework with runes-based reactivity
- **SvelteKit 2.9.0** - Application framework (SPA mode for Tauri)
- **TypeScript 5.6.2** - Type-safe development (strict mode)
- **Vite 6.0.3** - Fast build tool and dev server
- **Tailwind CSS 4.1.18** - Utility-first styling

### Backend
- **Rust 2021 Edition** - Systems programming language for native performance
- **Tauri v2** - Desktop application framework
- **rusqlite 0.32** - SQLite database interface (bundled)
- **refinery 0.8** - Database migration management
- **serde** - Serialization/deserialization for Tauri command bridge

### UI Component Library
- **bits-ui** - Headless accessible component primitives
- **lucide-svelte** - Icon library
- **clsx** + **tailwind-merge** - Class name utilities

### Testing
- **Vitest 4.0.16** - Unit testing (jsdom environment)
- **Playwright 1.57.0** - End-to-end testing (Chromium)
- **@testing-library/svelte** - Component testing utilities

---

## Architecture Overview

### Application Structure
```
StoryTeller
├── Frontend (SvelteKit SPA)
│   ├── UI Components (Svelte 5)
│   ├── Route Pages
│   └── Tauri API Wrappers
│
├── Backend (Rust/Tauri)
│   ├── Tauri Commands (IPC Bridge)
│   ├── Database Layer (SQLite)
│   ├── Business Logic
│   └── Native OS Integration
│
└── Data Layer (SQLite)
    ├── Projects Table
    ├── Migrations (Refinery)
    └── Indexes
```

### Key Design Decisions

**SPA Mode with Static Adapter**
- SvelteKit configured for client-side only rendering (no SSR)
- Static build output for Tauri integration
- All rendering happens in the Tauri webview

**Graceful Degradation**
- Database initialization failures log warnings but don't crash
- App remains functional even if backend services fail
- User-friendly error messages for all failure scenarios

**Type Safety End-to-End**
- TypeScript strict mode on frontend
- Rust Result<T, E> types on backend
- Serde for automatic serialization across IPC boundary

**Modern Svelte 5 Patterns**
- Runes-based reactivity (`$state`, `$effect`, `$derived`, `$props`)
- Snippet type for render props (replaces slots)
- Component-local state (no global store yet)

---

## Project Status

### Completed Milestones
- ✅ Initial project setup and configuration
- ✅ Tauri v2 integration with SvelteKit
- ✅ Database schema and migration system
- ✅ CRUD operations for projects
- ✅ UI component library (22 components)
- ✅ Home screen with recent projects list
- ✅ E2E testing infrastructure

### Current Focus
- Epic 2: Project Management Features
- Component testing coverage
- Database test data fixtures for E2E tests

### Technical Debt
- Some E2E tests skipped (need database seeding)
- No Tauri command mocking for unit tests
- Component testing could be more comprehensive

---

## Getting Started

### Prerequisites
- **Node.js 18+** (for frontend build)
- **pnpm** (package manager)
- **Rust** (for Tauri backend)
- **Operating System:** Windows, macOS, or Linux

### Development Setup
```bash
# Install dependencies
pnpm install

# Run development mode (starts both Vite and Tauri)
pnpm tauri dev

# Or run frontend only
pnpm dev
```

### Testing
```bash
# Type checking
pnpm check

# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Rust tests
cd src-tauri && cargo test
```

### Building
```bash
# Build web assets
pnpm build

# Build desktop application
pnpm tauri build
```

---

## Project Organization

### Frontend (`src/`)
- **src/lib/api/** - Tauri command wrappers
- **src/lib/components/ui/** - Reusable UI components
- **src/lib/components/projects/** - Domain-specific components
- **src/lib/utils/** - Shared utility functions
- **src/routes/** - SvelteKit pages and layouts

### Backend (`src-tauri/`)
- **src/db/** - Database layer (models, queries, migrations)
- **src/db/commands/** - Tauri command handlers
- **src/db/models/** - Data structures
- **migrations/** - SQL schema migration files

### Tests
- **src/lib/components/**/*.test.ts - Unit tests (co-located)
- **tests/e2e/** - Playwright E2E tests
- **src-tauri/src/**/*.rs - Rust unit tests (inline)

---

## Key Files

| File | Purpose |
|------|---------|
| `package.json` | Frontend dependencies and scripts |
| `src-tauri/Cargo.toml` | Rust dependencies |
| `src-tauri/tauri.conf.json` | Tauri configuration |
| `svelte.config.js` | SvelteKit configuration (adapter-static) |
| `vite.config.js` | Vite build configuration + Vitest setup |
| `playwright.config.ts` | E2E test configuration |
| `tsconfig.json` | TypeScript strict mode configuration |
| `tailwind.config.js` | Tailwind v4 PostCSS configuration |
| `_bmad-output/documentation/project-docs/project-context.md` | AI agent implementation rules |

---

## Development Workflow

### Git Workflow
- **Branch:** `master` (main branch)
- **Commit Convention:** Conventional commits (`feat:`, `fix:`, `build:`, `test:`, `docs:`)
- **Pre-commit:** Run `pnpm check` and `pnpm test`

### Package Management
- **Package Manager:** pnpm (required)
- **Lock File:** `pnpm-lock.yaml` (must be committed)

### Code Quality Checks
```bash
# TypeScript and Svelte validation
pnpm check

# Unit tests
pnpm test

# E2E tests
pnpm test:e2e
```

---

## Performance Considerations

- **SQLite WAL Mode:** Write-Ahead Logging enabled for better performance
- **Indexed Queries:** `last_opened_at` and `created_at` columns indexed
- **Vite Port:** Fixed at 1420 (Tauri requirement, strictPort: true)
- **Component Optimization:** Using `cn()` utility for class merging (performance optimized)

---

## Security Notes

- **SQL Injection Protection:** All queries use parameterized statements
- **XSS Protection:** Svelte auto-escapes by default
- **File System Access:** Only through validated Tauri commands
- **Input Validation:** Both frontend and backend validate user inputs

---

## Future Roadmap

### Phase 1: Core Project Management (Current)
- ✅ Project CRUD operations
- ✅ Recent projects view
- ⏳ Project dashboard

### Phase 2: Story Structure
- Chapter management
- Scene breakdown
- Timeline tracking

### Phase 3: Writing Tools
- Distraction-free writing interface
- Word count tracking
- Auto-save functionality

### Phase 4: Advanced Features
- Character profiles
- World-building tools
- Plot outline tools
- Export functionality

---

## Documentation Links

- [Architecture Details](./architecture.md)
- [Source Tree Analysis](./source-tree-analysis.md)
- [API Contracts](./api-contracts/index.md)
- [Data Models](./data-models/index.md)
- [Development Guide](./development-guide/index.md)
- [Project Context (AI Agent Rules)](./project-context.md)

---

**Last Updated:** 2025-12-29
**Maintained By:** Development Team
