# Deployment Guide

**Project:** StoryTeller
**Generated:** 2025-12-29
**Tauri Version:** 2.x
**Platform Support:** Windows, macOS, Linux

---

## Overview

StoryTeller is a desktop application built with Tauri v2. This guide covers building, packaging, and distributing the application for production use across multiple platforms.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Build Process](#build-process)
3. [Platform-Specific Builds](#platform-specific-builds)
4. [Distribution](#distribution)
5. [Code Signing](#code-signing)
6. [Auto-Updates](#auto-updates)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Development Environment

#### All Platforms
- **Node.js:** 18.x or higher
- **pnpm:** Latest version
- **Rust:** Latest stable toolchain
- **Git:** For version control

#### Windows
- **Visual Studio 2022:** C++ build tools
- **Windows SDK:** 10 or 11
- **WebView2:** Included in Windows 10 1809+

#### macOS
- **Xcode:** 14 or higher
- **Xcode Command Line Tools:** `xcode-select --install`
- **Rosetta 2:** For building universal binaries on Apple Silicon

#### Linux (Debian/Ubuntu)
```bash
sudo apt update
sudo apt install -y \
  libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

#### Linux (Fedora)
```bash
sudo dnf install -y \
  webkit2gtk4.1-devel \
  openssl-devel \
  curl \
  wget \
  file \
  libappindicator-gtk3-devel \
  librsvg2-devel
```

---

## Build Process

### Development Build

For local testing:

```bash
# Install dependencies
pnpm install

# Run development build
pnpm tauri dev
```

This launches the app in development mode with hot-reload enabled.

---

### Production Build

#### Full Production Build (All Platforms)

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

#### Build Output Locations

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

## Platform-Specific Builds

### Windows

#### Building for Windows

```bash
pnpm tauri build --target x86_64-pc-windows-msvc
```

**Output Formats:**
- **MSI:** Windows Installer package (recommended for enterprise)
- **NSIS:** Nullsoft Scriptable Install System (recommended for consumer distribution)

**Configuration:** `src-tauri/tauri.conf.json`

```json
{
  "bundle": {
    "windows": {
      "certificateThumbprint": null,
      "digestAlgorithm": "sha256",
      "timestampUrl": ""
    }
  }
}
```

#### Windows Code Signing

```bash
# Sign with certificate
$env:TAURI_PRIVATE_KEY = Get-Content cert.key -Raw
$env:TAURI_KEY_PASSWORD = "your-password"
pnpm tauri build
```

---

### macOS

#### Building for macOS

**Intel (x86_64):**
```bash
pnpm tauri build --target x86_64-apple-darwin
```

**Apple Silicon (ARM64):**
```bash
pnpm tauri build --target aarch64-apple-darwin
```

**Universal Binary (Both):**
```bash
pnpm tauri build --target universal-apple-darwin
```

**Output Formats:**
- **DMG:** Disk image (recommended for distribution)
- **App Bundle:** `.app` directory

#### macOS Code Signing & Notarization

1. **Sign the app:**
```bash
export APPLE_CERTIFICATE="Developer ID Application: Your Name (TEAM_ID)"
export APPLE_CERTIFICATE_PASSWORD="cert-password"
export APPLE_SIGNING_IDENTITY="Developer ID Application: Your Name (TEAM_ID)"
pnpm tauri build
```

2. **Notarize with Apple:**
```bash
xcrun notarytool submit \
  "src-tauri/target/release/bundle/dmg/StoryTeller_0.1.0_universal.dmg" \
  --apple-id "your@email.com" \
  --password "app-specific-password" \
  --team-id "TEAM_ID" \
  --wait
```

3. **Staple the notarization:**
```bash
xcrun stapler staple \
  "src-tauri/target/release/bundle/dmg/StoryTeller_0.1.0_universal.dmg"
```

**Requirements:**
- Apple Developer account ($99/year)
- Developer ID Application certificate
- App-specific password for notarization

---

### Linux

#### Building for Linux

**Debian/Ubuntu (x64):**
```bash
pnpm tauri build --target x86_64-unknown-linux-gnu
```

**Output Formats:**
- **AppImage:** Portable, runs on most distributions (recommended)
- **Deb:** Debian/Ubuntu package manager format

#### AppImage Distribution

AppImages are self-contained and work across distributions:

```bash
# Make executable
chmod +x story-teller_0.1.0_amd64.AppImage

# Run directly
./story-teller_0.1.0_amd64.AppImage
```

Users can also integrate AppImages with their desktop using [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher).

---

## Distribution

### Direct Download

Host installers on your own server or CDN:

1. Build production bundles for all target platforms
2. Upload to static file hosting (AWS S3, Cloudflare R2, etc.)
3. Provide download links on your website

**Recommended Structure:**
```
https://downloads.example.com/
├── windows/
│   ├── StoryTeller-0.1.0-x64-setup.exe
│   └── StoryTeller-0.1.0-x64.msi
├── macos/
│   ├── StoryTeller-0.1.0-universal.dmg
│   └── StoryTeller-0.1.0-aarch64.dmg
└── linux/
    ├── StoryTeller-0.1.0-amd64.AppImage
    └── story-teller_0.1.0_amd64.deb
```

---

### Platform App Stores

#### Microsoft Store (Windows)

1. Create a Microsoft Partner Center account
2. Package as MSIX:
```bash
pnpm tauri build --target x86_64-pc-windows-msvc --bundles msix
```
3. Submit via Partner Center for review

**Documentation:** https://learn.microsoft.com/en-us/windows/apps/publish/

---

#### Mac App Store

1. Create App Store Connect listing
2. Build with App Store provisioning profile
3. Submit via Transporter app

**Additional Requirements:**
- Sandbox entitlements
- App-specific iCloud container (if using cloud sync)
- Privacy descriptions in Info.plist

**Documentation:** https://developer.apple.com/app-store/submitting/

---

#### Snap Store (Linux)

1. Create snapcraft.yaml:
```yaml
name: storyteller
version: '0.1.0'
summary: Desktop storytelling application
description: |
  StoryTeller is a desktop application for writers to manage
  their novel projects, characters, and chapters.
grade: stable
confinement: strict
base: core22

apps:
  storyteller:
    command: storyteller
    plugs:
      - home
      - network
      - desktop
      - desktop-legacy
      - wayland
      - x11

parts:
  storyteller:
    plugin: nil
    override-build: |
      # Copy AppImage contents
      cp -r $CRAFT_PART_SRC/* $CRAFT_PART_INSTALL/
```

2. Build and publish:
```bash
snapcraft
snapcraft upload --release=stable storyteller_0.1.0_amd64.snap
```

---

## Code Signing

### Why Code Signing?

- **Trust:** Users see "Verified Publisher" instead of security warnings
- **Security:** Prevents tampering after distribution
- **Platform Requirements:** Required for macOS notarization and some enterprise deployments

### Obtaining Certificates

**Windows:**
- Purchase from certificate authority (DigiCert, Sectigo, etc.)
- Or use EV code signing certificate

**macOS:**
- Apple Developer ID certificate (requires Apple Developer account)
- Generated via Xcode or Apple Developer portal

**Linux:**
- Generally not required; GPG signatures for package repositories

---

## Auto-Updates

### Tauri Updater Plugin

StoryTeller can support automatic updates using Tauri's built-in updater.

#### Setup

1. **Install updater plugin:**
```bash
pnpm add @tauri-apps/plugin-updater
```

2. **Configure in tauri.conf.json:**
```json
{
  "plugins": {
    "updater": {
      "endpoints": [
        "https://updates.example.com/{{target}}/{{current_version}}"
      ],
      "pubkey": "YOUR_PUBLIC_KEY_HERE"
    }
  }
}
```

3. **Generate key pair:**
```bash
pnpm tauri signer generate
```

This creates:
- Private key (keep secret, used for signing)
- Public key (embedded in app, used for verification)

4. **Sign updates:**
```bash
pnpm tauri signer sign path/to/installer.exe
```

#### Update Server

Host a JSON file at the endpoint URL:

**Example: `https://updates.example.com/windows/0.1.0`**
```json
{
  "version": "0.2.0",
  "notes": "Bug fixes and performance improvements",
  "pub_date": "2025-01-15T12:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "SIGNATURE_HERE",
      "url": "https://downloads.example.com/StoryTeller-0.2.0-setup.exe"
    }
  }
}
```

#### Frontend Integration

```typescript
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

async function checkForUpdates() {
  const update = await check();

  if (update?.available) {
    console.log(`Update available: ${update.version}`);

    // Download and install
    await update.downloadAndInstall();

    // Restart the app
    await relaunch();
  }
}
```

---

## Continuous Integration

### GitHub Actions

**Example Workflow: `.github/workflows/release.yml`**

```yaml
name: Release Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        platform: [windows-latest, macos-latest, ubuntu-22.04]

    runs-on: ${{ matrix.platform }}

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      - name: Setup Rust
        uses: dtolnay/rust-toolchain@stable

      - name: Install dependencies (Linux)
        if: matrix.platform == 'ubuntu-22.04'
        run: |
          sudo apt update
          sudo apt install -y libwebkit2gtk-4.1-dev \
            build-essential curl wget file libssl-dev \
            libayatana-appindicator3-dev librsvg2-dev

      - name: Install frontend dependencies
        run: pnpm install

      - name: Build
        run: pnpm tauri build

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.platform }}-build
          path: src-tauri/target/release/bundle/

  release:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v4

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            windows-latest-build/**/*.exe
            windows-latest-build/**/*.msi
            macos-latest-build/**/*.dmg
            ubuntu-22.04-build/**/*.AppImage
            ubuntu-22.04-build/**/*.deb
```

---

## Troubleshooting

### Build Errors

#### "WebView2 not found" (Windows)
**Solution:** Install WebView2 Runtime:
```bash
winget install Microsoft.EdgeWebView2Runtime
```

#### "No provisioning profile found" (macOS)
**Solution:** Create a Developer ID Application certificate in Xcode:
1. Open Xcode → Preferences → Accounts
2. Add Apple ID
3. Manage Certificates → + → Developer ID Application

#### "libwebkit2gtk not found" (Linux)
**Solution:** Install required libraries:
```bash
sudo apt install libwebkit2gtk-4.1-dev
```

---

### Runtime Errors

#### Database initialization fails
**Check:**
- App data directory permissions
- SQLite bundled correctly (`rusqlite` with `bundled` feature)
- Sufficient disk space

**Debug:**
```bash
# Linux/macOS
~/.local/share/com.storyteller.app/

# Windows
%APPDATA%\com.storyteller.app\

# macOS
~/Library/Application Support/com.storyteller.app/
```

#### White screen on launch
**Check:**
- Frontend built correctly (`pnpm build`)
- `frontendDist` path in tauri.conf.json points to correct build output
- Check Tauri console logs

---

## Security Considerations

### Content Security Policy

Current CSP: `null` (permissive, development-friendly)

**Production CSP Example:**
```json
{
  "app": {
    "security": {
      "csp": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
    }
  }
}
```

### File Associations

StoryTeller registers `.storyteller` file extension:
- **MIME Type:** `application/x-storyteller`
- **Double-click** opens file in StoryTeller
- Configured in `tauri.conf.json` → `bundle.fileAssociations`

---

## Version Bumping

### Manual Version Update

Update in three places:

1. **`src-tauri/tauri.conf.json`:**
```json
{
  "version": "0.2.0"
}
```

2. **`src-tauri/Cargo.toml`:**
```toml
[package]
version = "0.2.0"
```

3. **`package.json`:**
```json
{
  "version": "0.2.0"
}
```

### Automated with Script

```bash
#!/bin/bash
VERSION=$1

# Update all version files
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json
sed -i "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" src-tauri/tauri.conf.json
sed -i "s/version = \".*\"/version = \"$VERSION\"/" src-tauri/Cargo.toml

# Git tag
git add .
git commit -m "chore: bump version to $VERSION"
git tag "v$VERSION"
git push && git push --tags
```

---

## Performance Optimization

### Bundle Size Reduction

1. **Remove unused dependencies:**
```bash
pnpm prune
```

2. **Optimize frontend build:**
```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
};
```

3. **Strip Rust debug symbols:**
```toml
# Cargo.toml
[profile.release]
strip = true
lto = true
opt-level = "z"
```

---

## Deployment Checklist

### Pre-Release
- [ ] Version number updated in all files
- [ ] Changelog updated
- [ ] Tests passing (`pnpm test && pnpm test:e2e`)
- [ ] Type checks passing (`pnpm check`)
- [ ] Linter warnings resolved
- [ ] Database migrations tested
- [ ] Performance profiling completed

### Build
- [ ] Clean build (`rm -rf node_modules src-tauri/target && pnpm install`)
- [ ] Production build successful for all platforms
- [ ] Installers tested on fresh VMs/machines
- [ ] File associations work correctly
- [ ] App launches without errors

### Security
- [ ] Code signed (Windows & macOS)
- [ ] macOS notarized (if distributing outside App Store)
- [ ] CSP configured appropriately
- [ ] No sensitive data in build artifacts

### Distribution
- [ ] Installers uploaded to hosting
- [ ] Update manifest uploaded (if using auto-updates)
- [ ] Download links verified
- [ ] Release notes published
- [ ] Social media/blog announcement

---

## Resources

### Official Documentation
- **Tauri Docs:** https://v2.tauri.app/
- **Tauri Building Guide:** https://v2.tauri.app/distribute/
- **Tauri Updater:** https://v2.tauri.app/plugin/updater/

### Platform Documentation
- **Windows Deployment:** https://learn.microsoft.com/en-us/windows/apps/desktop/
- **macOS Deployment:** https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases
- **Linux AppImage:** https://appimage.org/

### Community
- **Tauri Discord:** https://discord.gg/tauri
- **GitHub Discussions:** https://github.com/tauri-apps/tauri/discussions

---

**Last Updated:** 2025-12-29
**Tauri Version:** 2.x
**Application Version:** 0.1.0
