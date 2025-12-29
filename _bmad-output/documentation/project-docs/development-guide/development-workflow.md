# Development Workflow

## Running the Application

### Development Mode (Hot Reload)
```bash
# Start both Vite dev server and Tauri app
pnpm tauri dev

# Or run frontend only (no desktop app)
pnpm dev
```

**Note:** Dev server runs on port 1420 (Tauri requirement, strictPort: true).

### Production Build
```bash
# Build web assets
pnpm build

# Build desktop application (creates installer)
pnpm tauri build
```

**Output:** Platform-specific installer in `src-tauri/target/release/bundle/`

---

## Code Quality Checks

### TypeScript & Svelte Validation
```bash
# Check types and Svelte syntax
pnpm check

# Watch mode (continuous checking)
pnpm check:watch
```

### Unit Tests
```bash
# Run all unit tests (Vitest)
pnpm test

# Watch mode
pnpm test:watch

# With UI
pnpm test:ui
```

### End-to-End Tests
```bash
# Run Playwright E2E tests
pnpm test:e2e

# Debug mode (headed browser)
pnpm test:e2e --debug

# Specific test file
pnpm test:e2e tests/e2e/home.spec.ts
```

### Rust Tests
```bash
# Run Rust unit tests
cd src-tauri
cargo test

# With output
cargo test -- --nocapture
```

---
