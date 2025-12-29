# Continuous Integration

## GitHub Actions

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
