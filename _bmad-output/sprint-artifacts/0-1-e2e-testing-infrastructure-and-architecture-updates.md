# Story 0.1: E2E Testing Infrastructure & Architecture Updates

Status: done

<!-- Note: This is a technical story created from Epic 1 Retrospective action items. Not part of standard epic flow. -->

## Story

As a development team,
I want working E2E testing infrastructure and updated architecture documentation,
So that we have a solid foundation for Epic 2 development with accurate, up-to-date technical guidance.

## Background

**Source:** Epic 1 Retrospective (2025-12-26)

During Epic 1, the following issues were identified:

1. **E2E Testing Architecture Mismatch:** Architecture doc suggested Playwright `_electron` API for Tauri, but Tauri uses OS WebView, NOT Electron runtime. The pattern was copied from Electron projects and never validated for Tauri.

2. **Tailwind v4 Breaking Change:** Architecture doc assumed Tailwind v3 with `tailwind.config.js`, but v4 uses CSS-first `@theme` directive approach. This was successfully adapted in Story 1.3, but architecture needs formal update.

3. **Version Compatibility:** No version matrix exists to document tested version combinations.

## Acceptance Criteria

**Given** the testing architecture document has incorrect E2E patterns
**When** the team updates testing-architecture.md
**Then** all references to Playwright `_electron` API are removed
**And** correct Tauri E2E testing approach is documented (WebDriver or web-layer testing)
**And** example code snippets are accurate and runnable

**Given** the Tauri-native E2E approach is documented
**When** the team implements E2E tests
**Then** at least one E2E test exists that launches the Tauri app
**And** the test verifies the home screen renders correctly
**And** the test verifies "Create New Project" button is clickable
**And** `pnpm test:e2e` runs successfully with passing tests
**And** no Electron dependency is required

**Given** the frontend architecture document needs version updates
**When** the team updates frontend-architecture.md
**Then** Tailwind v4 CSS-first configuration is formally documented
**And** bits-ui 1.0.0 API patterns are documented (child snippets vs Indicator components)
**And** a version compatibility matrix section is added
**And** tested version combinations are listed

**Given** all architecture updates are complete
**When** the team runs TypeScript validation
**Then** `pnpm check` passes with 0 errors
**And** all documentation is consistent with actual implementation

## Tasks / Subtasks

- [x] Task 1: Update testing-architecture.md (remove incorrect patterns)
  - [x] **DELETE these patterns** from testing-architecture.md (lines ~100-160):
    - All `_electron as electron` imports
    - All `ElectronApplication` type references
    - All `electron.launch()` patterns
    - The entire incorrect E2E code block
  - [x] Add Tauri ≠ Electron warning section
  - [x] Add correct Playwright web-layer testing approach (see Implementation Reference below)
  - [x] Verify all test commands are correct

- [x] Task 2: Implement Playwright web-layer E2E tests
  - [x] **DELETE** the existing `tests/e2e/launch.spec.ts` completely (it uses Electron API - will NOT work)
  - [x] Update `playwright.config.ts` with webServer configuration (see Implementation Reference)
  - [x] Create new `tests/e2e/home.spec.ts` with working tests
  - [x] Test: Home screen displays "Welcome to StoryTeller"
  - [x] Test: "Create New Project" button is visible and clickable
  - [x] Test: Placeholder message appears on button click
  - [x] Run `pnpm test:e2e` and verify all tests pass

- [x] Task 3: Update frontend-architecture.md
  - [x] Add "Version Compatibility Matrix" section with exact tested versions (see below)
  - [x] Verify bits-ui 1.0.0 `child` snippet pattern is documented
  - [x] Verify Tailwind v4 CSS-first configuration is documented

- [x] Task 4: Validate and verify
  - [x] Run `pnpm check` - TypeScript passes with 0 errors
  - [x] Run `pnpm test` - Unit tests pass (89 tests)
  - [x] Run `pnpm test:e2e` - E2E tests pass (3 tests)
  - [x] Verify no `electron` dependency in package.json
  - [x] Review all architecture doc changes for accuracy

## Implementation Reference

