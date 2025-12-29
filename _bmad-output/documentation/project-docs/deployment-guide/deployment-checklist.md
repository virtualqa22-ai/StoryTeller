# Deployment Checklist

## Pre-Release
- [ ] Version number updated in all files
- [ ] Changelog updated
- [ ] Tests passing (`pnpm test && pnpm test:e2e`)
- [ ] Type checks passing (`pnpm check`)
- [ ] Linter warnings resolved
- [ ] Database migrations tested
- [ ] Performance profiling completed

## Build
- [ ] Clean build (`rm -rf node_modules src-tauri/target && pnpm install`)
- [ ] Production build successful for all platforms
- [ ] Installers tested on fresh VMs/machines
- [ ] File associations work correctly
- [ ] App launches without errors

## Security
- [ ] Code signed (Windows & macOS)
- [ ] macOS notarized (if distributing outside App Store)
- [ ] CSP configured appropriately
- [ ] No sensitive data in build artifacts

## Distribution
- [ ] Installers uploaded to hosting
- [ ] Update manifest uploaded (if using auto-updates)
- [ ] Download links verified
- [ ] Release notes published
- [ ] Social media/blog announcement

---
