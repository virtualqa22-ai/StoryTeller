# Test Levels Strategy

**Recommended Split:** 50% Unit / 30% API-Integration / 15% E2E / 5% Manual QA

**Rationale:**
- **Desktop application** with complex backend (Rust) + rich frontend (Svelte)
- **AI integration** requires mocking for speed, real API tests for validation
- **Cross-platform** E2E tests expensive, focus on critical paths only
- **Performance** validation requires production-like environment

## Unit Tests (50% - ~500 tests)

**Scope:** Rust business logic, TypeScript utilities, data models

**Tools:**
- Rust: `cargo test` with `#[cfg(test)]` modules
- TypeScript: Vitest for utilities and composables

**Coverage Targets:**
- Story Bible validation logic: 95%+
- Data persistence (SQLite operations): 90%+
- AI provider abstractions: 90%+
- Export format generation: 85%+

**Example Test Scenarios:**
- Story Bible contradiction detection algorithms
- Project file serialization/deserialization
- Token counting and context window management
- Export template rendering (PDF/EPUB/DOCX)
- API key encryption/decryption wrapper
- Migration scripts (refinery)

**Test Data:**
- Factories for Story Bible entries (characters, locations, themes)
- Sample novels (10K, 50K, 150K words)
- Contradiction scenarios corpus (100+ examples)

## API/Integration Tests (30% - ~300 tests)

**Scope:** Tauri commands, database operations, AI provider integration

**Tools:**
- Tauri test harness with mock WebView
- Real SQLite database (temp files)
- Mock AI providers + limited real API tests

**Coverage Targets:**
- Tauri command handlers: 90%+
- Database transactions: 95%+
- AI provider integration: 80%+ (mock), 20% real APIs

**Example Test Scenarios:**
- Save project → load project → verify data integrity
- Create Story Bible entry → query via semantic search → verify results
- Generate chapter with mocked AI → validate against Story Bible
- Export project → validate format compliance (EPUBCheck)
- Auto-save during edit → crash simulation → recovery verification
- Multi-provider failover (primary fails → fallback succeeds)

**Test Environments:**
- Local development: SQLite + mocked providers
- CI: SQLite + real API calls (rate-limited, sample only)

## E2E Tests (15% - ~150 tests)

**Scope:** Critical user journeys, cross-platform validation

**Tools:**
- Playwright (desktop app automation via WebDriver)
- Platform-specific runners (Windows/Mac/Linux)

**Coverage Targets:**
- P0 user journeys: 100%
- P1 features: 60%
- P2 features: 30%

**Example Test Scenarios:**
- **P0:** New project wizard → add Story Bible entries → generate chapter → export PDF
- **P0:** Open project → edit chapter → auto-save → close → reopen → verify persistence
- **P0:** Configure AI provider → test connection → generate content
- **P1:** Story Bible contradiction detection UI workflow
- **P1:** Export customization (fonts, margins) → validate output
- **P1:** Keyboard shortcuts for navigation and generation

**Platform Coverage:**
- All P0 tests: Windows 11 + macOS ARM + Ubuntu 20.04
- P1 tests: Windows 11 + macOS ARM only
- P2 tests: Manual QA sampling

---

## 🔴 **Cross-Platform Test Coverage Policy (CRITICAL - Sprint 0)**

**Development Environment Mandate:**
- Team MUST have access to all 3 platforms for local testing
- Rotating "platform champion" weekly (each dev tests on non-primary OS)
- Pre-PR checklist: "Did you manually test on Windows/Linux?" (honor system)
- Code review: Reviewer asks "Was this tested on all platforms?"

**CI Test Coverage by Platform (ENFORCED):**

| Test Priority | Windows | macOS (ARM) | macOS (Intel) | Linux |
|---------------|---------|-------------|---------------|-------|
| P0 Tests      | 100%    | 100%        | 50% (sampling) | 100%  |
| P1 Tests      | 100%    | 100%        | 0% (skip)     | 50%   |
| P2 Tests      | 50%     | 50%         | 0% (skip)     | 0%    |
| Nightly Full  | 100%    | 100%        | 100%          | 100%  |

**Platform-Specific Test Suites (NEW):**

**Windows-specific tests:**
- Backslash path handling in export pipeline
- Windows Defender interaction (file scanning delays)
- NTFS permissions and file locking
- Windows keychain (Credential Manager) integration
- Process spawning (Puppeteer sidecar on Windows)

**macOS-specific tests:**
- Gatekeeper and notarization workflows
- Keychain access dialogs and permissions
- Universal Binary validation (Intel + ARM)
- App sandbox restrictions
- File system case-sensitivity handling

**Linux-specific tests:**
- Wayland vs X11 compatibility
- Multiple desktop environments (GNOME, KDE, i3)
- libsecret integration (keychain alternative)
- Package formats (AppImage, deb, rpm)
- Font rendering differences

**Platform Rotation Policy (MANDATORY):**
- Each epic MUST have at least 1 story manually tested on each platform before merge
- Beta blockers: Windows AND macOS AND Linux manual validation required
- CI failures on any platform block merge (no "it works on my Mac" excuses)

**Enforcement:**
- PR template includes platform testing checklist
- CI dashboard shows platform-specific pass rates
- Monthly platform coverage report to team
- Quarterly platform-specific bug review (identify patterns)

## Manual QA (5% - Beta Program)

**Scope:** UX validation, edge cases, cross-platform feel

**Focus Areas:**
- First-time user experience (<5min to first chapter)
- Performance on minimum spec hardware (4GB RAM, dual-core)
- Export quality comparison vs Vellum/Scrivener
- AI-generated content quality (literary style matching)
- Accessibility (screen reader, keyboard navigation)

---
