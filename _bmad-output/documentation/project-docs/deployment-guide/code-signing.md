# Code Signing

## Why Code Signing?

- **Trust:** Users see "Verified Publisher" instead of security warnings
- **Security:** Prevents tampering after distribution
- **Platform Requirements:** Required for macOS notarization and some enterprise deployments

## Obtaining Certificates

**Windows:**
- Purchase from certificate authority (DigiCert, Sectigo, etc.)
- Or use EV code signing certificate

**macOS:**
- Apple Developer ID certificate (requires Apple Developer account)
- Generated via Xcode or Apple Developer portal

**Linux:**
- Generally not required; GPG signatures for package repositories

---
