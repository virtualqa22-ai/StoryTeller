# Infrastructure & Deployment

## Telemetry Backend: Sentry (Beta) → Self-Hosted (Post-Launch)

**Decision:** Use Sentry during beta, migrate to self-hosted post-launch

**Rationale:**
- **Fast Iteration:** Sentry provides instant error tracking for beta
- **Release Tracking:** See which version has crashes
- **Session Replay:** Understand user context during errors
- **Cost:** $29/mo acceptable for beta (30-50 users)
- **Privacy:** Plan migration to self-hosted for user control

**Sentry Configuration:**
```rust
// src-tauri/src/telemetry.rs
use sentry;

pub fn init_telemetry() -> Option<sentry::ClientInitGuard> {
    // Only if user opted in
    if !user_preferences.telemetry_enabled {
        return None;
    }

    let guard = sentry::init(sentry::ClientOptions {
        dsn: Some(env::var("SENTRY_DSN").ok()?),
        release: Some(env!("CARGO_PKG_VERSION").into()),
        environment: Some(
            if cfg!(debug_assertions) { "development" }
            else { "production" }
        ),
        traces_sample_rate: 0.1, // 10% of transactions
        before_send: Some(Arc::new(|mut event| {
            // Strip any PII before sending
            event.user = None;
            event.request = None;
            Some(event)
        })),
        ..Default::default()
    });

    Some(guard)
}

pub fn capture_error(err: &anyhow::Error) {
    sentry::capture_error(err);
}

pub fn capture_message(msg: &str, level: sentry::Level) {
    sentry::capture_message(msg, level);
}
```

**Privacy Controls:**
- Opt-in only (default: disabled)
- Clear consent dialog on first run
- Show user exactly what data is collected
- One-click disable in settings
- No novel content, only errors and performance metrics

**Telemetry Events Collected:**
- Crash reports (stack traces, OS info)
- Error rates by feature (validation, AI, export)
- Performance metrics (startup time, FPS, generation speed)
- Feature usage (anonymized counts, no content)

**Self-Hosted Migration Plan (Months 10-12):**
```rust
// Replace Sentry with self-hosted solution
// Options:
// 1. GlitchTip (Sentry-compatible, self-hosted)
// 2. Custom: Rust server + SQLite + dashboard
// 3. Minimal: Local log files + upload on user request
```

**Cost Projection:**
- Beta (Months 1-6): $29/mo = $174
- Scale (Months 7-12): $450/mo = $2700 (if not migrated)
- Self-hosted (Month 12+): $0/mo (hosting cost only)

**Timeline Impact:** +0.5 weeks (Sentry setup + privacy controls)

## CI/CD Pipeline

**Decision:** GitHub Actions with matrix builds

**Platforms:** Windows, macOS, Linux

**Pipeline Stages:**
```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install pnpm
        run: npm install -g pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Run Rust tests
        run: cargo test --all-features

      - name: Run frontend tests
        run: pnpm test

      - name: Build app
        run: pnpm tauri build

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: storyteller-${{ matrix.os }}
          path: src-tauri/target/release/bundle/

  e2e:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Run E2E tests
        run: pnpm test:e2e

      - name: Enforce Serde Renames
        run: |
          # Grep for public structs without proper serde rename attributes
          if grep -r "pub struct" src-tauri/src | grep -v "#\[serde(rename_all"; then
            echo "ERROR: All public structs must have #[serde(rename_all = ...)] attribute"
            exit 1
          fi

```

**Release Pipeline:**
- Tag release → trigger build → run tests → create installers → upload to releases

**Code Signing (Deferred to Sprint 8):**
- macOS: Apple Developer certificate ($99/year)
- Windows: Code signing certificate (optional for beta, required for distribution)
