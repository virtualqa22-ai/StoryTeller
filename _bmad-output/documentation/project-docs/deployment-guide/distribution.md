# Distribution

## Direct Download

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

## Platform App Stores

### Microsoft Store (Windows)

1. Create a Microsoft Partner Center account
2. Package as MSIX:
```bash
pnpm tauri build --target x86_64-pc-windows-msvc --bundles msix
```
3. Submit via Partner Center for review

**Documentation:** https://learn.microsoft.com/en-us/windows/apps/publish/

---

### Mac App Store

1. Create App Store Connect listing
2. Build with App Store provisioning profile
3. Submit via Transporter app

**Additional Requirements:**
- Sandbox entitlements
- App-specific iCloud container (if using cloud sync)
- Privacy descriptions in Info.plist

**Documentation:** https://developer.apple.com/app-store/submitting/

---

### Snap Store (Linux)

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
