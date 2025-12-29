# Troubleshooting

## Build Errors

### "WebView2 not found" (Windows)
**Solution:** Install WebView2 Runtime:
```bash
winget install Microsoft.EdgeWebView2Runtime
```

### "No provisioning profile found" (macOS)
**Solution:** Create a Developer ID Application certificate in Xcode:
1. Open Xcode → Preferences → Accounts
2. Add Apple ID
3. Manage Certificates → + → Developer ID Application

### "libwebkit2gtk not found" (Linux)
**Solution:** Install required libraries:
```bash
sudo apt install libwebkit2gtk-4.1-dev
```

---

## Runtime Errors

### Database initialization fails
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

### White screen on launch
**Check:**
- Frontend built correctly (`pnpm build`)
- `frontendDist` path in tauri.conf.json points to correct build output
- Check Tauri console logs

---
