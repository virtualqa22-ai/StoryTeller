# Dev Notes

## 📌 Quick Reference - Read These First

**Critical Prerequisites:**
- ✅ **jsdom dependency** (REQUIRED - tests fail without it, see below)
- ✅ **Playwright binary path** (platform-specific - see Architecture section line 268+)
- ✅ **Tauri debug binary build** (run `pnpm tauri build --debug` before E2E tests)

**Must-Read Sections:**
1. **Implementation Sequence** (see below) - Follow exact order
2. **Architecture Compliance** (Vitest & Playwright patterns)
3. **Common Pitfalls** (Avoid these mistakes)

**Danger Zones:**
- Don't skip jsdom in installation (see CRITICAL warning below)
- Don't test multiple Tauri instances (workers: 1 required)
- Don't use Jest instead of Vitest

---

## 🔥 CRITICAL: Previous Story Learnings

**Story 1.3 Implementation (Tailwind CSS):**
- **Tailwind CSS v4.1.18** is installed with CSS-first configuration
- Uses `@theme` directive in `src/app.css` for Fluent Design tokens
- PostCSS configured with `@tailwindcss/postcss` plugin
- All home screen styling migrated from scoped CSS to Tailwind utilities
- Production build succeeds with 11KB CSS bundle (<50KB requirement)
- `pnpm check` runs TypeScript validation
- `pnpm build` creates production build
- **LESSON LEARNED:** Tailwind v4 uses CSS-first configuration via `@theme` in `app.css` instead of `tailwind.config.js`
- This shows the team adapts to breaking changes in dependencies - verify package versions after installation to catch similar breaking changes

**Story 1.2 Implementation (Home Screen):**
- Home screen built in `src/routes/+page.svelte`
- Uses Svelte 5 Runes (`$state()`) for state management
- 300ms debounce on button clicks with 3s auto-fade messages
- Keyboard accessibility with Tab navigation and focus states
- Welcome message: "Welcome to StoryTeller - Your AI-Powered Novel Writing Companion"
- Two primary action buttons: "Create New Project" and "Open Existing Project"
- Feature highlights: "✓ AI-Powered Writing", "✓ Story Bible Memory", "✓ Professional Export"

**Story 1.1 Implementation (Project Initialization):**
- Tauri 2.0 + Svelte 5 + TypeScript + Rust stack
- SvelteKit project structure (not plain Svelte)
- Global CSS imported in `src/routes/+layout.svelte`
- Development: `pnpm tauri dev` launches app with HMR
- TypeScript strict mode enabled
- Git repository initialized with commits

**Git History Patterns:**
- Commit format: `feat: complete story X-Y and apply code review fixes`
- Includes story file + implementation files + sprint status update
- Recent commits show code review fixes applied after implementation
- All commits co-authored by Claude Opus 4.5

**Current Project Structure (Story 1.4 Changes Only):**
```
storyteller/
├── src/lib/__tests__/            # ← CREATE: Frontend tests
├── tests/e2e/                    # ← CREATE: E2E tests
├── vite.config.js                # ← MODIFY: Add test configuration block
├── playwright.config.ts          # ← CREATE: Playwright config
└── package.json                  # ← MODIFY: Add test dependencies & scripts
```

## 🏗️ Architecture Compliance

**Testing Architecture (Source: `_bmad-output/architecture/core-architectural-decisions/testing-architecture.md`):**

**Layer 2: Frontend Tests with Mocks (Target: 85%+ coverage)**

**Tool:** Vitest + @testing-library/svelte

**Rationale:**
- Fast unit tests for Svelte components
- Mock Tauri invoke calls for isolated testing
- Hot reload in watch mode
- Integrates seamlessly with Vite/SvelteKit

**Installation:**
```bash
pnpm add -D vitest @vitest/ui @testing-library/svelte jsdom
```

## 🚨 CRITICAL: jsdom Dependency - DO NOT SKIP!

**Vitest REQUIRES jsdom for DOM testing environment. Without it, tests will FAIL!**

**What breaks if you skip jsdom:**
- ❌ Tests fail with: `Error: Cannot find module 'jsdom'`
- ❌ @testing-library/svelte rendering crashes
- ❌ No `document` or `window` globals available in tests
- ❌ All component tests become impossible to run

