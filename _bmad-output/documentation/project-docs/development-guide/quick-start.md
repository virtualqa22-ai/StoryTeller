# Quick Start

## Prerequisites
- **Node.js 18+** (recommended: 20.x)
- **pnpm 8+** (package manager)
- **Rust 1.70+** (for Tauri backend)
- **Visual Studio C++ Build Tools** (Windows) or **Xcode** (macOS) or **build-essential** (Linux)

## Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd StoryTeller

# Install frontend dependencies
pnpm install

# Verify Rust installation
rustc --version
cargo --version

# Install Tauri CLI (if not already installed)
pnpm add -g @tauri-apps/cli

# Run development mode
pnpm tauri dev
```

---
