# Epic 8: Professional Export Pipeline

Authors can export publication-ready novels in PDF (Amazon KDP/IngramSpark compliant), EPUB (EPUB3 standard), and DOCX (Word-compatible) formats with custom formatting, meeting professional publishing standards.

### Story 8.1: Design Export Metadata Schema [Tier 1]

As a development team,
I want a database schema for export configurations and history,
So that users can save export presets and track export operations.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V8__create_export_schema.sql`
**Then** the migration defines an `export_presets` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), preset_name (TEXT), format (TEXT: 'pdf', 'epub', 'docx'), settings_json (TEXT, JSON format with format-specific settings), created_at (TIMESTAMP)
**And** an `export_history` table is defined: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), export_preset_id (INTEGER, FOREIGN KEY, nullable), format (TEXT), file_path (TEXT), file_size_bytes (INTEGER), export_time_ms (INTEGER), status (TEXT: 'completed', 'failed'), error_message (TEXT), created_at (TIMESTAMP)
**And** the schema allows saving and reusing export configurations

### Story 8.2: Implement Puppeteer Sidecar for PDF Export [Tier 1]

As a development team,
I want Puppeteer configured as a sidecar process for PDF generation,
So that we can create Vellum-quality PDF exports with professional typography.

**Acceptance Criteria:**

**Given** the Tauri application is built
**When** the application is packaged
**Then** Puppeteer is bundled as a sidecar binary (Node.js + Puppeteer, ~120MB)
**And** the sidecar is configured in `tauri.conf.json` under `bundle.externalBin`
**And** the sidecar path is platform-specific (Windows: .exe, macOS: universal binary, Linux: elf)

**Given** the application needs to generate a PDF
**When** the PDF export is triggered
**Then** the Rust backend spawns the Puppeteer sidecar process
**And** the chapter content is formatted as HTML with CSS styles (professional book typography)
**And** the HTML is passed to Puppeteer via stdin or temp file
**And** Puppeteer renders the HTML to PDF using Chromium's print-to-PDF feature
**And** the PDF is saved to the specified output path
**And** the sidecar process is terminated after generation

**Given** the Puppeteer sidecar is running
**When** PDF generation occurs
**Then** the PDF output includes: Custom page size (6x9 inches for trade paperback, or user-configured), Proper margins (1 inch outer, 0.75 inch inner for binding, configurable), Professional typography (Georgia or user-selected serif font, proper leading/kerning), Page numbers (centered or outer corner, configurable), Chapter headings (styled with appropriate spacing), Title page with author information

**Given** the Puppeteer sidecar fails to start
**When** the error is detected
**Then** a clear error message is displayed: "PDF export failed: Puppeteer sidecar could not start. Please check your installation."
**And** diagnostic logs capture the sidecar stderr output
**And** the user is advised to reinstall the application if the issue persists

### Story 8.3: Implement PDF Export with Custom Settings [Tier 1]

As an author,
I want to export my novel as a PDF with custom formatting,
So that I can submit to Amazon KDP or IngramSpark with professional quality.

**Acceptance Criteria:**

**Given** the author opens the export dialog
**When** "Export as PDF" is selected
**Then** a PDF export configuration panel is displayed with settings: Page Size (dropdown: 6x9 Trade Paperback, 5x8 Digest, 5.5x8.5 US Trade, 8.5x11 Letter, Custom), Margins (sliders: Top, Bottom, Inner, Outer, in inches), Font (dropdown: Georgia, Garamond, Baskerville, Custom), Font Size (number input: 10-14pt), Line Spacing (dropdown: Single, 1.15, 1.5, Double), Include Title Page (checkbox), Include Table of Contents (checkbox), Page Numbering (dropdown: None, Centered, Outer Corner), Chapter Start (dropdown: New Page, Continuous)
**And** a live preview shows how the formatted pages will look
**And** "Export" and "Cancel" buttons are available

**Given** the author configures settings and clicks "Export"
**When** the export process begins
**Then** a file save dialog opens for the user to choose the output location
**And** the default filename is "{Project Title} - {Author Name}.pdf"
**And** after the user selects a location, the export starts
**And** a progress modal displays: "Exporting to PDF...", Progress bar (based on chapter completion), Estimated time remaining, "Cancel" button (cancels the export)

**Given** the PDF export is in progress
**When** chapters are processed
**Then** each chapter is converted to HTML with the configured styles
**And** the HTML is rendered to PDF pages via Puppeteer
**And** the progress bar updates as chapters complete
**And** the export completes within 60 seconds for manuscripts up to 150,000 words (per NFR)

**Given** the PDF export completes successfully
**When** the file is ready
**Then** a success notification is displayed: "PDF exported successfully! {file_size} MB"
**And** a "Open PDF" button is available to view the file
**And** an "Open Folder" button opens the file explorer to the export location
**And** the export is logged in export_history

**Given** the PDF export fails
**When** an error occurs (sidecar failure, disk space, etc.)
**Then** a clear error message is displayed with the specific issue
**And** the user is offered options: "Retry Export", "Change Settings", "View Logs"
**And** partial files are cleaned up (no incomplete PDFs left behind)

### Story 8.4: Implement KDP and IngramSpark Validation [Tier 1]

As an author,
I want my PDF exports validated against Amazon KDP and IngramSpark specifications,
So that I know my file will be accepted by these platforms.

**Acceptance Criteria:**

**Given** a PDF export completes
**When** validation is enabled (default for PDF exports)
**Then** the PDF is validated against KDP specifications: File size < 650 MB, Page dimensions within KDP supported sizes, Margins meet minimum requirements (0.25 inch minimum), No DRM or encryption, Fonts embedded properly, No form fields or JavaScript
**And** the PDF is validated against IngramSpark specifications: File size < 400 MB, Page dimensions match standard trim sizes, Bleed settings (if applicable), Proper color space (CMYK for color, Grayscale for B&W), Resolution 300 DPI minimum for images

**Given** validation passes all checks
**When** the results are presented
**Then** a success badge is displayed: "✓ KDP Compliant" and "✓ IngramSpark Compliant"
**And** a detailed validation report is available showing which checks passed

**Given** validation detects issues
**When** the results are presented
**Then** a warning is displayed: "⚠ Validation issues detected"
**And** specific issues are listed: "Page margins are below IngramSpark minimum (found 0.2 inch, require 0.25 inch)", "File size exceeds KDP recommendation (found 700 MB, recommend < 650 MB)"
**And** suggested fixes are provided for each issue
**And** the user can still use the file but is warned it may be rejected by the platform

**Given** the user wants to ensure compliance
**When** the user views export settings
**Then** a "Use KDP/IngramSpark Presets" button is available
**And** clicking it auto-configures settings to meet both platforms' specifications
**And** the user can then export with confidence

### Story 8.5: Implement EPUB3 Export [Tier 1]

As an author,
I want to export my novel as an EPUB3 file,
So that I can publish to Amazon Kindle, Apple Books, and other ebook retailers.

**Acceptance Criteria:**

**Given** the author opens the export dialog
**When** "Export as EPUB" is selected
**Then** an EPUB export configuration panel is displayed with settings: Include cover image (file upload, recommended 1600x2560px), Include table of contents (checkbox, default enabled), Metadata (author, publisher, ISBN, publication date), Font embedding (checkbox: embed custom fonts or use reader defaults), Chapter breaks (automatic based on chapter structure)
**And** a preview shows the EPUB structure (TOC, chapters)
**And** "Export" and "Cancel" buttons are available

**Given** the author configures settings and clicks "Export"
**When** the export process begins
**Then** a file save dialog opens for the .epub file
**And** the default filename is "{Project Title} - {Author Name}.epub"
**And** after the user selects a location, the export starts
**And** a progress modal displays: "Exporting to EPUB...", Progress bar, "Cancel" button

**Given** the EPUB export is in progress
**When** the Rust EPUB3 builder runs
**Then** the EPUB structure is created: mimetype file (application/epub+zip), META-INF/container.xml, Content files (XHTML for each chapter), content.opf (metadata and manifest), toc.ncx and nav.xhtml (table of contents), Embedded resources (cover image, fonts if selected)
**And** all files are packaged into a ZIP archive with .epub extension
**And** the export completes within 60 seconds for manuscripts up to 150,000 words

**Given** the EPUB export completes successfully
**When** the file is ready
**Then** EPUB validation runs automatically (EPUBCheck if available, or basic validation)
**And** if validation passes: "✓ EPUB3 Compliant"
**And** if validation fails: warnings are displayed with specific issues
**And** a success notification is displayed with "Open EPUB" and "Open Folder" buttons

**Given** the EPUB is validated
**When** EPUBCheck (or equivalent) runs
**Then** the EPUB is checked for: Valid EPUB3 structure, No missing files, Valid XHTML in content files, Proper metadata in content.opf, Accessible navigation (toc.ncx and nav.xhtml)
**And** validation results are displayed to the user

### Story 8.6: Implement DOCX Export [Tier 1]

As an author,
I want to export my novel as a DOCX file,
So that I can share it with editors or collaborators who use Microsoft Word.

**Acceptance Criteria:**

**Given** the author opens the export dialog
**When** "Export as DOCX" is selected
**Then** a DOCX export configuration panel is displayed with settings: Include title page (checkbox), Include table of contents (checkbox), Font (dropdown: Calibri, Times New Roman, Georgia, Arial), Font size (number input: 10-14pt), Line spacing (dropdown: Single, 1.5, Double), Page size (dropdown: Letter, A4), Margins (sliders: Top, Bottom, Left, Right in inches)
**And** "Export" and "Cancel" buttons are available

**Given** the author configures settings and clicks "Export"
**When** the export process begins
**Then** the Node.js sidecar with docx.js library is spawned
**And** a file save dialog opens for the .docx file
**And** the default filename is "{Project Title} - {Author Name}.docx"
**And** after the user selects a location, the export starts
**And** a progress modal displays: "Exporting to DOCX...", Progress bar, "Cancel" button

**Given** the DOCX export is in progress
**When** the docx.js library runs
**Then** a DOCX document is created with: Document properties (title, author, created date), Proper paragraph styles (Normal, Heading 1 for chapters, Title for title page), Formatted text (bold, italic preserved from ProseMirror content), Page breaks between chapters (if configured), Table of contents (if enabled, with links to chapters)
**And** the document is saved to the specified location
**And** the export completes within 60 seconds for manuscripts up to 150,000 words

**Given** the DOCX export completes successfully
**When** the file is ready
**Then** a success notification is displayed: "DOCX exported successfully!"
**And** "Open DOCX" button opens the file in the default application (Word, LibreOffice, etc.)
**And** "Open Folder" button opens the file explorer

**Given** the DOCX is opened in Microsoft Word
**When** the file is reviewed
**Then** all formatting is preserved (bold, italic, headings)
**And** chapters are properly separated (page breaks or continuous based on settings)
**And** the table of contents (if included) is functional with clickable links
**And** the document is fully editable in Word

### Story 8.7: Implement Export Preview [Tier 1]

As an author,
I want to preview my export before generating the full file,
So that I can verify formatting and catch issues early.

**Acceptance Criteria:**

**Given** the author is configuring an export (PDF, EPUB, or DOCX)
**When** a "Preview" button is available in the export settings
**Then** clicking "Preview" generates a sample export of the first 3 chapters
**And** the preview generation is fast (<10 seconds per NFR)
**And** the preview file is opened automatically in the default viewer

**Given** the preview is generated for PDF
**When** the preview opens
**Then** the author can see: Actual formatting (fonts, margins, page size), Title page and TOC (if enabled), First 3 chapters rendered exactly as the full export would be, Page numbering and chapter styling
**And** the author can verify settings before exporting the full manuscript

**Given** the preview is generated for EPUB
**When** the preview opens
**Then** an EPUB reader (system default or built-in viewer) displays the sample
**And** the author can see: Cover image, Table of contents, Chapter formatting, Font and spacing
**And** the author can navigate through the sample to verify layout

**Given** the preview is generated for DOCX
**When** the preview opens in Word (or equivalent)
**Then** the author can see the formatted document
**And** the author can verify paragraph styles, fonts, and spacing
**And** the author can close the preview and adjust settings if needed

**Given** the author is satisfied with the preview
**When** the author returns to the export settings
**Then** the settings remain unchanged (preview does not reset settings)
**And** the author can proceed with "Export" to generate the full file

### Story 8.8: Implement Export Readiness Validation [Tier 2]

As an author,
I want the application to check if my manuscript is ready for export,
So that I don't export incomplete or problematic content.

**Acceptance Criteria:**

**Given** the author clicks "Export"
**When** export readiness validation runs
**Then** the system checks for: Incomplete chapters (chapters with 0 words or far below target), Placeholder text (e.g., "[TODO: Add scene here]", "Lorem ipsum"), Validation errors (unresolved Story Bible contradictions if validations were run), Missing metadata (author name, project title)
**And** validation completes in <2 seconds

**Given** export readiness validation finds issues
**When** the results are presented
**Then** a readiness report modal is displayed: "Export Readiness Check", List of issues with severity (blocking vs. warnings), Suggested actions for each issue, "Fix Issues", "Export Anyway", "Cancel" buttons
**And** blocking issues prevent export (e.g., missing title)
**And** warnings allow export but are strongly discouraged (e.g., incomplete chapters)

**Given** blocking issues are found
**When** the user attempts to export
**Then** the "Export" action is disabled until issues are resolved
**And** the report explains: "Please resolve these issues before exporting"
**And** clicking "Fix Issues" navigates to the relevant section (e.g., Settings for missing metadata)

**Given** only warnings are found
**When** the user attempts to export
**Then** the "Export Anyway" button is enabled
**And** clicking it shows a final confirmation: "Are you sure? Your export may be incomplete or contain errors."
**And** if confirmed, the export proceeds

**Given** no issues are found
**When** export readiness validation completes
**Then** a success message is displayed: "✓ Ready to export"
**And** the export proceeds without additional prompts

### Story 8.9: Implement Custom Export Settings Presets [Tier 2]

As an author,
I want to save and reuse export configurations as presets,
So that I don't have to reconfigure settings every time I export.

**Acceptance Criteria:**

**Given** the author is configuring an export
**When** the author has set up custom settings (page size, fonts, margins, etc.)
**Then** a "Save as Preset" button is available
**And** clicking it opens a dialog prompting for a preset name (e.g., "KDP Trade Paperback")
**And** clicking "Save" stores the preset in the export_presets table

**Given** presets exist for a project
**When** the author opens the export dialog
**Then** a "Presets" dropdown is displayed
**And** selecting a preset auto-fills all export settings with the preset values
**And** the author can modify the preset settings without affecting the saved preset
**And** the author can overwrite the preset by clicking "Save as Preset" with the same name

**Given** common presets are useful
**When** the application is first installed
**Then** default presets are provided: "Amazon KDP - Trade Paperback (6x9)", "IngramSpark - Standard (6x9)", "Kindle EPUB - Standard", "Word Manuscript - Double Spaced"
**And** users can customize or delete these presets

**Given** the author wants to manage presets
**When** a "Manage Presets" button is available in the export dialog
**Then** clicking it opens a preset management modal
**And** the modal lists all saved presets with "Edit", "Delete", "Duplicate" buttons
**And** the author can rename, modify, or remove presets as needed

### Story 8.10: Implement Export Failure Handling and Recovery [Tier 1]

As an author,
I want clear error messages and recovery options when exports fail,
So that I can diagnose and fix issues without losing progress.

**Acceptance Criteria:**

**Given** an export operation is in progress
**When** a failure occurs (disk full, sidecar crash, timeout, etc.)
**Then** the export is immediately halted
**And** a specific error message is displayed: "Export failed: {specific reason}", Examples: "Disk full: {available space} MB remaining, need {required space} MB", "Puppeteer sidecar crashed: see logs for details", "Export timeout: operation exceeded 10 minutes"
**And** suggested actions are provided for each error type

**Given** the error is recoverable (e.g., disk space issue)
**When** the user is presented with recovery options
**Then** a "Retry Export" button is available
**And** clicking "Retry" attempts the export again (after the user resolves the issue)
**And** a "Change Export Location" button allows saving to a different drive/folder
**And** a "View Logs" button opens diagnostic logs for technical users

**Given** the error is not recoverable (e.g., sidecar binary missing)
**When** the user views the error
**Then** the message explains the issue clearly: "PDF export requires Puppeteer sidecar, which is missing or corrupted. Please reinstall StoryTeller."
**And** a "Reinstall Instructions" link provides guidance
**And** alternative formats are suggested: "You can still export to EPUB or DOCX."

**Given** an export times out (exceeds 10 minutes)
**When** the timeout is reached
**Then** the export is cancelled
**And** the user is informed: "Export timed out. This may indicate a performance issue or very large manuscript."
**And** options are provided: "Export in Sections" (export chapters in batches), "Simplify Formatting" (reduce complexity), "Contact Support"

**Given** partial export files exist after a failure
**When** the failure is handled
**Then** incomplete files are automatically deleted or moved to a "failed_exports" folder
**And** the user is assured: "No incomplete files were left behind"
**And** the next export attempt starts fresh

### Story 8.11: Implement Sample Chapter Export [Tier 2]

As an author,
I want to export a sample of my novel (first 3 chapters),
So that I can share a preview with beta readers or for marketing purposes.

**Acceptance Criteria:**

**Given** the author opens the export dialog
**When** an "Export Sample" option is available
**Then** a checkbox or separate button offers: "Export Sample (First 3 Chapters)"
**And** selecting this option limits the export to the first 3 chapters (or a user-specified range)

**Given** the author selects "Export Sample"
**When** the export configuration is displayed
**Then** a "Sample Range" selector allows choosing: First N chapters (default 3, adjustable 1-10), Specific chapters (multi-select: Chapter 1, 5, 10 for example), Percentage of manuscript (e.g., first 10%)
**And** the sample is clearly marked in the filename: "{Project Title} - Sample.pdf"

**Given** the sample export is generated
**When** the export completes
**Then** the sample file includes a notice on the title page or first page: "Sample Preview - First {N} Chapters" (optional, configurable)
**And** the sample is formatted identically to the full manuscript export
**And** the sample can be shared freely without exposing the full manuscript

**Given** the author exports a sample for marketing
**When** the sample is used
**Then** the file size is significantly smaller (only includes selected chapters)
**And** the sample provides a representative preview of the full novel's quality



---