**Verify jsdom is installed:**
```bash
pnpm list jsdom
```
Should show `jsdom` in devDependencies. If missing, immediately run:
```bash
pnpm add -D jsdom
```

**Why this matters:** jsdom is easy to accidentally skip when copying the 4-package installation command. This is a common LLM developer mistake that wastes 30-60 minutes of debugging time.

**Vite Configuration for Vitest:**

**Modify existing `vite.config.js` after the `plugins` array** (currently around line 9, after `plugins: [sveltekit()],` and before `clearScreen`) to add test configuration:

```typescript
export default defineConfig(async () => ({
  plugins: [sveltekit()],

  // ← ADD THIS BLOCK HERE (after plugins, before clearScreen)
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'v8', // Note: Requires @vitest/coverage-v8 if using --coverage flag
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src-tauri/']
    }
  },

  // Existing Tauri config (already present)...
  clearScreen: false,
  // ... rest of existing config
}));
```

**Package.json script addition:**
```json
"scripts": {
  "test": "vitest"
}
```

**Sample Frontend Test Pattern:**

**Test File Naming Convention:** Name tests after the component concept (e.g., `HomeScreen.test.ts`) not the file name (e.g., `+page.test.ts`) for clarity.

```typescript
// src/lib/__tests__/HomeScreen.test.ts
import { render, fireEvent } from '@testing-library/svelte';
import { describe, test, expect, vi } from 'vitest'; // Optional if globals:true
import HomeScreen from '../../routes/+page.svelte';

// Mock Tauri invoke (not needed yet, but pattern for future)
vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn()
}));

test('displays welcome message', () => {
  const { getByText } = render(HomeScreen);
  const element = getByText(/Welcome to StoryTeller/i);
  expect(element).toBeTruthy(); // Vitest-native assertion
  expect(element.textContent).toContain('Welcome to StoryTeller');
});

test('displays primary action buttons', () => {
  const { getByRole } = render(HomeScreen);
  const createButton = getByRole('button', { name: /Create New Project/i });
  const openButton = getByRole('button', { name: /Open Existing Project/i });
  expect(createButton).toBeTruthy(); // Vitest-native assertion
  expect(openButton).toBeTruthy();
});

test('supports keyboard navigation (accessibility)', () => {
  const { getByRole } = render(HomeScreen);
  const button = getByRole('button', { name: /Create New Project/i });
  button.focus();
  expect(document.activeElement).toBe(button); // Vitest-native focus check
});
```

**Note on Test Assertions:** This story uses Vitest-native assertions (`.toBeTruthy()`, `.toBe()`, `.toContain()`) which work out-of-the-box. If you prefer jest-dom matchers like `.toBeInTheDocument()` or `.toHaveFocus()`, install `@testing-library/jest-dom` and configure it in a test setup file.

**Svelte 5 Runes Testing Note:**
@testing-library/svelte v5+ fully supports Svelte 5 runes (`$state()`, `$derived`). No special configuration needed. Test state changes with `fireEvent` and `waitFor`.

**Layer 3: E2E Tests for Critical Paths (Target: 20-30 scenarios)**

**Tool:** Playwright with Tauri

**Rationale:**
- Full app testing including Tauri backend
- Cross-platform browser testing
- Video recording for debugging
- Headless or headed mode

**Installation:**
```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

**Playwright Configuration for Tauri:**
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false, // Tauri apps can't run multiple instances
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // One worker for Tauri
  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'tauri',
      testMatch: '**/*.spec.ts',
      use: {
        // Tauri-specific config will be in test files
      },
    },
  ],
});
```

**Sample E2E Test Pattern:**

**CRITICAL - Tauri Binary Path:**
Before running E2E tests, build the Tauri development binary:
```bash
pnpm tauri build --debug
```

**Binary locations:**
- macOS/Linux: `src-tauri/target/debug/storyteller`
- Windows: `src-tauri\\target\\debug\\storyteller.exe` (escape backslashes in test files)

**Cross-Platform Binary Path Pattern (Recommended):**

For tests that run on multiple platforms, use this pattern to detect the correct binary path:

