# Story 1.1: Initialize Cross-Platform Desktop Application

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an author,
I want to install StoryTeller on my computer,
So that I can launch the application and begin my novel-writing journey.

## Acceptance Criteria

**Given** a user downloads the StoryTeller installer
**When** they run the installer on Windows, macOS, or Linux
**Then** the application installs successfully
**And** a desktop shortcut/application icon is created
**And** the application appears in the system's applications list
**And** file associations for .storyteller files are registered

**Given** StoryTeller is installed
**When** the user launches the application
**Then** the app starts within 3 seconds (NFR-P2)
**And** the application window opens with proper title and icon
**And** the window is resizable and follows platform conventions
**And** the application runs on Windows 10/11, macOS 11+, and Linux (Ubuntu 20.04+, Fedora 35+, Arch)

**Given** the application is running
**When** the development team checks the project structure
**Then** the project uses Tauri 2.0 + Svelte 5 + TypeScript + Rust
**And** `pnpm install` completes successfully
**And** `pnpm tauri dev` launches the app in development mode
**And** Hot Module Replacement (HMR) works for Svelte components
**And** TypeScript strict mode is enabled in `tsconfig.json`

## Tasks / Subtasks

- [x] Task 0: Verify Development Environment
  - [x] Verify Rust installed (v1.75+ Stable): `rustc --version`
  - [x] Verify Cargo installed: `cargo --version`
  - [x] Verify Node.js (v20+ LTS) and pnpm installed: `node --version`, `pnpm --version`

- [ ] Task 1: Initialize Tauri 2.0 project with Svelte 5 + TypeScript template (AC: 3)
  - [ ] Run `pnpm create tauri-app storyteller --template svelte`
  - [ ] Select TypeScript as UI flavor during interactive setup
  - [ ] **CRITICAL:** Check `package.json`. If `svelte` is version 3/4, run `pnpm add svelte@next` (or latest v5) + updated adapter to ensure Svelte 5.
  - [ ] Verify project structure matches Tauri 2.0 conventions
  - [ ] Confirm `package.json` includes Tauri 2.0 dependencies
  - [ ] **Git Init:** Run `git init`. Verify `.gitignore` contains `src-tauri/target`, `node_modules`, `.env`, `.DS_Store`. Then `git add .`, `git commit -m "feat: initial project structure"`

- [ ] Task 2: Configure TypeScript strict mode and verify HMR (AC: 3)
  - [ ] Enable strict mode in `tsconfig.json`: `"strict": true`
  - [ ] Test Hot Module Replacement by running `pnpm tauri dev`
  - [ ] Make a live change to a Svelte component and verify instant reload
  - [ ] Verify no type errors with strict mode enabled

- [ ] Task 3: Configure application window settings and branding (AC: 1, 2)
  - [ ] Update `src-tauri/tauri.conf.json` with app title: "StoryTeller"
  - [ ] Set window dimensions: default width 1280, height 800, resizable true
  - [ ] **Generate App Icon:** Use tool `generate_image` (Prompt: "Modern, minimal geometric quill icon, professional dark blue gradient, flat vector style, white background, high resolution") to create `app-icon.png`
  - [ ] Place/configure icon in `src-tauri/icons` (ensure 512x512 png is available for config)
  - [ ] Configure window decorations to follow platform conventions

- [ ] Task 4: Register .storyteller file associations (AC: 1)
  - [ ] Add file association configuration in `tauri.conf.json`
  - [ ] Define MIME type for .storyteller files
  - [ ] Test double-click file association on each platform

- [ ] Task 5: Verify cross-platform installation and launch (AC: 1, 2)
  - [ ] Build installers for Windows (MSI), macOS (DMG), Linux (AppImage/deb)
  - [ ] Test installation on Windows 10/11
  - [ ] Test installation on macOS 11+ (Intel and Apple Silicon)
  - [ ] Test installation on Linux (Ubuntu 20.04+, Fedora 35+, Arch)
  - [ ] Verify cold start time <3 seconds on each platform
  - [ ] Confirm desktop shortcut creation on all platforms

## Dev Notes

### 🔥 CRITICAL: Technology Stack Constraints

**Tauri Version: 2.0 Stable**
- Must use Stable release (not beta/alpha)
- Configure `tauri.conf.json` for desktop ACLs

**Svelte Version: 5.x with Runes**
- Use `$state` and `$derived` for local state
- **DO NOT** use Svelte 4 legacy stores/syntax
- **DO NOT** install separate state libraries (Redux/Pinia) - use Runes

**Command to Initialize:**
```bash
pnpm create tauri-app storyteller --template svelte
# Select: TypeScript -> Svelte -> TypeScript
```

### 🏗️ Architecture Compliance

**Frontend Architecture:**
- **Styling:** Tailwind CSS 3.4+ with Fluent Design tokens
- **State:** Svelte 5 Runes natively
- **Source:** `_bmad-output/architecture/core-architectural-decisions/frontend-architecture.md`

**Fluent Design Tokens (For Story 1.3 - Keep in mind):**
- Primary color: `#0078d4`
- Radius: 2px (sm), 4px (md), 6px (lg)
- Font: Segoe UI family

**Testing (For Story 1.4 - Keep in mind):**
- Frameworks: Rust (Cargo test), Frontend (Vitest), E2E (Playwright)

### 📁 Required Project Structure

```
storyteller/
├── src/                     # Svelte frontend
│   ├── lib/
│   │   └── components/      # Reserved for Fluent Components
│   ├── App.svelte           # Main app component
│   ├── main.ts
│   └── app.css
├── src-tauri/               # Rust backend
│   ├── src/main.rs
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   └── icons/               # Put generated icon here
├── package.json
├── tsconfig.json
└── vite.config.ts
```

**File Association Configuration:**
```json
// src-tauri/tauri.conf.json
{
  "tauri": {
    "bundle": {
      "identifier": "com.storyteller.app",
      "active": true,
      "fileAssociations": [
        {
          "ext": "storyteller",
          "name": "StoryTeller Project",
          "description": "StoryTeller novel project file",
          "mimeType": "application/x-storyteller"
        }
      ]
    },
    // ... window config ...
  }
}
```

### ⚡ Performance Requirements

**NFR-P2: Cold Start Time**
- **Constraint:** <3 seconds from launch to visible window
- **Validation:** Measure manually on all test platforms

### 🚫 Anti-Patterns (Do Not Implement)

- ❌ **No SQLite Yet:** Deferred to Epic 2.
- ❌ **No Vector Store Yet:** Deferred to Epic 4.
- ❌ **No CSS Frameworks other than Tailwind.**
- ❌ **No legacy Svelte 3/4 syntax.**

### 🎯 Definition of Done

1.  **Project Initialized:** Tauri 2.0 + Svelte 5 + TS + Strict Mode active.
2.  **Environment Checked:** Rust/Cargo/Node verified.
3.  **Git Initialized:** Initial commit present.
4.  **Branding Applied:** App title set, **Icon Generated & Applied**, Window sized 1280x800.
5.  **Builds & runs:** `pnpm tauri dev` works, error-free.
6.  **Installers:** Builds for Win/Mac/Linux succeed.

## Dev Agent Record

### Agent Model Used

_To be filled by Dev agent during implementation_

### Debug Log References

_To be filled by Dev agent during implementation_

### Completion Notes List

_To be filled by Dev agent during implementation_

### File List

_To be filled by Dev agent with all files created/modified_
