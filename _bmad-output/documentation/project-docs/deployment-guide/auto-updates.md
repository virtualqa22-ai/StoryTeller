# Auto-Updates

## Tauri Updater Plugin

StoryTeller can support automatic updates using Tauri's built-in updater.

### Setup

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

### Update Server

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

### Frontend Integration

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
