# Platform-Specific Builds

## Windows

### Building for Windows

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

### Windows Code Signing

```bash
# Sign with certificate
$env:TAURI_PRIVATE_KEY = Get-Content cert.key -Raw
$env:TAURI_KEY_PASSWORD = "your-password"
pnpm tauri build
```

---

## macOS

### Building for macOS

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

### macOS Code Signing & Notarization

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

## Linux

### Building for Linux

**Debian/Ubuntu (x64):**
```bash
pnpm tauri build --target x86_64-unknown-linux-gnu
```

**Output Formats:**
- **AppImage:** Portable, runs on most distributions (recommended)
- **Deb:** Debian/Ubuntu package manager format

### AppImage Distribution

AppImages are self-contained and work across distributions:

```bash
# Make executable
chmod +x story-teller_0.1.0_amd64.AppImage

# Run directly
./story-teller_0.1.0_amd64.AppImage
```

Users can also integrate AppImages with their desktop using [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher).

---
