# Export Architecture

## Strategy: Split Pipeline (Hybrid)

**Decision:** Bundle lightweight exporter for Drafts, use optional Sidecar for Professional PDF

**Rationale:**
- **Zero-Friction Drafts:** Users can export Markdown/HTML immediately without downloads.
- **Professional Quality:** Puppeteer sidecar ensures pixel-perfect layout but is an optional download.
- **Download Size:** Keeps initial install small (~15MB), avoids forcing 150MB+ download on all users.

**Draft Exporter (Bundled):**
- **Formats:** Markdown, HTML, Plain Text
- **Engine:** Pure Rust implementation (lightweight)
- **Uses:** Backup, sharing chunks, web publishing

**Professional Exporter (Optional Sidecar):**
- **Formats:** Print-Ready PDF, EPUB3, DOCX
- **Engine:** Puppeteer (Chrome Headless) + docx.js via Node.js sidecar
- **Trigger:** On first "Pro Export", prompt user: "Download Export Module? (120MB)"
- **Persistence:** stored in `{app_data}/bin/`