```typescript
// tests/e2e/launch.spec.ts
import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';
import * as path from 'path';

// Cross-platform binary path helper
function getTauriBinaryPath(): string {
  const binaryName = process.platform === 'win32'
    ? 'storyteller.exe'
    : 'storyteller';
  return path.join('src-tauri', 'target', 'debug', binaryName);
}

let app;
let page;

test.beforeEach(async () => {
  // Launch Tauri app via Electron with cross-platform path
  app = await electron.launch({
    args: [getTauriBinaryPath()]
  });
  page = await app.firstWindow();
});

test.afterEach(async () => {
  await app.close();
});

test('app launches and displays home screen', async () => {
  await expect(page.locator('text=Welcome to StoryTeller')).toBeVisible();
});

test('primary buttons are clickable', async () => {
  await page.click('button:has-text("Create New Project")');
  await expect(page.locator('text=Project wizard coming soon')).toBeVisible();
});
```

**Alternative: Hardcoded paths** (simpler but platform-specific):
```typescript
// For development on a single platform, you can hardcode:
app = await electron.launch({
  args: ['src-tauri/target/debug/storyteller'] // macOS/Linux
  // OR: args: ['src-tauri\\\\target\\\\debug\\\\storyteller.exe'] // Windows
});
```

**Critical Test Scenarios (E2E Priority):**

From architecture document, initial E2E tests should cover:

1. **App Launch:**
   - Cold start time <3 seconds (NFR-P2)
   - Home screen renders
   - Window is resizable and follows platform conventions

2. **Home Screen Interactions:**
   - "Create New Project" button clickable
   - "Open Existing Project" button clickable
   - Placeholder messages appear on click
   - Keyboard navigation works (Tab key)
   - Focus states visible

3. **Cross-Platform Rendering:**
   - Home screen looks consistent (future: test on Windows, macOS, Linux)

**Test Infrastructure Timeline:**

**Sprint 1 (Current Story):**
- ✅ Set up Vitest for frontend unit tests
- ✅ Create first sample test (home screen rendering)
- ✅ Set up Playwright with Tauri
- ✅ Create first E2E test (app launch and home screen)
- ✅ Verify test execution <30 seconds

**Future Sprints (TDD Practice):**
- Sprint 2-8: Write tests before features (red-green-refactor)
- Target: 90% Rust coverage, 85% frontend coverage by Sprint 8
- E2E regression suite grows to 20-30 scenarios

## 📋 Testing Commands Reference

| Command | Purpose | Performance Notes |
|---------|---------|-------------------|
| `pnpm test` | Run frontend tests once | Initial: <1s for 5-6 tests |
| `pnpm test --watch` | Watch mode (TDD) | Interactive: a=all, f=failed, q=quit |
| `pnpm test --ui` | Vitest UI | Visual test runner |
| `pnpm test --coverage` | Coverage report | Requires @vitest/coverage-v8 |
| `pnpm test:e2e` | E2E tests | Launches Tauri app (~20s) |
| `pnpm test:e2e --headed` | E2E with visible browser | For debugging |
| `pnpm test:e2e --debug` | E2E debug mode | Step through tests |
| `pnpm test && pnpm test:e2e` | Run all tests sequentially | Complete suite <30s |

## 🎯 Technical Requirements

**Frontend Testing:**
- Use Vitest (compatible with Vite/SvelteKit)
- Use @testing-library/svelte for component rendering
- Mock Tauri API calls with `vi.mock()`
- Test user-facing behavior (not implementation details)
- Tests should be fast (<100ms per test)
- Watch mode for TDD workflow

