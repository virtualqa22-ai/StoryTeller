# Build Process

## Development Build

For local testing:

```bash
# Install dependencies
pnpm install

# Run development build
pnpm tauri dev
```

This launches the app in development mode with hot-reload enabled.

---

## Production Build

### Full Production Build (All Platforms)

```bash
# 1. Install dependencies
pnpm install

# 2. Type-check frontend
pnpm check

# 3. Run tests
pnpm test
pnpm test:e2e

# 4. Build production bundle
pnpm tauri build
```

### Build Output Locations

**Windows:**
- Installer: `src-tauri/target/release/bundle/msi/StoryTeller_0.1.0_x64_en-US.msi`
- Portable: `src-tauri/target/release/bundle/nsis/StoryTeller_0.1.0_x64-setup.exe`
- Executable: `src-tauri/target/release/storyteller.exe`

**macOS:**
- DMG: `src-tauri/target/release/bundle/dmg/StoryTeller_0.1.0_x64.dmg`
- App Bundle: `src-tauri/target/release/bundle/macos/StoryTeller.app`

**Linux:**
- AppImage: `src-tauri/target/release/bundle/appimage/story-teller_0.1.0_amd64.AppImage`
- Debian Package: `src-tauri/target/release/bundle/deb/story-teller_0.1.0_amd64.deb`

---
