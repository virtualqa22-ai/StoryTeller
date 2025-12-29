# Prerequisites

## Development Environment

### All Platforms
- **Node.js:** 18.x or higher
- **pnpm:** Latest version
- **Rust:** Latest stable toolchain
- **Git:** For version control

### Windows
- **Visual Studio 2022:** C++ build tools
- **Windows SDK:** 10 or 11
- **WebView2:** Included in Windows 10 1809+

### macOS
- **Xcode:** 14 or higher
- **Xcode Command Line Tools:** `xcode-select --install`
- **Rosetta 2:** For building universal binaries on Apple Silicon

### Linux (Debian/Ubuntu)
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

### Linux (Fedora)
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
