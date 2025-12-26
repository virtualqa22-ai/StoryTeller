# Testing Architecture


### Hybrid Testing Strategy

**Decision:** Four-layer testing approach inclusive of AI logic

**Layer 1: Rust Unit Tests (Target: 90%+ coverage)**

**Approach:** Test business logic separately from Tauri commands.
**Critical:** Mock Vector Store responses to ensure deterministic tests.

```rust
// Mocking Qdrant for unit tests
pub struct MockVectorStore {
    // ...
}
```

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

**Tool:** Playwright (web-layer testing)

> **CRITICAL: Tauri ≠ Electron**
>
> Tauri uses the OS native WebView (Edge WebView2 on Windows, WebKitGTK on Linux), NOT Chromium/Electron runtime. Playwright's `_electron` API will NOT work with Tauri apps.

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

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: { timeout: 5000 },
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
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

```typescript
// tests/e2e/home.spec.ts
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
    await expect(page.locator('text=Project wizard coming soon')).toBeVisible();
  });
});
```

### When to Use WebDriver (Future: Epic 3+)

For testing Tauri-specific features (file system, native dialogs, Rust commands):
- Install: `cargo install tauri-driver`
- Use WebdriverIO or Selenium
- Windows: Download matching Edge Driver version
- Reference: https://v2.tauri.app/develop/tests/webdriver/

**Layer 4: AI Behavior & Fact Retention Tests**

**Decision:** Verify "Pinned Context" effectiveness

**Approach:**
- **Fact Injection:** Feed specific facts into Story Bible.
- **Distraction:** Generate 50k words of unrelated text.
- **Recall Test:** Ask specific questions about injected facts.
- **Pass Criteria:** AI must retrieve pinned facts 100% of the time, regardless of narrative "rolling window".

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