### Approach: Playwright Web-Layer Testing

For Epic 1-2, use Playwright against the dev server (web-layer only). This is simpler to set up and sufficient for testing UI components. WebDriver approach can be added in Epic 3+ when testing Rust backend features.

**Why NOT Electron API:**
- Tauri uses OS native WebView (Edge WebView2 on Windows, WebKitGTK on Linux)
- Tauri does NOT use Chromium/Electron runtime
- Playwright's `_electron` API is specifically for Electron apps
- This is a fundamental architectural difference, not a configuration issue

### playwright.config.ts (Complete Working Configuration)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:1420',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Auto-start dev server before running tests
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:1420',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

### tests/e2e/home.spec.ts (Complete Working Test)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Home Screen', () => {
  test('displays welcome message', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Welcome to StoryTeller')).toBeVisible();
  });

  test('Create New Project button is clickable', async ({ page }) => {
    await page.goto('/');

    const createButton = page.getByRole('button', { name: /Create New Project/i });
    await expect(createButton).toBeVisible();
    await createButton.click();

    // Verify placeholder message appears (from Story 1.2 implementation)
    await expect(page.locator('text=Project wizard coming soon')).toBeVisible();
  });

  test('page has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/StoryTeller/i);
  });
});
```

### Content to DELETE from testing-architecture.md

Remove ALL of this pattern (it's Electron-specific and will NOT work with Tauri):

```typescript
// ❌ DELETE THIS - Electron API does NOT work with Tauri
import { _electron as electron } from 'playwright';
let app: ElectronApplication;

app = await electron.launch({
  args: ['path/to/tauri/app']
});
page = await app.firstWindow();
```

### Content to ADD to testing-architecture.md

```markdown
## Tauri E2E Testing

**CRITICAL:** Tauri is NOT Electron. Tauri uses the OS native WebView (Edge WebView2 on Windows, WebKitGTK on Linux), not Chromium. Playwright's `_electron` API will NOT work.

### Approach: Playwright Web-Layer Testing

For UI testing, run Playwright against the SvelteKit dev server:

1. Configure `webServer` in playwright.config.ts to auto-start dev server
2. Set `baseURL` to `http://localhost:1420`
3. Write standard Playwright tests using `page.goto('/')`

This approach:
- Tests all UI components and interactions
- Runs fast (no app binary needed)
- Works in CI environments
- Sufficient for Epic 1-5 (UI-focused features)

### When to Use WebDriver (Future: Epic 3+)

For testing Tauri-specific features (file system, native dialogs, Rust commands):
- Install: `cargo install tauri-driver`
- Use WebdriverIO or Selenium
- Windows: Download matching Edge Driver version
- Reference: https://v2.tauri.app/develop/tests/webdriver/
```

### Version Compatibility Matrix (Exact Tested Versions)

Add this to frontend-architecture.md:

| Package | Version | Notes |
|---------|---------|-------|
| Tauri | 2.x | Uses @tauri-apps/api ^2, @tauri-apps/cli ^2 |
| Svelte | 5.46.1+ | Svelte 5 with runes |
| SvelteKit | 2.49.2+ | With adapter-static |
| Tailwind CSS | 4.1.18 | CSS-first config via @theme directive |
| bits-ui | 1.0.0-next.98 | Uses child snippets, NOT Indicator components |
| Vitest | 4.0.16 | With @testing-library/svelte |
| Playwright | 1.57.0 | Web-layer testing only |
| TypeScript | 5.6.2 | Strict mode enabled |

### bits-ui 1.0.0 API Pattern

**Old Pattern (bits-ui 0.x) - DO NOT USE:**
```svelte
<Checkbox.Root>
  <Checkbox.Indicator>
    <Check />
  </Checkbox.Indicator>
