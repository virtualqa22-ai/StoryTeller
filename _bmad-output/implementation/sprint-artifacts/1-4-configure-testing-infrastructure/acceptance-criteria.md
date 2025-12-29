# Acceptance Criteria

**Given** the Tauri + Svelte project is initialized
**When** the team adds Vitest for frontend testing
**Then** `vitest`, `@vitest/ui`, `@testing-library/svelte`, and `jsdom` are added to `package.json`
**And** `vite.config.js` is updated with Vitest configuration (test block added to existing config)
**And** a sample component test exists at `src/lib/__tests__/HomeScreen.test.ts`
**And** the test verifies the welcome message and primary buttons render
**And** `pnpm test` runs all frontend tests
**And** tests run in watch mode during development

**Given** Vitest is configured
**When** the team adds Playwright for E2E testing
**Then** `@playwright/test` is added to `package.json`
**And** `playwright.config.ts` is created with Tauri-specific configuration
**And** a sample E2E test exists at `tests/e2e/launch.spec.ts`
**And** the test launches the Tauri app and verifies home screen appears
**And** the test verifies "Create New Project" button is clickable
**And** `pnpm test:e2e` runs all E2E tests

**Given** all testing frameworks are configured
**When** the team runs the complete test suite
**Then** frontend tests and E2E tests all pass
**And** test results are clearly displayed with pass/fail status
**And** test execution completes in <30 seconds for initial test suite
**And** CI/CD pipeline can run tests automatically
