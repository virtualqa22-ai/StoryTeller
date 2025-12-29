# Test Environment Requirements

## Local Development Environment

**Requirements:**
- Rust 1.75+ with rustup
- Node.js 18+ with pnpm
- SQLite 3.35+
- Tauri CLI
- Playwright for desktop apps

**Platform-Specific:**
- **Windows:** Visual Studio Build Tools, Windows SDK
- **macOS:** Xcode Command Line Tools
- **Linux:** libwebkit2gtk-4.0-dev, libgtk-3-dev

## CI/CD Environment

**GitHub Actions Matrix:**
```yaml
strategy:
  matrix:
    os: [windows-latest, macos-14 (ARM), ubuntu-20.04]
    test-suite: [unit, integration, e2e-p0]
```

**Test Execution Time Targets:**
- Unit tests: <5 minutes per platform
- Integration tests: <15 minutes per platform
- E2E P0 tests: <20 minutes per platform
- **Total per platform:** <40 minutes

**Resource Requirements:**
- VM: 2-core, 8GB RAM minimum
- Disk: 10GB for dependencies + test fixtures
- Network: AI API rate limits (100 requests/day for integration tests)

## Beta Test Environment

**Real-World Hardware:**
- **Minimum spec:** 4GB RAM, dual-core 2.0GHz, 1GB disk (NFR-C15)
- **Typical spec:** 8GB RAM, quad-core, SSD
- **High-end spec:** 16GB RAM, 8-core, NVMe SSD

**Platform Distribution (NFR-Q8):**
- 40% Windows (10 and 11)
- 40% macOS (Intel and ARM)
- 20% Linux (Ubuntu, Fedora, Arch)

---