**E2E Testing:**
- Use Playwright with Electron launcher
- Launch actual Tauri app binary
- Test full user workflows
- Take screenshots on failure
- Record traces for debugging
- One worker only (Tauri can't run multiple instances)

**Test Execution Performance:**
- Frontend tests: <1 second for initial 5-6 tests (grows to <10 seconds with ~50 tests)
- E2E tests: <20 seconds for initial suite (includes app launch)
- Total: <30 seconds for complete test suite
- Coverage target: 85%+ frontend (NFR-T1 from testing-architecture.md:61)

## 🚫 Anti-Patterns (Do Not Implement)

- ❌ **No Jest** - Use Vitest (Vite-native, faster)
- ❌ **No Cypress** - Use Playwright (better Tauri support)
- ❌ **No Testing Library for E2E** - Use Playwright selectors
- ❌ **Don't test Tailwind classes** - Test user-facing behavior
- ❌ **Don't test implementation details** - Test public API only
- ❌ **Don't skip test:e2e script** - Must be runnable via npm script
- ❌ **Don't hardcode paths** - Use relative paths in tests
- ❌ **Don't run multiple Tauri instances** - Set workers: 1 in Playwright config

## 🚨 CRITICAL: SvelteKit Testing Considerations

**SvelteKit Route Testing:**
- Routes in `src/routes/+page.svelte` are SvelteKit routes, not standalone components
- Import path: `import HomeScreen from '../../routes/+page.svelte'`
- SvelteKit uses filesystem-based routing
- No `main.ts` or `App.svelte` (that's plain Svelte)

**Svelte 5 Testing:**
- Runes (`$state()`, `$derived`) work in components during testing
- @testing-library/svelte supports Svelte 5
- No special configuration needed for Svelte 5 runes

**Tailwind CSS in Tests:**
- Tailwind classes don't need testing (utility CSS)
- Test visual behavior (elements visible, clickable)
- Don't test specific class names

## ⚡ Implementation Sequence

**CRITICAL: Follow this exact order:**

1. **Install Vitest first** (Task 1)
   - Add dependencies (including jsdom)
   - Modify existing vite.config.js (add test block after line 9)
   - Add test script
   - Verify `pnpm test` runs with "0 tests" message (confirms setup before writing tests)

2. **Create frontend test** (Task 2)
   - Create test file (name: HomeScreen.test.ts, not +page.test.ts)
   - Import pattern: `import { render, fireEvent } from '@testing-library/svelte'`
   - Write sample tests (including keyboard accessibility test)
   - Verify tests pass
   - Run `pnpm check` to verify TypeScript compilation

3. **Install Playwright second** (Task 3)
   - Add Playwright dependency
   - Install browser binaries
   - Build Tauri debug binary (`pnpm tauri build --debug`)
   - Create playwright.config.ts
   - Add test:e2e script

4. **Create E2E test** (Task 4)
   - Create test file with correct binary path (platform-specific)
   - Write sample E2E test
   - Verify test passes

5. **Verify complete suite** (Task 5)
   - Run all tests
   - Verify execution time
   - Test watch mode (learn keyboard shortcuts: a/f/q)

**Why this order?**
- Vitest is faster to set up and verify
- Frontend tests don't require binary builds
- Playwright requires more configuration
- E2E tests require built Tauri app

## 📚 Library Versions and Latest Info

**Vitest (Latest Stable: v2.1.8 as of Dec 2024):**
- Compatible with Vite 6.x
- Built-in TypeScript support
- Works with Svelte 5 via @testing-library/svelte
- No breaking changes from v1.x
- Note: Running `pnpm add -D vitest` will install the latest compatible version (likely 2.1.x). Check package.json after installation to confirm version.

**@testing-library/svelte (Latest: v5.2.5):**
- Svelte 5 support added in v5.x
- Compatible with runes ($state, $derived)
- Query methods: getByText, getByRole, etc.

**Playwright (Latest Stable: v1.49.1 as of Dec 2024):**
- Electron launcher for Tauri apps
- Cross-browser support (Chromium, Firefox, WebKit)
- Built-in screenshot and video recording
- TypeScript support out of the box

**Security Considerations:**
- All testing dependencies are dev-only
- No production runtime impact
- Playwright binaries are large (~300MB) but dev-only

**Performance Optimizations:**
- Vitest uses Vite's transform cache (fast)
- Playwright reuses browser contexts (faster E2E)
- Watch mode only re-runs changed tests

## 🔍 NFR Compliance

**NFR-P2: Cold Start <3 seconds**
- E2E test will verify app launch time
- Initial test should measure launch performance
- Future: Add performance regression tests

**NFR-T1: Test Coverage Requirements**
- Architecture targets 85%+ frontend coverage
- Story 1.4 establishes foundation
- Coverage will grow in future stories

**NFR-T2: CI/CD Integration**
- Both test suites runnable via npm scripts
- Exit codes indicate pass/fail
- Can be integrated into GitHub Actions

## 💡 Implementation Tips

**Vitest Configuration:**
- Use `globals: true` to avoid importing `describe`, `test`, `expect`
- Use `environment: 'jsdom'` for DOM testing
- Include pattern: `src/**/*.{test,spec}.{js,ts}`

**Testing Library Best Practices:**
- Query by role/text (user-facing)
- Use `getByRole('button', { name: /text/i })` for buttons
- Use `getByText(/pattern/i)` for text content
- Avoid `getByTestId` unless necessary

**Playwright with Tauri:**
- Tauri apps are Electron apps under the hood
- Use `_electron.launch()` with path to binary
- First window is the main app window
- Use `page.locator()` for element selection

**Watch Mode Testing:**
- `pnpm test --watch` for TDD workflow
- Tests re-run on file save
- Fast feedback loop (<1s)

## 🔄 Testing Checklist

**Before Running Tests:**
1. Run `pnpm install` to install all dependencies
2. Verify `vite.config.js` has test configuration
3. Verify `playwright.config.ts` exists
4. Verify test scripts in `package.json`

**Manual Testing (Frontend):**
1. Run `pnpm test` - All frontend tests pass
2. Test output is clear and readable
3. Tests complete in <10 seconds
4. Run `pnpm test --watch` - Watch mode works
5. Edit test file and save - Tests re-run automatically

**Manual Testing (E2E):**
1. Run `pnpm test:e2e` - All E2E tests pass
2. Tauri app launches successfully
3. Test verifies home screen displays
4. Tests complete in <20 seconds
5. Run with `--headed` - Browser window visible

**Complete Suite:**
1. Run `pnpm test && pnpm test:e2e` sequentially
2. Both suites pass
3. Total execution <30 seconds
4. No console errors or warnings

## 📝 Definition of Done

1. **Vitest installed:** `package.json` includes `vitest`, `@vitest/ui`, `@testing-library/svelte`
2. **Vite config updated:** `vite.config.js` includes test configuration
3. **Test script added:** `pnpm test` runs frontend tests
4. **Sample frontend test:** `src/lib/__tests__/HomeScreen.test.ts` exists and passes
5. **Playwright installed:** `package.json` includes `@playwright/test`
6. **Playwright config created:** `playwright.config.ts` exists with Tauri configuration
7. **E2E script added:** `pnpm test:e2e` runs E2E tests
8. **Sample E2E test:** `tests/e2e/launch.spec.ts` exists and passes
9. **All tests pass:** Both frontend and E2E tests complete successfully
10. **Performance met:** Complete test suite runs in <30 seconds
11. **Watch mode works:** `pnpm test --watch` enables hot reload testing
12. **CI-ready:** Tests can be automated in CI/CD pipeline

## 🚨 Common Pitfalls to Avoid

1. **Wrong test framework:** Don't use Jest (not Vite-native). Use Vitest.

2. **Missing jsdom environment:** Vitest needs `environment: 'jsdom'` for DOM testing.

3. **Wrong import paths:** SvelteKit uses `src/routes/+page.svelte`, not `src/App.svelte`.

4. **Multiple Tauri instances:** Set `workers: 1` in Playwright config (Tauri can't run in parallel).

5. **Hardcoded paths in tests:** Use relative paths, not absolute paths.

6. **Testing Tailwind classes:** Test behavior (visible, clickable), not CSS classes.

7. **Skipping browser install:** Run `pnpm exec playwright install` after adding Playwright.

8. **Missing test scripts:** Ensure both `test` and `test:e2e` scripts in package.json.

## 🎯 Test Coverage Strategy

**Story 1.4 Coverage (Foundation):**
- ✅ Home screen renders (frontend test)
- ✅ Primary buttons render (frontend test)
- ✅ Keyboard accessibility - button focus (frontend test)
- ✅ App launches (E2E test)
- ✅ Home screen displays in app (E2E test)
- ✅ Buttons are clickable (E2E test)

**Future Stories (Incremental Growth):**
- Story 1.5: Test reusable components
- Epic 2: Test project wizard workflow
- Epic 4: Test Story Bible CRUD operations
- Epic 5: Test editor functionality
- Epic 6: Test AI generation pipeline

**Target by Sprint 8:**
- 85%+ frontend coverage
- 20-30 E2E critical path scenarios
- Performance regression tests
- Cross-platform E2E tests

## 📚 References (For Additional Context)

For comprehensive architecture details, previous story learnings, and additional examples, refer to:
- Epic: `_bmad-output/planning/epics/epic-1-foundation-project-initialization-starter-template.md`
- Testing Architecture: `_bmad-output/architecture/core-architectural-decisions/testing-architecture.md` (lines 61-208)
- Previous Stories: `_bmad-output/implementation/sprint-artifacts/1-1*.md`, `1-2*.md`, `1-3*.md`