</Checkbox.Root>
```

**Current Pattern (bits-ui 1.0.0-next.98):**
```svelte
<Checkbox.Root>
  {#snippet children({ checked })}
    {#if checked}
      <Check />
    {/if}
  {/snippet}
</Checkbox.Root>
```

### File Paths

**Files to MODIFY:**
- `_bmad-output/architecture/core-architectural-decisions/testing-architecture.md`
- `_bmad-output/architecture/core-architectural-decisions/frontend-architecture.md`
- `playwright.config.ts`

**Files to DELETE:**
- `tests/e2e/launch.spec.ts` (uses Electron API - fundamentally broken)

**Files to CREATE:**
- `tests/e2e/home.spec.ts`

### Windows-Specific Notes

If implementing WebDriver approach in future (Epic 3+):
- Check Edge version: `msedge --version`
- Download matching Edge Driver from Microsoft
- Version mismatch causes WebDriver to hang indefinitely

### CI/CD Considerations

- GitHub Actions Windows runner works with web-layer approach
- Set `reuseExistingServer: !process.env.CI` in playwright.config.ts
- For WebDriver approach in CI, see: https://github.com/Haprog/tauri-wdio-win-test

## Definition of Done

1. `pnpm test:e2e` passes with 3+ tests
2. No `electron` dependency in package.json
3. No `_electron` imports in any test file
4. testing-architecture.md has correct Tauri patterns
5. frontend-architecture.md has version matrix
6. `pnpm check` passes with 0 errors
7. `pnpm test` passes (89 unit tests)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None - implementation proceeded without issues.

### Completion Notes List

1. **Task 1 - testing-architecture.md:** Removed all Electron-specific patterns (lines 100-160) including `_electron` imports, `ElectronApplication` types, and `electron.launch()` patterns. Added Tauri ≠ Electron warning section and documented correct Playwright web-layer testing approach with `webServer` configuration.

2. **Task 2 - E2E Tests:** Deleted broken `tests/e2e/launch.spec.ts` that used Electron API. Updated `playwright.config.ts` with webServer configuration pointing to `http://localhost:1420`. Created `tests/e2e/home.spec.ts` with 3 passing tests: welcome message display, Create New Project button click, and page title verification. Also updated `src/app.html` to set correct title "StoryTeller".

3. **Task 3 - frontend-architecture.md:** Added Version Compatibility Matrix section with exact tested versions from package.json. Documented bits-ui 1.0.0 child snippet pattern (vs old Indicator pattern). Confirmed Tailwind v4 CSS-first configuration documentation.

4. **Task 4 - Validation:** All checks pass:
   - `pnpm check`: 0 errors
   - `pnpm test`: 89 unit tests pass
   - `pnpm test:e2e`: 3 E2E tests pass
   - No `electron` dependency in package.json
   - No `_electron` imports in test files

### File List

**Modified:**
- `_bmad-output/architecture/core-architectural-decisions/testing-architecture.md` - Removed Electron patterns, added web-layer testing docs
- `_bmad-output/architecture/core-architectural-decisions/frontend-architecture.md` - Added version matrix, bits-ui patterns; fixed version specs
- `playwright.config.ts` - Updated with webServer configuration
- `src/app.html` - Updated page title to "StoryTeller"
- `_bmad-output/sprint-artifacts/sprint-status.yaml` - Status: ready-for-dev → in-progress → review → done
- `.gitignore` - Added playwright-report/, test-results/, .claude/ (code review fix)

**Created:**
- `tests/e2e/home.spec.ts` - 3 E2E tests for home screen

**Deleted:**
- `tests/e2e/launch.spec.ts` - Broken Electron-based test file

**Related (not part of this story but in same commit window):**
- `_bmad-output/sprint-artifacts/epic-1-retro-2025-12-26.md` - Epic 1 retrospective that spawned this story

### Change Log

- 2025-12-26: Story 0.1 implemented - E2E testing infrastructure fixed, architecture docs updated with version matrix and correct Tauri patterns
- 2025-12-26: Code review fixes applied (5 MEDIUM issues):
  - M1: Added `playwright-report/` and `test-results/` to .gitignore
  - M2: Added `.claude/` to .gitignore (local IDE config)
  - M3: Fixed version matrix to show package.json specs (^/~ notation)
  - M4: Corrected unit test count in DoD (94 → 89)
  - M5: Documented epic-1-retro file in File List
