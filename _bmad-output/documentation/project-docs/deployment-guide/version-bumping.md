# Version Bumping

## Manual Version Update

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

## Automated with Script

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
