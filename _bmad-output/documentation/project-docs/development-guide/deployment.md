# Deployment

## Building for Production

```bash
# Build desktop app
pnpm tauri build
```

**Output:**
- **Windows:** `.exe`, `.msi` in `src-tauri/target/release/bundle/`
- **macOS:** `.app`, `.dmg` in `src-tauri/target/release/bundle/`
- **Linux:** `.AppImage`, `.deb` in `src-tauri/target/release/bundle/`

## Code Signing (macOS/Windows)
- Configure signing in `src-tauri/tauri.conf.json`
- Requires developer certificate

---
