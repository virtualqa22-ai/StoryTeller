---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "D:\\Documents\\Bonsai\\StoryTeller\\Reqiurement.txt"
  - "D:\\Documents\\Bonsai\\StoryTeller\\_bmad-output\\prd\\index.md"
  - "D:\\Documents\\Bonsai\\StoryTeller\\_bmad-output\\architecture\\index.md"
  - "D:\\Documents\\Bonsai\\StoryTeller\\_bmad-output\\ux-design-specification\\index.md"
  - "D:\\Documents\\Bonsai\\StoryTeller\\_bmad-output\\analysis\\product-brief-StoryTeller-2025-12-18\\index.md"
  - "D:\\Documents\\Bonsai\\StoryTeller\\_bmad-output\\analysis\\brainstorming-session-2025-12-17\\index.md"
  - "D:\\Documents\\Bonsai\\StoryTeller\\_bmad-output\\analysis\\research\\domain-self-publishing-ecosystem-research-2025-12-18\\index.md"
  - "D:\\Documents\\Bonsai\\StoryTeller\\_bmad-output\\analysis\\research\\market-ai-writing-tools-research-2025-12-18\\index.md"
  - "D:\\Documents\\Bonsai\\StoryTeller\\_bmad-output\\analysis\\research\\technical-implementation-technologies-research-2025-12-18\\index.md"
---

# StoryTeller - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for StoryTeller, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Total: 222 Functional Requirements**

#### Project Setup & Configuration (FR1-FR13)
- FR1: Users can create new novel projects through a guided setup wizard
- FR2: Users can open existing projects from a recent projects list
- FR3: Users can configure AI provider API keys (OpenAI, Claude, Gemini, Deepseek, Yandex, or custom providers)
- FR4: Users can switch or add API keys when current provider reaches limits or is unavailable
- FR5: Users can select genre and subgenre using multiselect options (Thriller, Romance, Fantasy, Sci-Fi, Mystery, Horror)
- FR6: Users can define target audience and tone for their novel
- FR7: Users can select point of view (First Person, Third Person Limited, Third Person Omniscient, Multiple POV)
- FR8: Users can choose story framework (3-Act, 5-Act, Hero's Journey, Snowflake Method)
- FR9: Users can configure chapter count and target word length per chapter
- FR10: Users can input high-level plot premise
- FR11: Users can configure author name or pen name, novel title, and tagline
- FR12: Users can select language from dropdown options
- FR13: Users can start projects from genre-specific templates with pre-configured settings

#### AI-Powered Story Development (FR14-FR21)
- FR14: Users can generate supporting characters and subplots using AI with confirmation prompts
- FR15: Users can generate setting and worldbuilding details using AI with user editing capability
- FR16: Users can generate themes and stakes using AI with confirmation before proceeding
- FR17: Users can generate dialogue and scene preferences using AI
- FR18: Users can generate references and inspirations using AI
- FR19: Users can generate titles, taglines, and blurbs using AI
- FR20: Users can edit all AI-generated content before accepting
- FR21: Users can configure chapter image preferences (include/exclude toggle)

#### Story Bible Technology - Core Storage & Management (FR22-FR37, FR156-FR172, FR180-FR189)
- FR22: System maintains persistent knowledge base of characters, plots, world rules, and style preferences
- FR23: System identifies and retrieves relevant Story Bible entries based on current chapter context using semantic search
- FR24: System assembles relevant Story Bible context before each AI generation
- FR25: System validates AI-generated content against Story Bible rules before generation begins
- FR26: System detects potential contradictions in real-time during AI generation
- FR27: System validates generated content after generation for character consistency, plot continuity, world-building adherence, and emotional arc progression
- FR28: System reports detected contradictions to users with specific source references from Story Bible
- FR29: System detects recurring patterns in user's writing style across multiple chapters
- FR30: Users can review AI-suggested style rules derived from detected patterns
- FR31: Users can confirm or reject AI-suggested style rules with one action
- FR32: System understands story framework structure and tracks current chapter position in narrative arc
- FR33: System adjusts tone, pacing suggestions, and plot progression guidance based on story position
- FR34: Users can manually add entries to Story Bible (characters, world rules, style preferences)
- FR35: Users can edit existing Story Bible entries
- FR36: Users can delete Story Bible entries
- FR37: System automatically extracts character names and traits from user-written chapters to suggest Story Bible entries
- FR156: System stores Story Bible data as integral part of project file structure
- FR157: System ensures Story Bible integrity through validation on project load
- FR158: System displays contradiction reports in dedicated validation panel with source Story Bible entry references
- FR159: System limits real-time contradiction alerts to critical issues (user can view full report separately)
- FR160: Users can cancel AI generation in progress without losing already-generated content
- FR161: Users can preview partially generated content during long-running AI operations
- FR162: System warns users before regeneration overwrites existing user-edited content
- FR163: System preserves user edits when regenerating by offering merge options (keep edits, replace all, or selective merge)
- FR164: System allows users to configure validation intensity (fast mode with pre/post only, or comprehensive mode with all three layers)
- FR165: System automatically synchronizes character profile changes to Story Bible entries
- FR166: System optionally includes Story Bible summary in export file metadata for reference
- FR167: Users can import external notes/documents into Story Bible as reference material
- FR168: System suggests Story Bible updates when detecting character/world changes in manual edits
- FR169: System triggers auto-save when Story Bible entries are created, modified, or deleted
- FR170: System supports beta user identification mode with enhanced telemetry and feedback channels
- FR171: System shows users which Story Bible entries are included in context assembly for transparency
- FR172: Users can manually select specific Story Bible entries to include/exclude from AI generation context
- FR180: System organizes Story Bible entries by categories (Characters, Settings, Rules, Themes, Plot Points)
- FR181: System uses category-aware context assembly (always includes certain categories, searches others)
- FR182: System never logs or exposes API keys in diagnostic logs, error messages, or telemetry
- FR183: System allows users to remove/revoke stored API keys
- FR184: System caches Story Bible search results during writing session to optimize repeated queries
- FR185: System uses text virtualization for rich text editor to maintain performance with large manuscripts
- FR186: System batches multiple rapid changes into single auto-save operation to reduce disk I/O
- FR187: Users can link character profiles to plot threads they participate in
- FR188: Users can mark Story Bible entries as favorites for quick access
- FR189: System presents AI-generated content in preview mode requiring explicit user approval before inserting into manuscript

#### Writing Workspace - Editing & Content Creation (FR38-FR52, FR210-FR211, FR220)
- FR38: Users can write and edit chapters in a rich text editor environment
- FR39: Users can generate full chapters (5,000-8,000 words) using AI with Story Bible context
- FR40: Users can provide guidance when regenerating content (e.g., "make it darker", "add more tension")
- FR41: Users can regenerate any AI-generated content with completely different approach
- FR42: Users can manually edit any content (AI-generated or user-written)
- FR43: System displays current word count for each chapter
- FR44: System validates whether chapter meets configured target word length
- FR45: System notifies users when chapter word count falls below or exceeds target thresholds
- FR46: System displays real-time progress indicator during AI chapter generation (percentage complete, estimated time remaining)
- FR47: System auto-generates and maintains table of contents based on chapters
- FR48: System auto-saves project every 30 seconds
- FR49: Users can save project manually using keyboard shortcut
- FR50: Users can undo editing actions in rich text editor
- FR51: Users can redo editing actions in rich text editor
- FR52: System recovers unsaved work after unexpected application crash
- FR210: System validates rich text formatting preservation on save/load operations
- FR211: System supports full Unicode character set for international writing
- FR220: System uses genre, framework, and previous chapter summaries as seed context when current chapter is empty

#### Writing Workspace - Chapter Management & Progress (FR153-FR155, FR206-FR207)
- FR153: Users can create named snapshots of individual chapters before major changes
- FR154: Users can view and restore from chapter snapshots
- FR155: Users can compare two chapter versions side-by-side
- FR206: Users can view chapters in visual card/grid layout for reorganization
- FR207: Users can drag-and-drop to reorder chapters

#### Organization & Character Management (FR53-FR59)
- FR53: Users can create and manage character profiles with traits, relationships, and backstory
- FR54: System tracks which chapters each character appears in
- FR55: Users can view character dashboard showing all characters and their information
- FR56: Users can view visual map of character relationships
- FR57: Users can track plot threads with basic status information
- FR58: Users can manage project metadata (genre, tone, framework, etc.)
- FR59: Users can view list of recent projects on home screen

#### Multi-AI Provider Support (FR60-FR68)
- FR60: System supports multiple AI providers through API key configuration
- FR61: Users can switch between AI models when one reaches limits
- FR62: System provides clear error messages distinguishing between connection failures and AI provider unavailability
- FR63: System automatically switches to alternate configured AI provider when primary provider fails
- FR64: System handles API failures gracefully with user notification and retry options
- FR65: Users can add or change API keys during active project
- FR66: System stores API keys securely in OS credential manager (Windows Credential Manager, macOS Keychain, Linux libsecret)
- FR67: System manages context window limits by intelligently pruning less relevant Story Bible entries when approaching token limits
- FR68: System logs AI generation decisions and validation results for quality assurance and troubleshooting

#### Professional Export - Core Capabilities (FR69-FR82, FR209)
- FR69: Users can export novel to PDF format with custom formatting settings
- FR70: Users can export novel to EPUB format meeting Amazon Kindle standards
- FR71: Users can export novel to DOCX format for Word compatibility
- FR72: Users can preview formatted output before initiating export
- FR73: Users can configure custom margins, fonts, backgrounds, and spacing for exports
- FR74: System generates title pages with author information in exports
- FR75: System includes automatic page numbering in PDF exports
- FR76: System generates responsive table of contents in all export formats
- FR77: System ensures PDF exports meet Amazon KDP specifications
- FR78: System ensures PDF exports meet IngramSpark specifications
- FR79: System ensures EPUB exports are EPUB3 standard compliant
- FR80: Users can initiate export using keyboard shortcut
- FR81: System handles export failures gracefully with clear error messages and recovery options
- FR82: System provides progress indicator during export generation for large manuscripts
- FR209: Users can export sample chapters with formatting preview for sharing/marketing purposes

#### Professional Export - Quality & Standards (FR190-FR194, FR212-FR214)
- FR190: System validates export readiness (checks for incomplete chapters, placeholder text, validation errors)
- FR191: System provides export readiness report with checklist before export
- FR192: System pauses AI generation gracefully when API authentication fails and allows user to update credentials
- FR193: System explicitly operates in local-only mode with no cloud synchronization (intentional constraint)
- FR194: Users can undo Story Bible changes (delete, edit) with undo/redo capability
- FR212: System validates generated export files against format specifications before presenting to user
- FR213: System handles export timeouts gracefully with partial progress save and resume capability
- FR214: System handles API rate limiting with intelligent retry and user notification

#### Data Management & Storage (FR83-FR94, FR141-FR152, FR218-FR219)
- FR83: System stores all project data locally on user's computer
- FR84: System saves projects to default location (~/Documents/StoryTeller/Projects/)
- FR85: Users can choose custom project storage location
- FR86: System uses custom .storyteller file extension for project files
- FR87: System associates .storyteller files with the application
- FR88: Users can open .storyteller files by double-clicking in file explorer
- FR89: System prevents data loss through incremental auto-save (saves only changed data)
- FR90: System prevents data loss through crash recovery with automatic work restoration
- FR91: System stores user settings and preferences in OS-specific userData directory
- FR92: System maintains project metadata for recent projects list
- FR93: System manages memory efficiently when multiple large projects are open
- FR94: System provides diagnostic mode for troubleshooting data corruption or project loading issues
- FR141: Users can export Story Bible as standalone JSON/XML file for backup or migration
- FR142: System prevents file corruption by locking project files when open (prevents multiple instances editing same project)
- FR143: System provides clear error messages with actionable next steps for all failure scenarios
- FR144: System detects low disk space before operations that require significant storage (exports, saves)
- FR145: System allows users to report AI generation quality issues with context for improvement
- FR146: System prompts user to save before quitting if unsaved changes exist
- FR147: Users can apply Story Bible changes retroactively to previously written chapters
- FR148: Users can customize AI validation rules (enable/disable specific contradiction checks)
- FR149: Users can permanently dismiss specific types of AI suggestions
- FR150: Users can disable AI features entirely and use StoryTeller as writing/organization tool only
- FR151: System tracks contradiction detection statistics (detected, confirmed, false positives) for quality measurement
- FR152: Users can export validation reports showing AI performance metrics for their projects
- FR218: System detects external project file deletion and prompts user to save to new location
- FR219: System handles mid-operation disk space exhaustion with graceful failure and state preservation

#### Cross-Platform Desktop Application (FR95-FR101)
- FR95: Application runs on Windows 10/11
- FR96: Application runs on macOS 11+ (Intel and Apple Silicon)
- FR97: Application runs on Linux (Ubuntu, Fedora, Arch distributions)
- FR98: Application respects platform-specific UI conventions (Windows Fluent, macOS Aqua, Linux themes)
- FR99: System registers custom file type associations on all platforms
- FR100: System integrates with OS file dialogs for open/save operations
- FR101: System appears in OS recent files list

#### Auto-Update & Distribution (FR102-FR108)
- FR102: System checks for application updates automatically on launch
- FR103: System downloads updates in background without interrupting user work
- FR104: Users receive non-intrusive notification when update is ready
- FR105: Users can choose when to install updates (respects creative workflow)
- FR106: System flags critical security updates as "recommended now" with explanation
- FR107: System keeps previous version locally for emergency rollback
- FR108: Users can manually rollback to previous version if update causes issues

#### Offline Capability (FR109-FR115)
- FR109: Users can write and edit content without internet connection
- FR110: Users can access character profiles and organization tools offline
- FR111: Users can generate PDF/EPUB/DOCX exports offline
- FR112: System clearly indicates when offline (AI features unavailable)
- FR113: System displays informative message when AI features require connection
- FR114: System automatically re-enables AI features when connection restored
- FR115: System distinguishes between "no internet" and "AI provider unavailable" errors in user messaging

#### User Experience & Interface (FR116-FR125, FR195-FR197)
- FR116: System provides dynamic theming with genre-appropriate color schemes (warm tones for romance, dark tones for thriller, etc.)
- FR117: Users can toggle dark mode for long writing sessions
- FR118: Users can create new project using keyboard shortcut (Ctrl+N / ⌘+N)
- FR119: Users can save project using keyboard shortcut (Ctrl+S / ⌘+S)
- FR120: Users can export using keyboard shortcut (Ctrl+E / ⌘+E)
- FR121: Users can generate chapter using keyboard shortcut (Ctrl+G / ⌘+G)
- FR122: Users can access settings using keyboard shortcut (Ctrl+, / ⌘+,)
- FR123: System provides contextual tooltips for first-time users on key features
- FR124: System provides help button access to documentation throughout interface
- FR125: System provides smooth transitions between views at 60 frames per second
- FR195: Users can enable focus mode that hides all UI except editor
- FR196: Users can view high-level story structure visualization (chapters, arcs, completion status)
- FR197: Users can filter Story Bible entries by category, character, or custom tags

#### Installation & First-Run (FR126-FR132)
- FR126: Users can install application through platform-specific installers (NSIS/Squirrel for Windows, DMG for macOS, AppImage/.deb/.rpm for Linux)
- FR127: System provides optional welcome wizard on first run
- FR128: System provides optional demo project showing features
- FR129: Users can skip API key setup during first run and add later
- FR130: Users can confirm or customize default project location during setup
- FR131: System requests user consent for optional anonymous usage analytics during first run
- FR132: System tracks onboarding completion metrics (which steps completed, where users drop off)

#### Beta Program & Quality Management (FR133-FR137, FR208)
- FR133: Users can provide feedback through in-app feedback mechanism
- FR134: System tracks beta program participation and usage metrics for program validation
- FR135: System prevents Story Bible editing during active AI generation to avoid conflicts
- FR136: Users can skip optional wizard steps and complete them later
- FR137: System provides demo mode with simulated AI responses for testing without API costs
- FR208: System supports A/B testing of different validation algorithms for quality optimization during beta

#### Accessibility & Internationalization (FR138-FR140)
- FR138: System supports multiple UI languages for interface (separate from document output language)
- FR139: System provides keyboard navigation for all features without requiring mouse
- FR140: System supports screen reader accessibility for visually impaired users

#### Story Bible Technology - Onboarding & Enhancement (FR173-FR179, FR198-FR199, FR217)
- FR173: System provides guided Story Bible setup with prompts for essential entries (main characters, setting, rules)
- FR174: System offers genre-specific Story Bible templates (romance, thriller, fantasy) to accelerate setup
- FR175: Users can access system diagnostic logs for troubleshooting
- FR176: System automatically manages log file size and rotation to prevent excessive disk usage
- FR177: System notifies users when Story Bible edits are blocked due to active AI generation with estimated completion time
- FR178: System handles empty Story Bible gracefully by generating without validation (first-time user scenario)
- FR179: System notifies users when Story Bible context assembly finds insufficient relevant entries
- FR198: System suggests related Story Bible entries when users create new entries (e.g., creating villain suggests hero relationships)
- FR199: System suggests chapter topics based on unresolved plot threads in Story Bible
- FR217: System provides interactive tutorial demonstrating Story Bible value with real examples

#### Productivity & Motivation (FR200-FR205)
- FR200: System tracks writing milestones and displays progress achievements (first chapter, 10K words, etc.)
- FR201: Users can define chapter objectives and track completion status
- FR202: System tracks productivity metrics (words written per session, time spent, chapters completed)
- FR203: Users can export productivity reports for personal tracking
- FR204: Users can manually flag AI-generated content as containing contradictions for quality improvement
- FR205: System learns from user contradiction flags to improve validation accuracy

#### Performance & Optimization (FR215-FR216)
- FR215: System warns users when Story Bible exceeds recommended size thresholds for performance
- FR216: System monitors memory usage and prompts user to restart after extended sessions if needed

#### Story Bible Technology - Validation & Intelligence (FR221-FR222)
- FR221: System treats Story Bible as source of truth and highlights existing manuscript contradictions against Story Bible
- FR222: Users can choose to update Story Bible or manuscript when contradictions detected between them

### NonFunctional Requirements

**Total: 200 Non-Functional Requirements**

#### Performance (NFR-P1 to NFR-P21)
- NFR-P1 [P0]: User interface interactions (clicks, typing, navigation) respond within 150 milliseconds
- NFR-P2 [P0]: Application cold start completes within 3 seconds from launch to interactive state
- NFR-P3 [P0]: Project load time does not exceed 2 seconds for manuscripts up to 150,000 words
- NFR-P4 [P0]: Auto-save operations complete without perceptible delay or typing interruption (<50ms latency)
- NFR-P5 [P0]: Full chapter generation (5,000-8,000 words) with Story Bible validation completes within 7 minutes end-to-end
- NFR-P6 [P0]: Story Bible context assembly completes within 10 seconds before AI generation begins
- NFR-P7 [P0]: Real-time contradiction detection does not add more than 15% latency to AI generation time
- NFR-P8 [P0]: PDF/EPUB/DOCX export generation completes within 60 seconds for manuscripts up to 150,000 words
- NFR-P9 [P1]: Export preview generation completes within 10 seconds
- NFR-P10 [P0]: Rich text editor maintains 60 FPS during typing and scrolling for documents up to 10,000 words per chapter
- NFR-P11 [P0]: Rich text editor maintains responsive editing performance (30+ FPS) for chapters of any size through appropriate technical optimization
- NFR-P12 [P0]: Real-time validation adds maximum 45 seconds to baseline generation time (15% overhead explicit)
- NFR-P13 [P1]: Application uses <5% CPU and <200MB RAM when minimized or in background state
- NFR-P14 [P1]: Background operations (auto-save, update downloads) do not exceed 10% CPU usage
- NFR-P15 [P1]: Project switching (close current, open different) completes within 3 seconds
- NFR-P16 [P1]: Chapter generation time variance does not exceed ±30% for similar chapter lengths with same Story Bible context
- NFR-P17 [P0]: Performance degrades gracefully with specific thresholds: 60 FPS for <10K words, 30+ FPS for 10K-50K words
- NFR-P18 [P1]: AI generation supports progressive streaming for improved perceived performance
- NFR-P19 [P0]: Story Bible semantic search completes within 10 seconds (cold start) or 2 seconds (warm cache) for Story Bibles up to 1,000 entries
- NFR-P20 [P0]: Story Bible keyword search completes within 500 milliseconds for instant filtering
- NFR-P21 [P1]: Story Bible index rebuild completes within 30 seconds when user adds up to 50 entries at once

#### Reliability (NFR-R2 to NFR-R17)
- NFR-R2 [P0]: Auto-save system successfully persists changes with 99.99% reliability
- NFR-R4 [P0]: Crash recovery successfully restores unsaved work in 95%+ of crash scenarios
- NFR-R5 [P0]: Application crash rate target is <1 crash per 100 hours of active use
- NFR-R6 [P0]: Memory leaks do not cause application instability during writing sessions up to 8 hours
- NFR-R7 [P0]: Application handles graceful degradation when AI services unavailable
- NFR-R8 [P0]: Application handles AI API failures without data loss or manuscript corruption
- NFR-R9 [P1]: API retry logic succeeds in 80%+ of transient failure scenarios
- NFR-R10 [P0]: Fallback to alternate AI provider occurs automatically within 5 seconds of primary provider failure
- NFR-R11 [P0]: System achieves 99.99% data recovery success rate across all failure scenarios
- NFR-R12 [P1]: Application handles OS memory exhaustion gracefully
- NFR-R13 [P0]: Application detects insufficient disk space before save operations and prompts user
- NFR-R14 [P1]: Application handles file system permission changes gracefully with clear error messaging
- NFR-R15 [P1]: Application provides specific guidance when antivirus software interferes with file operations
- NFR-R16 [P2]: Application handles system clock changes gracefully
- NFR-R17 [P0]: Application supports one concurrent long-running operation while allowing editing

#### Security (NFR-S1 to NFR-S19)
- NFR-S1 [P0]: All user manuscripts and Story Bible data stored locally with OS-level file permissions
- NFR-S2 [P0]: API keys encrypted at rest using OS-provided secure storage
- NFR-S3 [P0]: API keys never logged in diagnostic logs, error messages, or telemetry data
- NFR-S4 [P0]: Application never transmits user manuscript content to any server except configured AI providers
- NFR-S5 [P0]: Local storage complies with OS security model
- NFR-S6 [P0]: API keys transmitted to AI providers only over HTTPS/TLS 1.2+
- NFR-S7 [P0]: No user authentication system required (local-only application)
- NFR-S8 [P0]: Project files protected from concurrent access (file locking)
- NFR-S9 [P0]: Optional telemetry is opt-in only, never enabled by default
- NFR-S10 [P0]: Telemetry data is anonymous and contains no manuscript content or user-identifiable information
- NFR-S11 [P0]: Application clearly communicates data transmission
- NFR-S12 [P0]: System transmits only necessary Story Bible context excerpts to AI providers
- NFR-S13 [P1]: System supports API key rotation without project reconfiguration
- NFR-S14 [P1]: System clears API keys from application memory within 1 second of completing AI operation
- NFR-S16 [P0]: Application threat model explicitly excludes OS-level privilege escalation attacks
- NFR-S17 [P0]: Application validates SSL/TLS certificates and rejects connections with invalid certificates
- NFR-S18 [P1]: Application provides user warnings when connecting to AI providers over potentially insecure networks
- NFR-S19 [P1]: Telemetry data upload does not exceed 1MB per session

#### Usability (NFR-U1 to NFR-U23)
- NFR-U1 [P0]: First-time users complete project setup wizard without external documentation in 80%+ of cases
- NFR-U2 [P0]: Onboarding tutorial completion rate exceeds 70%
- NFR-U3 [P1]: Story Bible value demonstration tutorial completes within 5 minutes
- NFR-U4 [P1]: Experienced users complete common tasks within 3 actions
- NFR-U5 [P0]: All core features accessible via keyboard shortcuts for power users
- NFR-U6 [P0]: Navigation between major sections completes within 2 clicks
- NFR-U7 [P0]: System provides clear confirmation prompts before destructive actions
- NFR-U8 [P0]: All error messages include specific problem description and actionable next steps
- NFR-U9 [P0]: Undo/redo functionality available for all user editing actions within current session
- NFR-U10 [P1]: Application supports full keyboard navigation without requiring mouse input
- NFR-U11 [P1]: Application provides screen reader compatibility for visually impaired users
- NFR-U12 [P1]: User interface maintains minimum 4.5:1 contrast ratio per WCAG 2.1 Level AA guidelines
- NFR-U13 [P1]: Interactive elements maintain minimum touch target size of 44x44 pixels
- NFR-U14 [P0]: Wizard provides contextual help for each step accessible within 1 click
- NFR-U15 [P1]: Undo/redo history maintains minimum 100 actions per session
- NFR-U16 [P0]: System provides visual progress indicators for all operations exceeding 3 seconds duration
- NFR-U17 [P0]: System clearly distinguishes between "processing" states and true application freeze conditions
- NFR-U18 [P1]: Features requiring drag-and-drop provide keyboard-accessible alternatives
- NFR-U19 [P1]: Focus mode disables background operations to maximize available system resources
- NFR-U21 [P1]: Application restores previous session state within 2 seconds of launch
- NFR-U22 [P1]: Application preserves editing context across save/close/reopen cycles with 100% fidelity
- NFR-U23 [P1]: Application provides clear visual feedback during save operations

#### Compatibility (NFR-C1 to NFR-C25)
- NFR-C1 [P0]: Feature parity maintained across Windows, macOS, and Linux platforms
- NFR-C2 [P0]: Project files created on any platform open correctly on all other platforms with 100% fidelity
- NFR-C3 [P0]: Application follows platform-specific UI conventions while maintaining consistent core workflow
- NFR-C4 [P0]: Generated PDF files pass Amazon KDP validation with 100% success rate
- NFR-C5 [P0]: Generated PDF files pass IngramSpark validation with 100% success rate
- NFR-C6 [P0]: Generated EPUB files validate against EPUB3 specification with zero errors
- NFR-C7 [P0]: Generated DOCX files open correctly in Microsoft Word 2016+ and Google Docs
- NFR-C8 [P0]: Application supports OpenAI, Anthropic Claude, Google Gemini, and Deepseek APIs
- NFR-C9 [P1]: New AI provider integration possible through configuration
- NFR-C10 [P0]: Context window management adapts to different provider token limits (4K to 200K+ tokens)
- NFR-C11 [P0]: Application functions on Windows 10, Windows 11
- NFR-C12 [P0]: Application functions on macOS 11 (Big Sur) through macOS 14+
- NFR-C13 [P0]: Application functions on Ubuntu 20.04+, Fedora 35+, and Arch Linux
- NFR-C14 [P0]: Application supports both Intel and Apple Silicon architectures on macOS
- NFR-C15 [P0]: Application functions on hardware meeting minimum specifications: 4GB RAM, dual-core 2.0GHz processor, 1GB disk
- NFR-C16 [P0]: Application supports manuscripts up to 200,000 words with defined performance characteristics
- NFR-C17 [P0]: Application provides clear warnings when project size approaches supported limits
- NFR-C18 [P0]: Performance NFRs assume typical hardware and may vary ±20% on edge configurations
- NFR-C19 [P1]: Exported files do not exceed 50MB for manuscripts up to 200,000 words
- NFR-C20 [P1]: Export validation layer detects and corrects 95%+ of format compliance issues automatically
- NFR-C22 [P0]: AI provider integrations tolerate API version changes through flexible parsing
- NFR-C23 [P0]: Offline mode supports unlimited duration
- NFR-C24 [P0]: Application specifies vector embedding model for Story Bible semantic search
- NFR-C25 [P1]: Project list loads within 2 seconds when user has up to 100 projects

#### Maintainability (NFR-M1 to NFR-M16)
- NFR-M1 [P1]: Codebase maintains automated test coverage of 70%+ for core Story Bible and validation logic
- NFR-M2 [P1]: Diagnostic logging captures sufficient detail to enable troubleshooting
- NFR-M3 [P1]: Application architecture supports adding new AI providers within 2 developer-days
- NFR-M4 [P0]: Application updates install without requiring manual uninstall of previous version
- NFR-M5 [P1]: Update rollback completes within 2 minutes and restores full functionality
- NFR-M6 [P1]: Delta updates reduce download size by 60%+ compared to full download
- NFR-M7 [P0]: Installation completes within 5 minutes on standard hardware
- NFR-M8 [P0]: Application requires maximum 500MB disk space for installation
- NFR-M9 [P1]: Uninstallation removes 100% of application files
- NFR-M10 [P1]: Critical path operations maintain 90%+ automated test coverage
- NFR-M11 [P1]: Crash recovery logic maintains 95%+ test coverage
- NFR-M12 [P1]: Application maintains backward compatibility for project files from previous 2 major versions
- NFR-M13 [P0]: Version upgrades preserve 100% of user data
- NFR-M14 [P1]: Automated test suite executes in under 30 minutes
- NFR-M15 [P0]: Application includes embedded user documentation accessible offline
- NFR-M16 [P1]: Application optionally submits crash reports with user consent

#### Beta Validation & Measurement (NFR-Q1 to NFR-Q13)
- NFR-Q1 [P0]: Story Bible validation accuracy achieves <5% false negative rate and <10% false positive rate
- NFR-Q2 [P0]: System supports Story Bible entries up to 1,000 items without performance degradation beyond 20%
- NFR-Q3 [P0]: Beta program collects minimum 3,000 cumulative user-hours of telemetry data
- NFR-Q4 [P1]: Beta feedback mechanism categorizes issues within 24 hours of submission
- NFR-Q5 [P0]: Critical issues affecting data loss receive acknowledgment within 4 business hours
- NFR-Q6 [P0]: Beta program establishes baseline metrics for post-launch comparison
- NFR-Q7 [P0]: Data loss prevention validated through automated crash injection testing, beta telemetry, and code review
- NFR-Q8 [P0]: Beta program validates cross-platform compatibility through 40% Windows, 40% macOS, 20% Linux user representation
- NFR-Q9 [P0]: Beta program includes human review of minimum 500 AI-generated chapters to establish ground truth
- NFR-Q10 [P0]: Inter-rater reliability for human contradiction identification exceeds 80% agreement
- NFR-Q11 [P1]: System provides exportable usage statistics for marketing with user permission
- NFR-Q12 [P1]: Contradiction detection accuracy improves measurably during beta program
- NFR-Q13 [P0]: Beta program target support burden does not exceed 10 support tickets per beta user over 8-month period

### Additional Requirements

#### From Architecture Document

**1. Starter Template Requirement:**
- **CRITICAL**: Project MUST be initialized using **Tauri 2.0 + Svelte 5 + TypeScript + Rust** starter template
- Initialization command: `pnpm create tauri-app storyteller --template svelte-ts`
- This is Epic 1, Story 1 requirement

**2. Technology Stack Mandates:**
- **Desktop Framework:** Tauri 2.0 (not Electron)
- **Frontend Framework:** Svelte 5 with runes
- **Backend Language:** Rust 2021 edition
- **Database:** SQLite with rusqlite crate (bundled feature)
- **Vector Store:** Qdrant in embedded Rust mode (NOT ChromaDB)
- **Rich Text Editor:** ProseMirror 1.32+
- **Styling System:** Tailwind CSS 3.4+
- **State Management:** Svelte 5 Runes (no external library)

**3. UI Component Requirements:**
- Build 15-20 custom Svelte components following **Fluent Design Language**
- Do NOT use Fluent UI 2 React bridge (would add 300KB+ bundle and complexity)
- Components must use Fluent design tokens
- Timeline: 2-3 weeks initial development

**4. Export Pipeline Requirements:**
- **PDF Export:** Puppeteer sidecar (~120MB) for Vellum-quality typography
- **EPUB Export:** Custom Rust EPUB3 builder with EPUBCheck validation
- **DOCX Export:** Node.js sidecar with docx.js library (~30MB)
- All exports must meet professional publishing standards

**5. ML/NLP Requirements:**
- **Style Profile Analysis:** Rust-ONNX Runtime with sentence-transformers model
- Ship pre-trained models with app (~50MB)
- Required for StyleProfileService (literary user persona support)

**6. Infrastructure Requirements:**
- **Telemetry:** Sentry for beta phase ($29/mo), migrate to self-hosted post-launch
- **Auto-Update:** Tauri built-in updater with signature verification
- **Backup Strategy:** Multiple tiers (30s auto-save, 5min quick backup, session backup, daily backup, manual export)
- **Monitoring:** Crash reports, error rates, performance metrics, feature usage

**7. Security Requirements:**
- **API Key Storage:** OS keychain (Keychain Services on macOS, Credential Manager on Windows, Secret Service on Linux)
- **Fallback:** AES-256-GCM encrypted file with machine-specific key
- **IPC Security:** Tauri 2.0 capability system, configured in `src-tauri/capabilities/default.json`
- **No cloud sync:** Intentional local-only architecture

**8. Migration Requirements:**
- Database migrations using **refinery** crate
- Migrations stored in `src-tauri/migrations/`
- Format: `V{number}__{description}.sql`
- Must support rollback

**9. Testing Requirements:**
- **Frontend Testing:** Vitest (Vite-native)
- **Backend Testing:** Rust built-in testing (`cargo test`)
- **E2E Testing:** Playwright
- **Custom Framework:** Tauri command mock framework (2 weeks investment)
- **Quality Gates:** 90%+ Rust coverage, 85%+ Svelte coverage, 70%+ Tauri command coverage

**10. UX Services Requirements (Critical for Beta):**
- **OnboardingService:** Svelte wizard + Rust state management (<5 min time-to-first-chapter)
- **StyleProfileService:** ONNX inference + Svelte UI + SQLite storage (literary user voice matching)
- **KeyboardShortcutService:** Tauri global shortcuts + Svelte settings (power user productivity)
- Impact: Without these, 40-60% of target market will reject the product

**11. Performance Targets (Architecture-Specific):**
- Cold startup: <0.5 seconds (6x better than 3s NFR)
- Memory baseline: 30-40MB Tauri + 50MB ONNX = 90MB (82% headroom)
- Story Bible search: <100ms for 10K+ embeddings
- Final installed size: ~222MB total

**12. Deployment Requirements:**
- **Windows:** .msi installer via Tauri bundler
- **macOS:** .dmg with code signing (Apple Developer account required - $99/year)
- **Linux:** .deb and .appimage for broad compatibility
- **Sidecar Management:** Process lifecycle for Puppeteer + Node.js
- **Model Distribution:** Ship ONNX models with app

#### From UX Design Document

**13. Responsive Design Requirements:**
- **Desktop (1366px+):** Full three-column layout (sidebar + main + Story Bible panel)
- **Tablet (768px-1365px):** Two-column layout, Story Bible panel overlays
- **Touch Targets:** Minimum 44x44px for all interactive elements
- **Adaptive Typography:** Desktop full scale, Tablet 90%, proper readability hierarchy

**14. Accessibility Requirements:**
- **Screen Reader:** Semantic HTML, ARIA labels on all interactive elements, proper heading hierarchy
- **Keyboard Navigation:** Tab order follows visual flow, all actions keyboard-accessible, Escape closes modals
- **Visual Accessibility:** High contrast mode, scalable text to 200%, color-blind friendly, visible focus indicators
- **Motor Accessibility:** 44x44px click targets, no time-limited actions, undo for destructive actions
- **WCAG 2.1 Level AA Compliance:** 4.5:1 contrast ratio minimum

**15. Interaction Pattern Requirements:**
- **Hover States:** Buttons darken 10% + 2px shadow, Cards lift 4px with stronger shadow
- **Click/Tap Feedback:** Scale animations (98% for buttons, 99% for cards)
- **Focus States:** 2px blue outline on all interactive elements
- **Loading States:** Skeleton screens (not spinners), progress bars for long operations

**16. Micro-Interaction Requirements:**
- **Auto-Save Indicator:** "Saving..." → "Last saved X seconds ago" with animation
- **Word Count:** Animates on change, milestone celebrations, confetti at goal achievement
- **Chapter Completion:** Checkmark animation, toast notification, progress bar update
- **Story Bible Suggestion:** Slides in from right, gentle pulse, dismissible
- **AI Generation Progress:** Multi-stage with animated checks, dots, and preview slide-in
- **Validation Results:** Color-coded with animations (green checkmark bounce, amber shake, red pulse)

**17. Feedback Pattern Requirements:**
- **Immediate Feedback:** Typing <16ms, clicks <100ms, real-time validation
- **Progressive Feedback:** Multi-stage progress for AI generation and export
- **Confirmatory Feedback:** Toast notifications for actions with undo option
- **Error Feedback:** Specific, actionable, helpful, recoverable with undo/fix path

**18. Animation Requirements:**
- **60 FPS Target:** All transitions and animations must maintain 60 FPS
- **Smooth Transitions:** View changes, panel slides, modal appearances
- **Celebration Animations:** Milestone achievements, goal completions, streak tracking
- **Attention Animations:** Gentle pulses for suggestions, shakes for warnings

**19. Error Handling UX Requirements:**
- **Specific Error Messages:** "Marcus's eye color contradicts Chapter 3" (not generic "error occurred")
- **Actionable Options:** "Which is correct? [Blue] [Brown]"
- **Helpful Context:** "This will update your Story Bible"
- **Recovery Path:** Always provide undo or fix option

**20. Device Compatibility:**
- **Primary Focus:** Desktop application (Windows, macOS, Linux)
- **Touch Support:** Tablet-friendly for touch-enabled devices
- **Resolution Support:** 1366px+ optimal, 768px+ supported
- **Future Consideration:** Mobile responsive (single column) noted but not MVP

### FR Coverage Map

**Epic 1: Foundation - Project Initialization & Starter Template**
- Architecture Requirement #1: Tauri 2.0 + Svelte 5 + TypeScript + Rust starter template
- Architecture Requirement #2: Technology Stack (ProseMirror, Tailwind CSS, SQLite, Qdrant, etc.)
- Architecture Requirement #3: UI Components (15-20 custom Svelte components with Fluent Design)
- Architecture Requirement #8: Migration Requirements (refinery crate)
- Architecture Requirement #9: Testing Requirements (Vitest, Playwright, cargo test)

**Epic 2: Project Setup & Configuration Wizard**
- FR1: Create new novel projects through guided setup wizard
- FR2: Open existing projects from recent projects list
- FR5: Select genre and subgenre (multiselect)
- FR6: Define target audience and tone
- FR7: Select point of view
- FR8: Choose story framework
- FR9: Configure chapter count and word length
- FR10: Input high-level plot premise
- FR11: Configure author name/pen name, title, tagline
- FR12: Select language
- FR13: Start projects from genre-specific templates
- FR59: View list of recent projects on home screen
- FR126: Install through platform-specific installers
- FR127: Optional welcome wizard on first run
- FR128: Optional demo project
- FR129: Skip API key setup during first run
- FR130: Confirm/customize default project location
- FR131: Request consent for optional analytics
- FR132: Track onboarding completion metrics
- FR138: Support multiple UI languages

**Epic 3: Multi-AI Provider Integration**
- FR3: Configure AI provider API keys
- FR4: Switch/add API keys when limits reached
- FR60: Support multiple AI providers through API key configuration
- FR61: Switch between AI models
- FR62: Clear error messages for connection failures vs AI unavailability
- FR63: Auto-switch to alternate provider on failure
- FR64: Handle API failures gracefully
- FR65: Add/change API keys during active project
- FR66: Store API keys securely in OS credential manager
- FR67: Manage context window limits intelligently
- FR68: Log AI generation decisions for QA
- FR192: Pause AI generation on auth failure, allow credential update
- NFR-S2: API keys encrypted at rest using OS-provided secure storage
- NFR-S3: API keys never logged
- NFR-S6: API keys transmitted only over HTTPS/TLS 1.2+
- NFR-S13: Support API key rotation
- NFR-S14: Clear API keys from memory within 1 second
- NFR-S17: Validate SSL/TLS certificates
- NFR-S18: Warnings for insecure networks
- Architecture Requirement #7: Security (OS keychain integration)

**Epic 4: Story Bible - Core Storage & Management**
- FR22: Maintain persistent knowledge base
- FR34: Manually add Story Bible entries
- FR35: Edit existing Story Bible entries
- FR36: Delete Story Bible entries
- FR37: Auto-extract character names/traits from chapters
- FR53: Create/manage character profiles
- FR54: Track which chapters each character appears in
- FR55: View character dashboard
- FR56: View visual map of character relationships
- FR57: Track plot threads with status
- FR58: Manage project metadata
- FR156: Store Story Bible as integral part of project file
- FR157: Ensure Story Bible integrity on project load
- FR165: Auto-synchronize character profile changes to Story Bible
- FR169: Trigger auto-save when Story Bible entries change
- FR180: Organize Story Bible by categories
- FR181: Category-aware context assembly
- FR182: Never log/expose API keys in diagnostics
- FR183: Allow removal/revocation of stored API keys
- FR187: Link character profiles to plot threads
- FR188: Mark Story Bible entries as favorites
- FR194: Undo Story Bible changes
- FR197: Filter Story Bible by category/character/tags

**Epic 5: Rich Text Editor & Writing Workspace**
- FR38: Write/edit chapters in rich text editor
- FR42: Manually edit any content
- FR43: Display current word count per chapter
- FR44: Validate chapter meets target word length
- FR45: Notify when word count below/exceeds targets
- FR47: Auto-generate/maintain table of contents
- FR48: Auto-save every 30 seconds
- FR49: Manual save via keyboard shortcut
- FR50: Undo editing actions
- FR51: Redo editing actions
- FR52: Recover unsaved work after crash
- FR83: Store all project data locally
- FR84: Save to default location
- FR85: Choose custom storage location
- FR86: Use custom .storyteller file extension
- FR87: Associate .storyteller files with app
- FR88: Open .storyteller files by double-clicking
- FR89: Incremental auto-save
- FR90: Crash recovery with automatic restoration
- FR91: Store settings in OS-specific userData directory
- FR92: Maintain project metadata for recent list
- FR93: Manage memory efficiently
- FR94: Diagnostic mode for troubleshooting
- FR109: Write/edit without internet
- FR110: Access character profiles/tools offline
- FR116: Dynamic theming with genre-appropriate colors
- FR117: Toggle dark mode
- FR118: New project keyboard shortcut (Ctrl+N)
- FR119: Save keyboard shortcut (Ctrl+S)
- FR120: Export keyboard shortcut (Ctrl+E)
- FR121: Generate chapter keyboard shortcut (Ctrl+G)
- FR122: Settings keyboard shortcut (Ctrl+,)
- FR123: Contextual tooltips for first-time users
- FR124: Help button access throughout interface
- FR125: Smooth 60 FPS transitions
- FR141: Export Story Bible as JSON/XML
- FR142: File locking to prevent corruption
- FR143: Clear error messages with actionable steps
- FR144: Detect low disk space before operations
- FR145: Report AI generation quality issues
- FR146: Prompt to save before quitting
- FR153: Create named chapter snapshots
- FR154: View/restore from snapshots
- FR155: Compare two chapter versions side-by-side
- FR195: Focus mode hiding all UI except editor
- FR196: View story structure visualization
- FR206: View chapters in visual card/grid layout
- FR207: Drag-and-drop to reorder chapters
- FR210: Validate rich text formatting preservation
- FR211: Support full Unicode character set
- FR218: Detect external file deletion
- FR219: Handle mid-operation disk space exhaustion
- Architecture Requirement #2: ProseMirror editor library
- UX Requirement #13-19: Responsive design, accessibility, interaction patterns, micro-interactions, feedback, animations, error handling

**Epic 6: AI-Powered Story Development & Generation**
- FR14: Generate supporting characters/subplots with AI
- FR15: Generate setting/worldbuilding with AI
- FR16: Generate themes/stakes with AI
- FR17: Generate dialogue/scene preferences with AI
- FR18: Generate references/inspirations with AI
- FR19: Generate titles/taglines/blurbs with AI
- FR20: Edit all AI-generated content before accepting
- FR21: Configure chapter image preferences
- FR23: Identify/retrieve relevant Story Bible entries (semantic search)
- FR24: Assemble Story Bible context before generation
- FR29: Detect recurring patterns in writing style
- FR30: Review AI-suggested style rules
- FR31: Confirm/reject AI-suggested style rules
- FR32: Understand story framework structure
- FR33: Adjust tone/pacing based on story position
- FR39: Generate full chapters with Story Bible context
- FR40: Provide guidance when regenerating
- FR41: Regenerate with different approach
- FR46: Display real-time progress during generation
- FR158: Display contradiction reports in validation panel
- FR159: Limit real-time alerts to critical issues
- FR160: Cancel AI generation without losing content
- FR161: Preview partial content during generation
- FR162: Warn before regeneration overwrites edits
- FR163: Preserve user edits with merge options
- FR164: Configure validation intensity
- FR167: Import external notes into Story Bible
- FR168: Suggest Story Bible updates from manual edits
- FR170: Beta user identification mode
- FR171: Show which Story Bible entries included in context
- FR172: Manually select Story Bible entries for context
- FR184: Cache Story Bible search results
- FR185: Text virtualization for performance
- FR186: Batch rapid changes into single auto-save
- FR189: Present AI content in preview mode
- FR198: Suggest related Story Bible entries
- FR199: Suggest chapter topics from plot threads
- FR204: Manually flag contradictions
- FR205: Learn from user contradiction flags
- FR215: Warn when Story Bible exceeds size thresholds
- FR216: Monitor memory usage, prompt restart
- FR220: Use genre/framework as seed context
- FR221: Treat Story Bible as source of truth
- FR222: Choose to update Story Bible or manuscript

**Epic 7: Story Bible Intelligence - Validation & Contradiction Detection**
- FR25: Validate AI content against Story Bible before generation
- FR26: Detect contradictions in real-time during generation
- FR27: Validate after generation (character consistency, plot continuity, etc.)
- FR28: Report contradictions with source references
- FR68: Log AI decisions/validation results
- FR135: Prevent Story Bible editing during active generation
- FR148: Customize AI validation rules
- FR149: Permanently dismiss specific suggestion types
- FR150: Disable AI features entirely
- FR151: Track contradiction detection statistics
- FR152: Export validation reports
- FR173: Guided Story Bible setup
- FR174: Genre-specific Story Bible templates
- FR175: Access diagnostic logs
- FR176: Auto-manage log file size/rotation
- FR177: Notify when edits blocked during generation
- FR178: Handle empty Story Bible gracefully
- FR179: Notify when insufficient relevant entries
- FR208: A/B testing of validation algorithms
- FR217: Interactive tutorial demonstrating Story Bible value
- NFR-Q1: <5% false negative, <10% false positive validation
- NFR-Q2: Support 1,000 Story Bible items without 20%+ degradation
- NFR-Q9: Human review of 500+ AI chapters for ground truth
- NFR-Q10: 80%+ inter-rater reliability
- NFR-Q11: Exportable usage statistics
- NFR-Q12: Accuracy improves during beta

**Epic 8: Professional Export Pipeline**
- FR69: Export to PDF with custom formatting
- FR70: Export to EPUB (Amazon Kindle standards)
- FR71: Export to DOCX (Word compatibility)
- FR72: Preview formatted output before export
- FR73: Configure margins/fonts/backgrounds/spacing
- FR74: Generate title pages with author info
- FR75: Automatic page numbering in PDF
- FR76: Responsive table of contents in all formats
- FR77: PDF meets Amazon KDP specifications
- FR78: PDF meets IngramSpark specifications
- FR79: EPUB is EPUB3 compliant
- FR80: Export via keyboard shortcut
- FR81: Handle export failures gracefully
- FR82: Progress indicator during export
- FR111: Generate exports offline
- FR190: Validate export readiness
- FR191: Export readiness report
- FR193: Local-only mode (no cloud sync)
- FR209: Export sample chapters
- FR212: Validate generated files against specs
- FR213: Handle export timeouts gracefully
- FR214: Handle API rate limiting
- NFR-C4: PDF passes Amazon KDP validation 100%
- NFR-C5: PDF passes IngramSpark validation 100%
- NFR-C6: EPUB validates against EPUB3 with zero errors
- NFR-C7: DOCX opens in Word 2016+ and Google Docs
- NFR-C19: Files don't exceed 50MB for 200K words
- NFR-C20: Auto-correct 95%+ format compliance issues
- Architecture Requirement #4: Export Pipeline (Puppeteer sidecar, EPUB3 builder, docx.js)

**Epic 9: Productivity & Motivation Features**
- FR200: Track writing milestones/achievements
- FR201: Define/track chapter objectives
- FR202: Track productivity metrics
- FR203: Export productivity reports

**Epic 10: Cross-Platform Desktop Application & Auto-Update**
- FR95: Run on Windows 10/11
- FR96: Run on macOS 11+ (Intel and Apple Silicon)
- FR97: Run on Linux (Ubuntu, Fedora, Arch)
- FR98: Respect platform-specific UI conventions
- FR99: Register custom file type associations
- FR100: Integrate with OS file dialogs
- FR101: Appear in OS recent files list
- FR102: Auto-check for updates on launch
- FR103: Download updates in background
- FR104: Non-intrusive update notification
- FR105: Choose when to install updates
- FR106: Flag critical security updates
- FR107: Keep previous version for rollback
- FR108: Manual rollback to previous version
- NFR-C1: Feature parity across platforms
- NFR-C2: 100% fidelity opening files across platforms
- NFR-C3: Platform-specific UI conventions
- NFR-C11: Function on Windows 10/11
- NFR-C12: Function on macOS 11-14+
- NFR-C13: Function on Ubuntu 20.04+, Fedora 35+, Arch
- NFR-C14: Support Intel and Apple Silicon on macOS
- NFR-C15: Minimum specs: 4GB RAM, dual-core 2.0GHz, 1GB disk
- NFR-C18: Performance varies ±20% on edge configs
- NFR-C23: Offline mode unlimited duration
- NFR-C25: Project list loads in 2s for 100 projects
- NFR-M4: Updates install without manual uninstall
- NFR-M5: Rollback in 2 minutes
- NFR-M6: Delta updates 60%+ smaller
- NFR-M7: Installation in 5 minutes
- NFR-M8: Max 500MB disk space
- NFR-M9: Uninstall removes 100% of files
- NFR-M12: Backward compatibility for 2 major versions
- NFR-M13: Upgrades preserve 100% user data
- NFR-M15: Embedded offline documentation
- NFR-M16: Optional crash reports with consent
- Architecture Requirement #12: Deployment (platform installers, code signing, sidecar management)

**Epic 11: Accessibility & Internationalization**
- FR138: Support multiple UI languages
- FR139: Keyboard navigation for all features
- FR140: Screen reader accessibility
- NFR-U10: Full keyboard navigation
- NFR-U11: Screen reader compatibility
- NFR-U12: 4.5:1 contrast ratio (WCAG 2.1 AA)
- NFR-U13: 44x44px touch targets
- NFR-U18: Keyboard alternatives for drag-and-drop
- UX Requirement #14: Accessibility (semantic HTML, ARIA, high contrast, motor accessibility)

**Epic 12: Beta Program & Telemetry Infrastructure**
- FR131: Request consent for analytics (first run)
- FR133: In-app feedback mechanism
- FR134: Track beta participation/usage metrics
- FR136: Skip optional wizard steps
- FR137: Demo mode with simulated AI responses
- FR145: Report AI quality issues
- FR175: Access diagnostic logs
- FR176: Auto-manage log file size/rotation
- FR182: Never log/expose API keys
- NFR-S9: Telemetry opt-in only
- NFR-S10: Anonymous telemetry, no manuscript content
- NFR-S11: Clearly communicate data transmission
- NFR-S19: Telemetry <1MB per session
- NFR-Q3: Collect 3,000+ user-hours telemetry
- NFR-Q4: Categorize issues within 24 hours
- NFR-Q5: Acknowledge data loss issues within 4 hours
- NFR-Q6: Establish baseline metrics
- NFR-Q7: Validate data loss prevention
- NFR-Q8: 40% Windows, 40% macOS, 20% Linux representation
- NFR-Q13: <10 support tickets per beta user over 8 months
- Architecture Requirement #6: Telemetry (Sentry for beta)

**Performance NFRs (Cross-Epic):**
- All Performance NFRs (NFR-P1 to NFR-P21) apply across Epics 5, 6, 7, 8
- All Reliability NFRs (NFR-R2 to NFR-R17) apply across Epics 3, 5, 6, 7, 8
- All Security NFRs (NFR-S1 to NFR-S19) apply across Epics 3, 4, 5, 8, 12
- All Usability NFRs (NFR-U1 to NFR-U23) apply across Epics 2, 5, 6, 7, 8, 11
- All Compatibility NFRs (NFR-C8 to NFR-C10, NFR-C16, NFR-C17, NFR-C22, NFR-C24) apply across Epics 3, 6, 8
- All Maintainability NFRs (NFR-M1 to NFR-M3, NFR-M10, NFR-M11, NFR-M14) apply to Epic 1 and overall quality
- Architecture Requirements #5, #10, #11 apply across multiple epics

## Epic List

### Epic 1: Foundation - Project Initialization & Starter Template
Development team has a working Tauri 2.0 + Svelte 5 + TypeScript + Rust project scaffold with core architecture components ready for feature development.

**FRs covered:** Architecture Requirements #1-3, #8-9 (Starter Template, Technology Stack, UI Components, Migrations, Testing)

**Critical Notes:**
- **MUST BE FIRST:** Cannot implement any other epic without this foundation
- Initialize with: `pnpm create tauri-app storyteller --template svelte-ts`
- Setup includes: SQLite + rusqlite, Qdrant embedded, ProseMirror, Tailwind CSS, Vitest, Playwright
- Build 15-20 custom Svelte components with Fluent Design Language
- Configure refinery for database migrations
- Setup testing infrastructure

### Epic 2: Project Setup & Configuration Wizard
Authors can create new novel projects through a guided onboarding wizard, configuring genre, story framework, and all initial parameters. They can also open existing projects from a recent list.

**FRs covered:** FR1-FR2, FR5-FR13, FR59, FR126-FR132, FR138

**User Value:**
- First-time users can get started in <5 minutes (NFR-U1, NFR-U2)
- Wizard guides through essential configuration
- Optional demo project shows features
- Can skip API setup and add later

### Epic 3: Multi-AI Provider Integration
Authors can securely connect to multiple AI providers (OpenAI, Claude, Gemini, Deepseek, Yandex, custom), switch between them when needed, and have their API keys stored securely in OS credential storage.

**FRs covered:** FR3-FR4, FR60-FR68, FR192, NFR-S2-S3, NFR-S6, NFR-S13-S14, NFR-S17-S18, Architecture Req #7

**User Value:**
- Never locked into single AI provider
- Automatic failover if provider unavailable
- Secure credential storage (OS keychain)
- Clear error messages for troubleshooting

### Epic 4: Story Bible - Core Storage & Management
Authors can create and manage their Story Bible—a persistent knowledge base of characters, settings, world rules, themes, and plot threads—organizing everything in one place with categories and favorites.

**FRs covered:** FR22, FR34-FR37, FR53-FR59, FR156-FR157, FR165, FR169, FR180-FR183, FR187-FR188, FR194, FR197

**User Value:**
- Centralized story knowledge management
- Character profiles with relationship mapping
- Plot thread tracking
- Category organization for easy navigation
- Foundation for AI consistency features

### Epic 5: Rich Text Editor & Writing Workspace
Authors can write and edit novel chapters in a professional rich text editor with auto-save, undo/redo, word count tracking, table of contents generation, and offline capability.

**FRs covered:** FR38, FR42-FR52, FR83-FR94, FR109-FR110, FR116-FR125, FR141-FR146, FR153-FR155, FR195-FR196, FR206-FR207, FR210-FR211, FR218-FR219, Architecture Req #2, UX Req #13-19

**User Value:**
- Professional writing environment
- Never lose work (auto-save, crash recovery)
- Work offline without limitations
- Dark mode for long sessions
- Chapter snapshots and version comparison
- 60 FPS smooth performance

### Epic 6: AI-Powered Story Development & Generation
Authors can use AI to generate supporting characters, settings, themes, dialogue preferences, and full chapters (5,000-8,000 words), with all content assembled using relevant Story Bible context for consistency.

**FRs covered:** FR14-FR21, FR23-FR24, FR29-FR33, FR39-FR41, FR46, FR67, FR158-FR164, FR167-FR168, FR170-FR172, FR184-FR186, FR189, FR198-FR199, FR204-FR205, FR215-FR216, FR220-FR222

**User Value:**
- AI generates content that fits their story world
- Story Bible context ensures consistency
- Progressive streaming shows progress
- Can regenerate with different approaches
- Style profile matching for literary users
- Preview before accepting content

### Epic 7: Story Bible Intelligence - Validation & Contradiction Detection
Authors receive real-time validation that AI-generated content is consistent with their Story Bible, with contradiction detection before, during, and after generation, plus guided setup and templates.

**FRs covered:** FR25-FR28, FR68, FR135, FR148-FR152, FR173-FR179, FR208, FR217, NFR-Q1-Q2, NFR-Q9-Q12

**User Value:**
- <5% false negative, <10% false positive validation
- Catches character inconsistencies automatically
- Reports specific contradictions with sources
- Guided Story Bible setup reduces learning curve
- Genre-specific templates accelerate setup
- Interactive tutorial demonstrates value

### Epic 8: Professional Export Pipeline
Authors can export publication-ready novels in PDF (Amazon KDP/IngramSpark compliant), EPUB (EPUB3 standard), and DOCX (Word-compatible) formats with custom formatting, meeting professional publishing standards.

**FRs covered:** FR69-FR82, FR111, FR190-FR193, FR209, FR212-FR214, NFR-C4-C7, NFR-C19-C20, Architecture Req #4

**User Value:**
- Vellum-quality PDF typography
- 100% pass rate on KDP and IngramSpark validation
- EPUB3 compliant for all retailers
- Word-compatible DOCX for editors
- Custom formatting (margins, fonts, spacing)
- Export readiness validation
- Works offline

### Epic 9: Productivity & Motivation Features
Authors stay motivated and track their writing journey with milestone achievements, chapter objectives, productivity metrics, and exportable progress reports.

**FRs covered:** FR200-FR203

**User Value:**
- Celebrate milestones (first chapter, 10K words, etc.)
- Track words per session, time spent
- Define and track chapter objectives
- Export productivity reports for accountability

### Epic 10: Cross-Platform Desktop Application & Auto-Update
Authors can install and use StoryTeller seamlessly across Windows, macOS (Intel & Apple Silicon), and Linux, with automatic background updates and easy rollback if needed.

**FRs covered:** FR95-FR108, NFR-C1-C3, NFR-C11-C15, NFR-C18, NFR-C23, NFR-C25, NFR-M4-M9, NFR-M12-M13, NFR-M15-M16, Architecture Req #12

**User Value:**
- Works on Windows 10/11, macOS 11+, Linux
- Platform-native UI conventions
- Projects open identically across platforms
- Background updates don't interrupt writing
- One-click rollback if issues occur
- Embedded offline documentation

### Epic 11: Accessibility & Internationalization
Authors with disabilities or who speak different languages can use StoryTeller effectively with screen reader support, full keyboard navigation, WCAG 2.1 AA compliance, and multi-language UI.

**FRs covered:** FR138-FR140, NFR-U10-U13, NFR-U18, UX Req #14

**User Value:**
- Screen reader compatible for visually impaired
- Complete keyboard navigation (no mouse required)
- 4.5:1 contrast ratio for readability
- 44x44px touch targets for motor accessibility
- Multi-language UI support
- High contrast mode

### Epic 12: Beta Program & Telemetry Infrastructure
Product team can collect opt-in anonymous feedback, track quality metrics, validate data loss prevention, and improve the product based on real beta user usage across all platforms.

**FRs covered:** FR131, FR133-FR134, FR136-FR137, FR145, FR175-FR176, FR182, NFR-S9-S11, NFR-S19, NFR-Q3-Q8, NFR-Q13, Architecture Req #6

**User Value (for Product Team):**
- Data-driven product improvement
- 3,000+ user-hours of telemetry
- Cross-platform validation (40% Win, 40% Mac, 20% Linux)
- Human review of 500+ AI chapters for ground truth
- <10 support tickets per beta user target
- Privacy-first: opt-in, anonymous, no manuscript content

---

## Epic 1: Foundation - Project Initialization & Starter Template

Development team has a working Tauri 2.0 + Svelte 5 + TypeScript + Rust project scaffold with core architecture components ready for feature development.

### Story 1.1: Initialize Tauri + Svelte Project Scaffold [Tier 1]

As a development team,
I want to initialize the Tauri 2.0 + Svelte 5 + TypeScript + Rust project from the official starter template,
So that we have a working cross-platform desktop application foundation with proper build tooling.

**Acceptance Criteria:**

**Given** a clean development environment
**When** the team runs `pnpm create tauri-app storyteller --template svelte-ts`
**Then** the project initializes with Tauri 2.0, Svelte 5, TypeScript, and Rust configured
**And** `pnpm install` completes successfully
**And** `pnpm tauri dev` launches the app in development mode
**And** the app displays on Windows, macOS, and Linux
**And** Hot Module Replacement (HMR) works for Svelte components

**Given** the initialized project
**When** the team reviews the project structure
**Then** the following directories exist: `src/` (Svelte frontend), `src-tauri/` (Rust backend), `src-tauri/capabilities/` (Tauri 2.0 permission system)
**And** `package.json` includes scripts for dev, build, and test
**And** `tauri.conf.json` is configured with app metadata
**And** TypeScript strict mode is enabled in `tsconfig.json`

### Story 1.2: Configure SQLite Database with Migrations [Tier 1]

As a development team,
I want SQLite configured with rusqlite and refinery migration framework,
So that we have a reliable local database with version-controlled schema changes.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project is initialized
**When** the team adds `rusqlite` (with bundled feature) and `refinery` to `src-tauri/Cargo.toml`
**Then** dependencies compile successfully
**And** SQLite database file path is configured as `{app_data}/storyteller.db`

**Given** the refinery migration framework is added
**When** the team creates the migrations directory at `src-tauri/migrations/`
**Then** the directory structure follows the pattern: `V{number}__{description}.sql`
**And** a sample migration `V1__init_schema.sql` is created with a test table
**And** migration runs automatically on app startup via Rust code
**And** migrations are idempotent (can run multiple times safely)

**Given** the migration system is configured
**When** the app starts for the first time
**Then** the SQLite database is created at the correct path
**And** migrations run successfully
**And** migration status is logged to console
**And** migration errors are caught and logged with clear messages

### Story 1.3: Setup Qdrant Embedded Vector Store [Tier 1]

As a development team,
I want Qdrant vector database configured in embedded Rust mode,
So that we can perform semantic search on Story Bible entries without external dependencies.

**Acceptance Criteria:**

**Given** the Tauri project with SQLite configured
**When** the team adds `qdrant-client` crate to `src-tauri/Cargo.toml`
**Then** the dependency compiles successfully

**Given** Qdrant client is added
**When** the team configures Qdrant in embedded mode
**Then** Qdrant is initialized with in-memory storage for development
**And** Qdrant is initialized with persistent storage (`{app_data}/qdrant/`) for production
**And** a test collection "story_bible_test" is created on startup
**And** the collection uses 384-dimensional vectors (sentence-transformers compatible)

**Given** Qdrant is configured
**When** the app starts
**Then** Qdrant initialization completes within 2 seconds
**And** connection status is logged to console
**And** errors are caught and logged with actionable messages
**And** the app continues running even if Qdrant fails to initialize (graceful degradation)

**Given** Qdrant is running
**When** the team performs a test vector insertion and search
**Then** the operation completes successfully
**And** search results are returned in <100ms for small datasets

### Story 1.4: Configure Testing Infrastructure [Tier 1]

As a development team,
I want Vitest, Playwright, and Rust testing configured with sample tests,
So that we have a complete testing framework for frontend, E2E, and backend code.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project
**When** the team adds Vitest for frontend testing
**Then** `vitest` and `@vitest/ui` are added to `package.json`
**And** `vite.config.ts` is updated with Vitest configuration
**And** a sample component test exists at `src/lib/__tests__/App.test.ts`
**And** `pnpm test` runs all frontend tests
**And** tests run in watch mode during development

**Given** Vitest is configured
**When** the team adds Playwright for E2E testing
**Then** `@playwright/test` is added to `package.json`
**And** `playwright.config.ts` is created with Tauri-specific configuration
**And** a sample E2E test exists at `tests/e2e/app.spec.ts`
**And** the test launches the Tauri app and verifies basic functionality
**And** `pnpm test:e2e` runs all E2E tests

**Given** frontend and E2E testing are configured
**When** the team configures Rust backend testing
**Then** sample unit tests exist in `src-tauri/src/lib.rs`
**And** `cargo test` runs all Rust tests successfully
**And** Rust tests run in isolation (no external dependencies required)

**Given** all testing frameworks are configured
**When** the team runs the complete test suite
**Then** frontend tests, E2E tests, and Rust tests all pass
**And** test results are clearly displayed with pass/fail status
**And** test execution completes in <30 seconds for initial test suite

### Story 1.5: Setup Tailwind CSS and Design System Foundation [Tier 1]

As a development team,
I want Tailwind CSS configured with Fluent Design tokens and base configuration,
So that we have a consistent styling system for building UI components.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project
**When** the team adds Tailwind CSS
**Then** `tailwindcss`, `postcss`, and `autoprefixer` are added to `package.json`
**And** `tailwind.config.js` is created with Svelte file paths configured
**And** `postcss.config.js` is created with Tailwind plugin
**And** `src/app.css` imports Tailwind directives
**And** `src/main.ts` imports `app.css`

**Given** Tailwind is configured
**When** the team defines Fluent Design tokens in `tailwind.config.js`
**Then** custom colors are defined (primary, secondary, accent, neutral shades)
**And** custom spacing scale matches Fluent Design (4px base unit)
**And** custom border radius values are defined
**And** custom shadow values match Fluent elevation system
**And** typography scale is configured with recommended font families

**Given** Tailwind with Fluent tokens is configured
**When** the team creates a test component using Tailwind classes
**Then** the component renders with correct styling
**And** Tailwind JIT compilation works (styles update on save)
**And** production build purges unused CSS (bundle <50KB)
**And** dark mode utilities work correctly (`dark:` prefix)

### Story 1.6: Build Core Fluent Design Svelte Components [Tier 1]

As a development team,
I want 5-8 essential Svelte components built following Fluent Design Language,
So that we have a reusable component library for building the application UI.

**Acceptance Criteria:**

**Given** Tailwind CSS with Fluent tokens is configured
**When** the team creates core components in `src/lib/components/fluent/`
**Then** the following components exist with proper TypeScript types: Button.svelte (primary, secondary, ghost variants), Input.svelte (text input with label, error state, disabled state), Card.svelte (container with optional header, body, footer), Modal.svelte (overlay with backdrop, close button, trap focus), Toast.svelte (notification with success, warning, error, info variants)

**Given** the Button component is created
**When** the team reviews its implementation
**Then** it supports variants: `primary`, `secondary`, `ghost`
**And** it supports sizes: `sm`, `md`, `lg`
**And** it supports disabled state
**And** it has hover, focus, and active states matching Fluent Design
**And** it includes proper ARIA attributes for accessibility
**And** it has TypeScript props with proper types

**Given** the Input component is created
**When** the team reviews its implementation
**Then** it includes a label with proper `for` attribute
**And** it supports placeholder text
**And** it supports error state with error message display
**And** it supports disabled state
**And** it binds to Svelte's `bind:value` correctly
**And** focus states match Fluent Design (2px blue outline)

**Given** the Modal component is created
**When** the team reviews its implementation
**Then** it renders as a portal/overlay
**And** it includes a backdrop that closes modal on click
**And** it traps focus within the modal when open
**And** it closes on Escape key press
**And** it prevents body scroll when open
**And** it includes proper ARIA attributes (`role="dialog"`, `aria-modal="true"`)

**Given** all 5 core components are created
**When** the team creates a demo page using all components
**Then** all components render correctly
**And** components are responsive (work at 768px+ width)
**And** components support dark mode via Tailwind's `dark:` classes
**And** component file size is reasonable (<10KB per component)

### Story 1.7: Configure ProseMirror Editor Foundation [Tier 1]

As a development team,
I want ProseMirror editor library integrated with basic configuration,
So that we have the rich text editing foundation for the writing workspace.

**Acceptance Criteria:**

**Given** the Tauri + Svelte project with Tailwind CSS
**When** the team adds ProseMirror dependencies
**Then** the following packages are added to `package.json`: `prosemirror-state`, `prosemirror-view`, `prosemirror-model`, `prosemirror-schema-basic`, `prosemirror-keymap`, `prosemirror-history`

**Given** ProseMirror packages are installed
**When** the team creates a Svelte wrapper component at `src/lib/components/Editor.svelte`
**Then** the component initializes ProseMirror `EditorView` in an `onMount` lifecycle
**And** the editor uses basic schema (paragraphs, headings, bold, italic)
**And** the editor supports undo/redo via `prosemirror-history`
**And** the editor has basic keymap (Ctrl+B for bold, Ctrl+I for italic, Ctrl+Z/Y for undo/redo)
**And** the editor content is bound to a Svelte store or prop

**Given** the Editor component is created
**When** the team adds it to a test page
**Then** the editor renders with proper styling (Fluent Design typography)
**And** typing in the editor is responsive (<16ms latency)
**And** undo/redo works correctly
**And** keyboard shortcuts work (Ctrl+B, Ctrl+I, etc.)
**And** the editor supports basic copy/paste
**And** the editor has a minimum height of 300px

**Given** ProseMirror is working
**When** the team tests performance
**Then** the editor maintains 60 FPS while typing
**And** the editor handles documents up to 10,000 words without lag
**And** editor initialization completes in <200ms

---

## Epic 2: Project Setup & Configuration Wizard

Authors can create new novel projects through a guided onboarding wizard, configuring genre, story framework, and all initial parameters. They can also open existing projects from a recent list.

### Story 2.1: Design and Implement Database Schema for Projects [Tier 1]

As a development team,
I want a comprehensive SQLite schema for storing novel projects with all configuration data,
So that we can persist project metadata, settings, and relationships to other entities.

**Acceptance Criteria:**

**Given** the SQLite database is configured with migrations
**When** the team creates migration `V2__create_projects_schema.sql`
**Then** the migration defines a `projects` table with fields: id (PRIMARY KEY), title (TEXT NOT NULL), author_name (TEXT), pen_name (TEXT), tagline (TEXT), genre (TEXT), subgenre (TEXT), target_audience (TEXT), tone (TEXT), point_of_view (TEXT), story_framework (TEXT), chapter_count (INTEGER), target_words_per_chapter (INTEGER), plot_premise (TEXT), language (TEXT DEFAULT 'en'), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), file_path (TEXT NOT NULL UNIQUE), last_opened_at (TIMESTAMP)
**And** the schema includes indexes on frequently queried fields (last_opened_at, created_at)
**And** the migration includes a trigger to auto-update `updated_at` on row changes

**Given** the projects table is created
**When** the team tests the schema with sample data
**Then** project records can be inserted with all fields
**And** records can be queried by id or file_path
**And** records can be ordered by last_opened_at for recent projects list
**And** the updated_at trigger fires correctly on UPDATE operations

### Story 2.2: Build Home Screen with Recent Projects List [Tier 1]

As an author,
I want to see a home screen showing my recent projects when I launch StoryTeller,
So that I can quickly resume work on my current novel.

**Acceptance Criteria:**

**Given** the application is launched with no projects
**When** the home screen renders
**Then** a welcome message is displayed: "Welcome to StoryTeller"
**And** two primary action buttons are shown: "Create New Project" (primary button) and "Open Existing Project" (secondary button)
**And** an empty state illustration is displayed
**And** the layout follows Fluent Design principles with proper spacing

**Given** the application has 1-5 recent projects
**When** the home screen renders
**Then** a "Recent Projects" section displays a card for each project
**And** each project card shows: project title, author/pen name, last modified date (relative time: "2 hours ago"), project thumbnail or genre icon, word count progress (e.g., "15,000 / 80,000 words")
**And** clicking a project card opens that project
**And** each card has a context menu with "Open", "Open in File Explorer", and "Remove from List" options
**And** the "Create New Project" button remains prominently displayed above the list

**Given** the application has 10+ recent projects
**When** the home screen renders
**Then** only the 10 most recent projects are displayed
**And** a "View All Projects" link is shown at the bottom
**And** projects are sorted by last_opened_at descending

### Story 2.3: Build Wizard Step 1 - Basic Project Information [Tier 1]

As an author,
I want to provide basic information about my novel in the first wizard step,
So that StoryTeller can configure my project with the right metadata.

**Acceptance Criteria:**

**Given** the user clicks "Create New Project"
**When** the wizard opens to Step 1
**Then** the wizard displays a progress indicator showing "Step 1 of 6: Basic Information"
**And** the following input fields are displayed with labels: "Novel Title" (required, text input), "Author Name" (optional, text input, placeholder: "Your real name"), "Pen Name" (optional, text input, placeholder: "Your pen name if different"), "Tagline" (optional, text input, placeholder: "A one-sentence hook for your novel", max 150 characters)
**And** all fields use the Fluent Design Input component
**And** the "Novel Title" field has real-time validation (min 1 character, max 200 characters)

**Given** the user is on Step 1
**When** the user leaves the "Novel Title" field empty and clicks "Next"
**Then** an error message is displayed: "Novel Title is required"
**And** the field is highlighted with a red border
**And** focus is returned to the "Novel Title" field
**And** the wizard does not advance to Step 2

**Given** the user has entered a valid novel title
**When** the user clicks "Next"
**Then** the form data is saved to a temporary wizard state
**And** the wizard advances to Step 2
**And** a "Back" button becomes enabled

### Story 2.4: Build Wizard Step 2 - Genre and Audience [Tier 1]

As an author,
I want to select my novel's genre and target audience in the wizard,
So that StoryTeller can provide genre-appropriate templates and suggestions.

**Acceptance Criteria:**

**Given** the user is on Step 2 of the wizard
**When** the wizard displays Step 2
**Then** the progress indicator shows "Step 2 of 6: Genre & Audience"
**And** a "Genre" dropdown is displayed with options: Thriller, Romance, Fantasy, Sci-Fi, Mystery, Horror, Literary Fiction, Historical Fiction, Other
**And** a "Subgenre" multiselect field is displayed (options populate based on selected genre)
**And** a "Target Audience" dropdown is displayed with options: Young Adult (YA), New Adult (NA), Adult, Middle Grade, Children
**And** a "Tone" multiselect field is displayed with options: Dark, Light, Humorous, Serious, Suspenseful, Romantic, Adventurous, Philosophical

**Given** the user selects "Fantasy" as the genre
**When** the subgenre field updates
**Then** subgenre options include: High Fantasy, Urban Fantasy, Epic Fantasy, Dark Fantasy, Sword & Sorcery, Magical Realism
**And** the user can select multiple subgenres

**Given** the user has selected at least a genre and target audience
**When** the user clicks "Next"
**Then** the selections are saved to wizard state
**And** the wizard advances to Step 3

**Given** the user has not selected a genre
**When** the user clicks "Next"
**Then** an error message is displayed: "Please select at least a genre"
**And** the genre dropdown is highlighted

### Story 2.5: Build Wizard Step 3 - Story Structure [Tier 1]

As an author,
I want to configure my story's structure and framework in the wizard,
So that StoryTeller understands my narrative approach and can provide appropriate guidance.

**Acceptance Criteria:**

**Given** the user is on Step 3 of the wizard
**When** the wizard displays Step 3
**Then** the progress indicator shows "Step 3 of 6: Story Structure"
**And** a "Point of View" dropdown is displayed with options: First Person, Third Person Limited, Third Person Omniscient, Multiple POV
**And** a "Story Framework" dropdown is displayed with options: Three-Act Structure, Five-Act Structure, Hero's Journey, Snowflake Method, Seven-Point Story Structure, Custom/Freeform
**And** each framework option has a tooltip with a brief description (e.g., "Three-Act Structure: Setup, Confrontation, Resolution")

**Given** the user is on Step 3
**When** the wizard displays chapter configuration
**Then** a "Target Chapter Count" number input is displayed (default: 20, min: 1, max: 100)
**And** a "Target Words Per Chapter" number input is displayed (default: 3000, min: 500, max: 15000)
**And** a calculated "Total Target Word Count" is displayed (read-only, calculated as chapter_count × words_per_chapter)
**And** the calculation updates in real-time as the user changes values

**Given** the user has selected a story framework and configured chapter settings
**When** the user clicks "Next"
**Then** the selections are saved to wizard state
**And** the wizard advances to Step 4

### Story 2.6: Build Wizard Step 4 - Plot Premise [Tier 1]

As an author,
I want to provide a high-level plot premise in the wizard,
So that StoryTeller can use this context when generating content.

**Acceptance Criteria:**

**Given** the user is on Step 4 of the wizard
**When** the wizard displays Step 4
**Then** the progress indicator shows "Step 4 of 6: Plot Premise"
**And** a large textarea is displayed with the label "Plot Premise"
**And** placeholder text provides guidance: "Describe your story's main plot in 2-3 paragraphs. Include the protagonist, their goal, the central conflict, and the stakes."
**And** a character counter is displayed below the textarea (e.g., "125 / 2000 characters")
**And** the textarea supports markdown formatting (optional enhancement)

**Given** the user is typing in the plot premise textarea
**When** the character count approaches the maximum (2000 characters)
**Then** the counter changes color to amber at 1800 characters
**And** the counter changes color to red at 1950 characters
**And** the user cannot type beyond 2000 characters

**Given** the user has entered at least 50 characters in the plot premise
**When** the user clicks "Next"
**Then** the plot premise is saved to wizard state
**And** the wizard advances to Step 5

**Given** the user has entered fewer than 50 characters
**When** the user clicks "Next"
**Then** a warning message is displayed: "We recommend at least a few sentences for better AI-generated content. Continue anyway?"
**And** the user can choose to go back and add more or proceed

### Story 2.7: Build Wizard Step 5 - AI Provider Configuration [Tier 1]

As an author,
I want to optionally configure my AI provider API key in the wizard,
So that I can start generating content immediately after project creation.

**Acceptance Criteria:**

**Given** the user is on Step 5 of the wizard
**When** the wizard displays Step 5
**Then** the progress indicator shows "Step 5 of 6: AI Provider (Optional)"
**And** a prominent message is displayed: "You can configure this later from Settings"
**And** a "Skip this step" button is displayed prominently
**And** an "AI Provider" dropdown is displayed with options: OpenAI, Anthropic Claude, Google Gemini, Deepseek, Yandex, Custom Provider
**And** an "API Key" password input field is displayed (masked input)
**And** a "Test Connection" button is displayed next to the API key field

**Given** the user selects an AI provider and enters an API key
**When** the user clicks "Test Connection"
**Then** the application makes a test API call to verify the key
**And** a loading spinner is displayed during the test
**And** if successful, a green checkmark appears with the message "Connection successful"
**And** if failed, a red X appears with an error message explaining the issue (e.g., "Invalid API key" or "Network connection error")

**Given** the user clicks "Skip this step"
**When** the wizard advances
**Then** no API key is saved
**And** the wizard moves to Step 6
**And** a note is stored in wizard state that API configuration was skipped

**Given** the user has successfully tested an API key
**When** the user clicks "Next"
**Then** the API key is saved securely to OS credential storage
**And** the wizard advances to Step 6

### Story 2.8: Build Wizard Step 6 - Review and Create [Tier 1]

As an author,
I want to review all my project settings before finalizing creation,
So that I can ensure everything is configured correctly.

**Acceptance Criteria:**

**Given** the user is on Step 6 of the wizard
**When** the wizard displays Step 6
**Then** the progress indicator shows "Step 6 of 6: Review & Create"
**And** a summary card displays all configured settings organized by category: "Basic Information" (title, author, pen name, tagline), "Genre & Audience" (genre, subgenre, target audience, tone), "Story Structure" (POV, framework, chapter count, words per chapter, total target words), "Plot Premise" (first 200 characters with "Read more" link), "AI Provider" (provider name if configured, or "Not configured - you can add this later")
**And** each section has an "Edit" link that takes the user back to that specific step

**Given** the user clicks an "Edit" link on the review page
**When** the user is taken back to that step
**Then** all previously entered data is preserved in the form fields
**And** after editing, clicking "Next" returns to the review page
**And** the updated information is reflected in the review

**Given** the user is satisfied with the settings on the review page
**When** the user clicks "Create Project"
**Then** a loading state is displayed with the message "Creating your project..."
**And** the following operations occur: (1) A new project record is inserted into the database, (2) A project file is created at `~/Documents/StoryTeller/Projects/{project_title}.storyteller`, (3) The project file is initialized with the wizard data, (4) The Story Bible is initialized with empty structure, (5) The Qdrant collection is created for this project
**And** if any operation fails, the user sees a specific error message with recovery options
**And** if all operations succeed, the wizard closes and the main workspace opens with the new project

**Given** the project is created successfully
**When** the main workspace opens
**Then** the project title is displayed in the title bar
**And** the user sees an empty chapter list with a "Create First Chapter" button
**And** a welcome toast notification is displayed: "Project created successfully! Ready to start writing."

### Story 2.9: Implement Language Selection [Tier 2]

As an author,
I want to select the language for my novel's content,
So that AI-generated text is in the correct language.

**Acceptance Criteria:**

**Given** the user is on Step 4 of the wizard (Plot Premise)
**When** the wizard displays Step 4
**Then** a "Content Language" dropdown is displayed below the plot premise
**And** the dropdown includes common languages: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified), Japanese, Korean, Arabic, Hindi, Other
**And** the default selection is "English"
**And** a note is displayed: "This affects AI-generated content, not the UI language"

**Given** the user selects a non-English language
**When** the wizard proceeds to later steps
**Then** the language selection is saved to the project configuration
**And** AI prompts will be instructed to generate content in the selected language

**Given** the project is created with a specific language
**When** AI generation occurs
**Then** all generated content (characters, settings, chapters) is in the specified language
**And** validation messages remain in the UI language (English by default)

### Story 2.10: Add Welcome Screen with Optional Demo Project [Tier 2]

As a first-time author,
I want to see a welcome screen with the option to explore a demo project,
So that I can learn how StoryTeller works before creating my own novel.

**Acceptance Criteria:**

**Given** the application is launched for the first time (no projects exist)
**When** the home screen renders
**Then** a welcome modal is displayed with the heading "Welcome to StoryTeller"
**And** the modal contains a brief introduction: "StoryTeller helps you write consistent, high-quality novels with AI-powered assistance and intelligent Story Bible management."
**And** the modal displays three options: "Create My First Project" (primary button), "Explore Demo Project" (secondary button), "Skip Tour" (text link)

**Given** the user clicks "Explore Demo Project"
**When** the demo project loads
**Then** a pre-configured project is opened with: A complete Story Bible (3 characters, 2 settings, 5 plot threads), 3 sample chapters (1 user-written, 2 AI-generated), Sample validation reports showing how contradiction detection works, A guided tutorial overlay highlighting key features
**And** a persistent banner is displayed at the top: "You're viewing a demo project. Ready to create your own? [Create Project]"
**And** the demo project is read-only (users cannot save changes)

**Given** the user clicks "Create My First Project"
**When** the wizard opens
**Then** the wizard proceeds normally to Step 1
**And** the welcome modal does not appear again for this user

**Given** the user clicks "Skip Tour"
**When** the modal closes
**Then** the user is taken to the standard home screen
**And** a preference is saved to not show the welcome modal again
**And** the user can still create a project normally

---

## Epic 3: Multi-AI Provider Integration

Authors can securely connect to multiple AI providers (OpenAI, Claude, Gemini, Deepseek, Yandex, custom), switch between them when needed, and have their API keys stored securely in OS credential storage.

### Story 3.1: Design AI Provider Database Schema [Tier 1]

As a development team,
I want a database schema for storing AI provider configurations,
So that users can manage multiple providers with proper metadata.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V3__create_ai_providers_schema.sql`
**Then** the migration defines an `ai_providers` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY to projects.id), provider_name (TEXT NOT NULL: 'openai', 'claude', 'gemini', 'deepseek', 'yandex', 'custom'), display_name (TEXT), api_endpoint (TEXT), model_name (TEXT), is_primary (BOOLEAN DEFAULT 0), is_active (BOOLEAN DEFAULT 1), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), last_used_at (TIMESTAMP)
**And** the schema includes a unique constraint on (project_id, provider_name)
**And** the schema includes an index on (project_id, is_primary)
**And** only one provider per project can have is_primary = 1 (enforced via trigger)

**Given** the ai_providers table is created
**When** the team tests the schema
**Then** provider records can be inserted for a project
**And** API keys are NOT stored in this table (stored in OS keychain)
**And** the primary provider can be identified via the is_primary flag
**And** inactive providers (is_active = 0) are excluded from failover logic

### Story 3.2: Implement OS Keychain Integration for Secure Credential Storage [Tier 1]

As a development team,
I want API keys stored in OS-specific secure credential storage,
So that sensitive keys are never stored in plaintext and follow platform security best practices.

**Acceptance Criteria:**

**Given** the Tauri Rust backend
**When** the team implements keychain integration
**Then** the following OS-specific libraries are used: macOS: Security framework (keychain-rs crate or native), Windows: Windows Credential Manager (windows crate with CredWrite/CredRead), Linux: libsecret (secret-service crate)
**And** a unified Rust abstraction layer is created with methods: `store_credential(service: &str, account: &str, password: &str) -> Result<()>`, `retrieve_credential(service: &str, account: &str) -> Result<String>`, `delete_credential(service: &str, account: &str) -> Result<()>`

**Given** the keychain abstraction is implemented
**When** the team tests credential storage
**Then** storing a credential with `service = "storyteller.ai_provider"` and `account = "project_{id}_{provider_name}"` succeeds
**And** the credential is retrievable using the same service and account identifiers
**And** deleting the credential removes it from the keychain
**And** attempting to retrieve a non-existent credential returns a specific error (not a generic failure)

**Given** the keychain integration is tested on all platforms
**When** the team runs platform-specific tests
**Then** credentials are stored in: macOS: Keychain Access.app shows "storyteller.ai_provider" entries, Windows: Credential Manager shows "storyteller.ai_provider" entries, Linux: libsecret stores credentials accessible via `secret-tool`
**And** credentials persist across app restarts
**And** credentials are isolated per project (using project_id in account identifier)

**Given** the OS keychain is unavailable (e.g., Linux without libsecret)
**When** the application attempts to store credentials
**Then** a fallback mechanism is used: AES-256-GCM encrypted file stored at `{app_data}/credentials.enc`, Key derived from machine-specific hardware ID, Clear warning displayed to user about fallback security
**And** the fallback is documented in error messages

### Story 3.3: Build AI Provider Configuration UI [Tier 1]

As an author,
I want a settings UI to manage my AI provider configurations,
So that I can add, edit, or remove API keys and switch between providers.

**Acceptance Criteria:**

**Given** the user opens Settings (Ctrl+, or ⌘+,)
**When** the user navigates to the "AI Providers" section
**Then** a list of configured providers is displayed with columns: Provider name (with icon), Model, Status (Active/Inactive toggle), Primary (radio button), Actions (Edit, Delete)
**And** an "Add Provider" button is prominently displayed
**And** if no providers are configured, an empty state is shown with the message "No AI providers configured. Add one to enable AI features."

**Given** the user clicks "Add Provider"
**When** the provider configuration modal opens
**Then** the following fields are displayed: "Provider" dropdown (OpenAI, Anthropic Claude, Google Gemini, Deepseek, Yandex, Custom), "API Key" password input (masked), "Model Name" text input (pre-filled with default for selected provider), "API Endpoint" text input (only shown for Custom provider), "Set as Primary" checkbox
**And** a "Test Connection" button is displayed
**And** "Save" and "Cancel" buttons are displayed

**Given** the user selects "OpenAI" as the provider
**When** the modal updates
**Then** the "Model Name" field is pre-filled with "gpt-4o"
**And** the "API Endpoint" field is hidden (uses default OpenAI endpoint)
**And** a help link is displayed: "Get your OpenAI API key" (links to OpenAI docs)

**Given** the user enters an API key and clicks "Test Connection"
**When** the test runs
**Then** a loading spinner is displayed with the message "Testing connection..."
**And** a test API call is made to the provider (e.g., simple completion or model list)
**And** if successful, a green checkmark appears with "Connection successful! Model: {model_name}"
**And** if failed, a red X appears with a specific error message (e.g., "Invalid API key", "Network error", "Rate limit exceeded")
**And** the "Save" button is only enabled after a successful test

**Given** the user successfully tests and saves a provider
**When** the provider is added
**Then** the new provider appears in the providers list
**And** if "Set as Primary" was checked, the provider is marked as primary (other providers are unmarked)
**And** the API key is stored in OS keychain
**And** a success toast is displayed: "Provider added successfully"

### Story 3.4: Implement AI Provider Abstraction Layer [Tier 1]

As a development team,
I want a unified abstraction layer for all AI providers,
So that the application can interact with different providers through a consistent interface.

**Acceptance Criteria:**

**Given** the Rust backend has multiple AI provider integrations
**When** the team implements the abstraction layer
**Then** a Rust trait `AIProvider` is defined with methods: `generate_completion(&self, prompt: &str, context: &str, max_tokens: u32) -> Result<String>`, `stream_completion(&self, prompt: &str, context: &str, max_tokens: u32) -> Result<Stream<String>>`, `get_model_info(&self) -> ModelInfo`, `test_connection(&self) -> Result<bool>`
**And** concrete implementations are created for each provider: `OpenAIProvider`, `ClaudeProvider`, `GeminiProvider`, `DeepseekProvider`, `YandexProvider`, `CustomProvider`

**Given** the abstraction layer is implemented
**When** the application needs to generate content
**Then** the code uses the `AIProvider` trait interface
**And** the specific provider is selected based on the project's primary provider configuration
**And** switching providers requires no changes to calling code (only configuration)

**Given** a provider-specific implementation (e.g., OpenAIProvider)
**When** the implementation is reviewed
**Then** it correctly formats prompts for that provider's API
**And** it handles provider-specific authentication (Bearer token, API key header, etc.)
**And** it correctly parses responses from that provider's API
**And** it implements retry logic for transient failures (3 retries with exponential backoff)
**And** it respects rate limits with appropriate delays

**Given** the abstraction layer is complete
**When** the team tests with multiple providers
**Then** the same StoryTeller features work identically regardless of which provider is configured
**And** switching the primary provider in settings immediately affects subsequent AI operations
**And** provider-specific errors are translated to user-friendly messages

### Story 3.5: Implement Rate Limiting and Quota Management [Tier 2]

As an author,
I want the application to handle API rate limits gracefully,
So that I don't lose work or experience errors when my API provider enforces rate limits.

**Acceptance Criteria:**

**Given** an AI provider with rate limits
**When** the application makes API calls
**Then** each provider implementation tracks request counts per minute
**And** if approaching the known rate limit (e.g., 90% of limit), the application delays requests
**And** if a rate limit error is received (HTTP 429), the application waits for the specified retry-after duration
**And** the user sees a toast notification: "API rate limit reached. Retrying in {X} seconds..."

**Given** a rate limit error occurs during AI generation
**When** the retry logic executes
**Then** the application waits for the retry-after period
**And** the generation progress indicator shows "Rate limit reached, retrying..."
**And** after the wait period, the request is automatically retried
**And** if the retry succeeds, generation continues seamlessly
**And** if the retry fails after 3 attempts, the user sees an actionable error

**Given** the user's API quota is exhausted (monthly limit)
**When** an API call fails with a quota exceeded error
**Then** the application displays a specific error message: "Your {provider} API quota has been exhausted. Please upgrade your plan or switch to another provider."
**And** a "Switch Provider" button is displayed in the error message
**And** clicking the button opens the AI Provider settings

### Story 3.6: Implement Automatic Failover to Alternate Providers [Tier 2]

As an author,
I want the application to automatically switch to a backup AI provider if the primary fails,
So that my writing workflow is not interrupted by provider outages.

**Acceptance Criteria:**

**Given** a project has multiple active AI providers configured
**When** the primary provider fails (network error, service unavailable, rate limit exhausted)
**Then** the application automatically attempts to use the next active provider
**And** a toast notification is displayed: "Primary provider unavailable. Switched to {backup_provider}."
**And** the generation continues with the backup provider
**And** the user can optionally set the backup provider as the new primary

**Given** the primary provider fails and a backup provider is used
**When** the backup provider successfully completes the request
**Then** subsequent requests continue using the backup provider for the current session
**And** the original primary provider is automatically retried after 5 minutes (background check)
**And** if the primary provider is available again, the user is notified: "Primary provider {name} is available again."

**Given** all configured providers fail
**When** the application exhausts all failover options
**Then** the user sees a clear error message: "All configured AI providers are unavailable. Please check your internet connection or provider status."
**And** a "Retry" button is displayed
**And** a "Configure Providers" button is displayed to access settings

### Story 3.7: Implement API Key Rotation and Revocation [Tier 2]

As an author,
I want to easily rotate or revoke my API keys,
So that I can maintain security if a key is compromised.

**Acceptance Criteria:**

**Given** the user is viewing the AI Providers list in Settings
**When** the user clicks "Edit" on a provider
**Then** an edit modal opens with the current configuration (API key is masked: "••••••••••••")
**And** a "Change API Key" button is displayed
**And** clicking "Change API Key" reveals a new API key input field
**And** the user can enter a new key and click "Test Connection"
**And** if successful, clicking "Save" updates the key in OS keychain
**And** the old key is removed from keychain

**Given** the user wants to revoke a provider
**When** the user clicks "Delete" on a provider
**Then** a confirmation modal is displayed: "Remove {provider_name}? This will delete the stored API key and you'll need to re-enter it if you want to use this provider again."
**And** if confirmed, the provider record is deleted from the database
**And** the API key is removed from OS keychain
**And** if the deleted provider was primary, the user is prompted to select a new primary provider

**Given** the application detects an invalid API key during operation
**When** an authentication error occurs
**Then** the application pauses the current operation gracefully
**And** a modal is displayed: "The API key for {provider} is no longer valid. Please update your credentials."
**And** an "Update Key" button opens the provider edit modal
**And** the user can update the key without losing unsaved work

### Story 3.8: Implement Clear Error Messages and User Guidance [Tier 1]

As an author,
I want clear and actionable error messages when AI provider issues occur,
So that I understand what went wrong and how to fix it.

**Acceptance Criteria:**

**Given** an AI provider error occurs
**When** the application handles the error
**Then** the error message distinguishes between error types: "Invalid API Key" → "The API key for {provider} is invalid. Please check your key in Settings.", "Network Error" → "Cannot connect to {provider}. Please check your internet connection.", "Service Unavailable" → "{provider} is currently unavailable. Trying backup provider...", "Rate Limit" → "API rate limit reached for {provider}. Retrying in {X} seconds.", "Quota Exceeded" → "Your {provider} monthly quota has been exhausted. Please upgrade your plan."
**And** each error message includes a specific action button (e.g., "Open Settings", "Retry", "Switch Provider")

**Given** the application is offline (no internet connection)
**When** the user attempts to use AI features
**Then** a clear message is displayed: "AI features require an internet connection. You can continue writing and use AI features when you're back online."
**And** AI-related buttons are disabled with a tooltip explaining why
**And** the status bar shows an offline indicator

**Given** the user has not configured any AI providers
**When** the user attempts to use AI features
**Then** a modal is displayed: "AI providers not configured. Would you like to set one up now?"
**And** a "Configure AI Provider" button opens the Settings → AI Providers page
**And** a "Maybe Later" button allows the user to continue without AI features

**Given** an error occurs during AI generation
**When** the error is logged
**Then** diagnostic logs capture: Error type and message, Provider name, Timestamp, Request context (prompt type, e.g., "chapter generation"), User action (e.g., "retry", "switched provider")
**And** API keys are NEVER logged in any logs
**And** manuscript content is NEVER logged in any logs
# Epics 4-12 Continuation

This file contains the continuation of epics to be appended to epics.md

---

## Epic 4: Story Bible - Core Storage & Management

Authors can create and manage their Story Bible—a persistent knowledge base of characters, settings, world rules, themes, and plot threads—organizing everything in one place with categories and favorites.

### Story 4.1: Design Story Bible Database Schema [Tier 1]

As a development team,
I want a comprehensive database schema for Story Bible entries,
So that authors can store and organize all their story knowledge systematically.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V4__create_story_bible_schema.sql`
**Then** the migration defines a `story_bible_entries` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY to projects.id), entry_type (TEXT NOT NULL: 'character', 'setting', 'rule', 'theme', 'plot_thread'), title (TEXT NOT NULL), content (TEXT), metadata (TEXT, JSON format for type-specific fields), is_favorite (BOOLEAN DEFAULT 0), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), embedding_vector_id (TEXT, reference to Qdrant vector)
**And** the schema includes indexes on (project_id, entry_type) and (project_id, is_favorite)
**And** a `story_bible_relationships` table is defined for linking entries: id (PRIMARY KEY), from_entry_id (INTEGER, FOREIGN KEY), to_entry_id (INTEGER, FOREIGN KEY), relationship_type (TEXT: 'character_to_plot', 'character_relationship', 'setting_connection'), created_at (TIMESTAMP)

**Given** the story_bible_entries table is created
**When** the team tests the schema
**Then** entries of all types can be inserted
**And** entries can be queried by type, project, or favorite status
**And** the metadata field stores JSON data specific to entry types (e.g., character: {"age": 25, "eye_color": "blue"})
**And** relationships between entries can be created and queried

### Story 4.2: Build Story Bible Navigation UI [Tier 1]

As an author,
I want a dedicated Story Bible panel in the main workspace,
So that I can easily browse and access my story knowledge while writing.

**Acceptance Criteria:**

**Given** the main workspace is open with a project
**When** the Story Bible panel is displayed
**Then** a right-side panel (300px wide, resizable) is shown with tabs for each category: Characters, Settings, Rules, Themes, Plot Threads
**And** a search bar is displayed at the top of the panel
**And** a "+" button is displayed to create new entries
**And** each tab displays a list of entries for that category

**Given** the Characters tab is selected
**When** entries are displayed
**Then** each character entry shows: character name, thumbnail/avatar (optional), brief description (first 50 chars of content), favorite star icon (clickable)
**And** clicking an entry expands it to show full details
**And** hovering over an entry shows a tooltip with quick info
**And** entries are sorted alphabetically by default (with favorites pinned to top)

**Given** the Story Bible panel is displayed
**When** the user resizes the panel
**Then** the panel width can be adjusted from 200px to 500px
**And** the resize handle provides visual feedback on hover
**And** the panel width preference is persisted for the project
**And** the main editor adjusts its width accordingly

**Given** the user clicks the "+" button
**When** a dropdown menu appears
**Then** options are displayed for each entry type: Add Character, Add Setting, Add Rule, Add Theme, Add Plot Thread
**And** selecting an option opens the create entry modal

### Story 4.3: Implement Create Story Bible Entry [Tier 1]

As an author,
I want to create new Story Bible entries with structured forms,
So that I can systematically document my story world.

**Acceptance Criteria:**

**Given** the user selects "Add Character" from the Story Bible panel
**When** the create character modal opens
**Then** the following fields are displayed: Name (required, text input), Role (dropdown: Protagonist, Antagonist, Supporting, Minor), Description (rich text area, 500 char limit), Physical Traits (textarea: appearance, age, etc.), Personality (textarea: traits, motivations), Backstory (textarea), Relationships (multi-select linking to other characters), First Appears in Chapter (dropdown of chapters)
**And** "Save" and "Cancel" buttons are displayed

**Given** the user selects "Add Setting"
**When** the create setting modal opens
**Then** the following fields are displayed: Name (required), Type (dropdown: Location, Time Period, World), Description (rich text area), Key Features (textarea), Atmosphere/Mood (text input), Associated Characters (multi-select)
**And** standard save/cancel buttons are displayed

**Given** the user selects "Add Rule"
**When** the create rule modal opens
**Then** the following fields are displayed: Title (required, e.g., "Magic System Rules"), Category (dropdown: World Building, Magic/Tech, Social/Cultural, Physical Laws), Description (rich text area), Exceptions (textarea)
**And** standard save/cancel buttons are displayed

**Given** the user fills in all required fields and clicks "Save"
**When** the entry is saved
**Then** the entry is inserted into the database with the current project_id
**And** an embedding vector is generated from the entry content and stored in Qdrant
**And** the entry appears in the appropriate category tab
**And** a success toast is displayed: "Character added to Story Bible"
**And** auto-save is triggered for the project

**Given** the user tries to save without filling required fields
**When** validation runs
**Then** required fields are highlighted with red borders
**And** an error message is displayed: "Please fill in all required fields"
**And** the modal remains open for corrections

### Story 4.4: Implement Edit Story Bible Entry [Tier 1]

As an author,
I want to edit existing Story Bible entries,
So that I can update my story knowledge as the narrative evolves.

**Acceptance Criteria:**

**Given** a Story Bible entry is displayed in the panel
**When** the user clicks the "Edit" button (or double-clicks the entry)
**Then** an edit modal opens pre-filled with the current entry data
**And** all fields are editable using the same form as the create modal
**And** the modal title shows "Edit {Entry Type}: {Entry Name}"

**Given** the user modifies entry fields
**When** the user clicks "Save"
**Then** the database record is updated with the new values
**And** the updated_at timestamp is set to the current time
**And** the embedding vector in Qdrant is regenerated if content changed
**And** the entry display in the panel updates to reflect changes
**And** a success toast is displayed: "{Entry Type} updated"
**And** auto-save is triggered

**Given** the user has made changes to an entry
**When** the user clicks "Cancel"
**Then** a confirmation prompt is displayed: "Discard changes?"
**And** if confirmed, the modal closes without saving
**And** if cancelled, the user remains in the edit modal

### Story 4.5: Implement View Story Bible Entry Details [Tier 1]

As an author,
I want to view full details of a Story Bible entry,
So that I can review all information without editing.

**Acceptance Criteria:**

**Given** the user clicks on a Story Bible entry in the panel
**When** the entry details are displayed
**Then** a detail view expands within the panel (or opens a modal)
**And** all entry fields are displayed in a read-only format with clear labels
**And** relationships to other entries are displayed as clickable links
**And** "Edit", "Delete", and "Close" buttons are displayed
**And** if the entry is a character, chapters where they appear are listed

**Given** the user clicks a relationship link (e.g., "Related to: Marcus [Character]")
**When** navigation occurs
**Then** the detail view switches to show the linked entry
**And** a breadcrumb trail is displayed for navigation history
**And** a "Back" button allows returning to the previous entry

**Given** the detail view is open
**When** the user clicks outside the detail area
**Then** the detail view collapses back to the entry list
**And** the entry remains selected with a highlight

### Story 4.6: Implement Search and Filter Story Bible [Tier 1]

As an author,
I want to search and filter Story Bible entries,
So that I can quickly find specific information.

**Acceptance Criteria:**

**Given** the Story Bible panel is open
**When** the user types in the search bar
**Then** results update in real-time (debounced by 300ms)
**And** the search is performed across all entry types (Name, Content, Metadata)
**And** matching entries are highlighted with the search term emphasized
**And** entries are ranked by relevance (exact matches first, then partial)
**And** search works even when viewing a specific category tab

**Given** search results are displayed
**When** the user clears the search (clicks X or deletes text)
**Then** all entries are displayed again
**And** the previous view state is restored

**Given** the user is viewing a specific category tab (e.g., Characters)
**When** filter options are available
**Then** a filter dropdown is displayed with options specific to the category
**And** for Characters: filter by Role (Protagonist, Antagonist, etc.)
**And** for Plot Threads: filter by Status (Active, Resolved, Planned)
**And** a "Favorites Only" toggle is available across all categories
**And** filters can be combined with search

**Given** filters are applied
**When** entries are displayed
**Then** only entries matching all selected filters are shown
**And** a clear filters button is displayed
**And** the active filter count is shown (e.g., "2 filters active")

### Story 4.7: Implement Plot Thread Tracking [Tier 2]

As an author,
I want to track plot threads with status and relationships,
So that I can manage story arcs and ensure resolution.

**Acceptance Criteria:**

**Given** the user creates a Plot Thread entry
**When** the create modal is displayed
**Then** additional fields specific to plot threads are shown: Status (dropdown: Planned, Active, Resolved, Abandoned), Priority (dropdown: Main Plot, Subplot, Minor), Chapters (multi-select: where this thread appears/will appear), Related Characters (multi-select), Related Settings (multi-select), Resolution Notes (textarea)
**And** standard save/cancel buttons are displayed

**Given** a plot thread is created
**When** the entry is saved
**Then** the status, priority, and relationships are stored in the metadata JSON field
**And** the entry appears in the Plot Threads tab with a status badge

**Given** the Plot Threads tab is displayed
**When** entries are shown
**Then** each entry displays: thread title, status badge (color-coded: green=Resolved, amber=Active, gray=Planned), priority indicator (icon or label), list of related characters (clickable links)
**And** entries are grouped by status by default
**And** a visual indicator shows which threads have no resolution yet

**Given** a plot thread status is updated to "Resolved"
**When** the entry is saved
**Then** the status badge updates to green
**And** a resolution date is automatically recorded
**And** the thread moves to the "Resolved" section if grouped by status

### Story 4.8: Implement Character Relationship Linking [Tier 2]

As an author,
I want to link characters to each other with relationship types,
So that I can visualize and manage character connections.

**Acceptance Criteria:**

**Given** the user is editing a character entry
**When** the Relationships field is displayed
**Then** the field shows a list of existing relationships with: Related character name (clickable link), Relationship type (dropdown: Family, Friend, Enemy, Ally, Romantic, Mentor/Student, Custom), Relationship description (short text), Remove button (X icon)
**And** an "Add Relationship" button is displayed

**Given** the user clicks "Add Relationship"
**When** the relationship selector opens
**Then** a dropdown lists all other characters in the Story Bible
**And** the user can select a character
**And** a "Relationship Type" dropdown is displayed
**And** a "Description" text input is displayed (optional, e.g., "childhood friends")
**And** clicking "Add" creates the relationship

**Given** a relationship is created
**When** the entry is saved
**Then** a bidirectional relationship record is created in the story_bible_relationships table
**And** both characters show the relationship in their entry details
**And** the relationship appears when viewing either character

**Given** the user views a character with relationships
**When** the detail view is displayed
**Then** a "Relationships" section shows all connected characters
**And** clicking a related character opens that character's details
**And** relationship types are displayed with icons for quick recognition

### Story 4.9: Implement Auto-Extract Story Bible Suggestions [Tier 2]

As an author,
I want StoryTeller to automatically suggest Story Bible entries based on my writing,
So that I can quickly capture important story elements without interrupting my flow.

**Acceptance Criteria:**

**Given** the author is writing or has written a chapter
**When** the auto-extract feature runs (manual trigger or on save)
**Then** the application analyzes the chapter text using NLP techniques
**And** character names are extracted (capitalized names not in dictionary, appearing multiple times)
**And** location names are extracted (place names, "at the...", "in the...")
**And** the application generates a list of suggested Story Bible entries

**Given** suggestions are generated
**When** the suggestion panel is displayed
**Then** each suggestion shows: entry type (Character, Setting, etc.), extracted name/title, brief context (sentence where it appeared), confidence level (high, medium, low), "Add to Story Bible" button, "Ignore" button
**And** suggestions are sorted by confidence level
**And** the user can review multiple suggestions at once

**Given** the user clicks "Add to Story Bible" on a suggestion
**When** the action is performed
**Then** a create entry modal opens pre-filled with the suggested name and type
**And** the context sentence is added to the description field as a starting point
**And** the user can edit and save the entry as normal
**And** the suggestion is removed from the list

**Given** the user clicks "Ignore" on a suggestion
**When** the action is performed
**Then** the suggestion is removed from the list
**And** the application remembers this ignore decision (won't suggest the same item again for this project)
**And** a "Show Ignored" toggle allows reviewing ignored suggestions later

### Story 4.10: Implement Story Bible Integrity Validation [Tier 2]

As a development team,
I want automated integrity validation for Story Bible data,
So that the application maintains data consistency and detects corruption.

**Acceptance Criteria:**

**Given** a project is loaded
**When** the Story Bible is initialized
**Then** integrity checks run automatically: All entry records have valid project_id references, All relationships reference existing entry IDs, All embedding_vector_ids exist in Qdrant, No orphaned relationships (references to deleted entries), Metadata JSON is valid and parseable
**And** if validation passes, the project loads normally
**And** if validation fails, specific issues are logged

**Given** integrity validation detects issues
**When** the project load completes
**Then** the user sees a warning notification: "Story Bible integrity issues detected. Some entries may need attention."
**And** a "View Issues" button opens a report modal
**And** the report lists specific problems: "3 orphaned relationships found", "1 entry missing embedding vector", etc.
**And** suggested fixes are offered for each issue type

**Given** the user views the integrity report
**When** fix options are presented
**Then** the user can click "Auto-Fix" for resolvable issues (e.g., remove orphaned relationships)
**And** for issues requiring user input, clear instructions are provided
**And** after fixes are applied, validation re-runs automatically
**And** a success message confirms "All issues resolved"

### Story 4.11: Implement Story Bible Undo/Redo [Tier 2]

As an author,
I want undo/redo functionality for Story Bible changes,
So that I can safely experiment and recover from mistakes.

**Acceptance Criteria:**

**Given** the author is working with the Story Bible
**When** operations are performed (create, edit, delete entries)
**Then** each operation is recorded in an undo stack
**And** the undo stack maintains up to 50 operations per session
**And** operations include full state snapshots for reliable reversal

**Given** the author performs a Story Bible operation
**When** the author presses Ctrl+Z (or ⌘+Z)
**Then** the most recent operation is undone
**And** the Story Bible UI updates to reflect the reverted state
**And** the database is rolled back to the previous state
**And** embedding vectors are restored if applicable
**And** a toast notification shows "Undone: {operation description}"

**Given** the author has undone one or more operations
**When** the author presses Ctrl+Y (or ⌘+Shift+Z)
**Then** the most recently undone operation is redone
**And** the Story Bible UI and database are updated accordingly
**And** a toast notification shows "Redone: {operation description}"

**Given** the undo stack has multiple operations
**When** the author performs a new operation after undoing
**Then** the redo stack is cleared (cannot redo past the new operation)
**And** the new operation is added to the undo stack

**Given** the author closes and reopens a project
**When** the project loads
**Then** the undo/redo stacks are cleared (undo history does not persist across sessions)
**And** all Story Bible data reflects the last saved state

---

## Epic 5: Rich Text Editor & Writing Workspace

Authors can write and edit novel chapters in a professional rich text editor with auto-save, undo/redo, word count tracking, table of contents generation, and offline capability.

### Story 5.1: Design Chapters Database Schema [Tier 1]

As a development team,
I want a database schema for storing novel chapters with content and metadata,
So that the application can persist manuscript data reliably.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V5__create_chapters_schema.sql`
**Then** the migration defines a `chapters` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY to projects.id), chapter_number (INTEGER NOT NULL), title (TEXT), content (TEXT, stores ProseMirror JSON document), word_count (INTEGER DEFAULT 0), is_generated (BOOLEAN DEFAULT 0, indicates AI-generated), generation_metadata (TEXT, JSON with AI generation details), created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), updated_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP), last_edited_at (TIMESTAMP)
**And** the schema includes a unique constraint on (project_id, chapter_number)
**And** the schema includes an index on (project_id, chapter_number) for ordered retrieval
**And** a `chapter_snapshots` table is defined for version history: id (PRIMARY KEY), chapter_id (INTEGER, FOREIGN KEY), snapshot_name (TEXT), content (TEXT, ProseMirror JSON), word_count (INTEGER), created_at (TIMESTAMP)

**Given** the chapters table is created
**When** the team tests the schema
**Then** chapter records can be inserted for a project
**And** chapters can be queried in order by chapter_number
**And** the content field stores valid ProseMirror JSON documents
**And** word_count is updated via trigger when content changes
**And** snapshots can be created and retrieved for any chapter

### Story 5.2: Build Main Workspace Layout [Tier 1]

As an author,
I want a three-column workspace layout for writing,
So that I have quick access to chapters, the editor, and Story Bible simultaneously.

**Acceptance Criteria:**

**Given** a project is open
**When** the main workspace renders
**Then** a three-column layout is displayed: Left sidebar (200px, resizable): Chapter list navigation, Main editor area (flexible width): ProseMirror rich text editor, Right sidebar (300px, resizable, collapsible): Story Bible panel
**And** the layout follows Fluent Design with proper spacing and visual hierarchy
**And** column widths are persisted per project

**Given** the left sidebar is displayed
**When** the chapter list renders
**Then** all chapters are displayed in order with: chapter number and title (e.g., "Chapter 1: The Beginning"), word count (e.g., "3,245 words"), progress indicator (if target word count is set), completion checkmark (if meets target)
**And** the currently open chapter is highlighted
**And** a "+" button to add a new chapter is displayed at the bottom

**Given** the main editor area is displayed
**When** the editor renders
**Then** a toolbar is displayed above the editor with formatting options
**And** the ProseMirror editor fills the remaining space
**And** a status bar is displayed below the editor showing: current word count, target word count (if set), auto-save status ("Saving..." or "Saved 2 seconds ago"), online/offline indicator

**Given** the right sidebar is displayed
**When** the Story Bible panel renders
**Then** the Story Bible UI (from Epic 4) is embedded in this panel
**And** a collapse button (chevron icon) allows hiding the panel
**And** when collapsed, only an expand button remains visible on the right edge
**And** the panel state (open/collapsed) is persisted per project

### Story 5.3: Implement Chapter Management (Create, Rename, Delete, Reorder) [Tier 1]

As an author,
I want to create, rename, delete, and reorder chapters,
So that I can structure my manuscript flexibly.

**Acceptance Criteria:**

**Given** the chapter list is displayed
**When** the user clicks the "+" button
**Then** a new chapter is created with: chapter_number = max(existing chapter_number) + 1, default title = "Chapter {number}", empty content (ProseMirror empty document), word_count = 0
**And** the new chapter is inserted into the database
**And** the chapter list updates to show the new chapter
**And** the editor switches to the new chapter
**And** a success toast is displayed: "Chapter {number} created"

**Given** the user right-clicks a chapter in the list
**When** the context menu opens
**Then** options are displayed: "Rename", "Duplicate", "Delete", "Create Snapshot"
**And** selecting an option performs the corresponding action

**Given** the user selects "Rename" from the context menu
**When** the rename dialog opens
**Then** an input field is displayed pre-filled with the current chapter title
**And** the user can edit the title
**And** clicking "Save" updates the chapter title in the database
**And** the chapter list updates to reflect the new title

**Given** the user selects "Delete" from the context menu
**When** the confirmation dialog opens
**Then** the dialog warns: "Delete Chapter {number}: {title}? This action cannot be undone."
**And** if confirmed, the chapter record is deleted from the database
**And** if the deleted chapter is currently open, the editor switches to the previous or next chapter
**And** chapter numbers are NOT automatically renumbered (preserve explicit numbering)

**Given** the chapter list is displayed
**When** the user drags a chapter entry
**Then** the chapter can be reordered by dragging to a new position
**And** a visual indicator shows the drop position
**And** dropping the chapter updates chapter_number for affected chapters
**And** the database is updated to reflect the new order
**And** the chapter list re-renders in the new order

### Story 5.4: Integrate ProseMirror Rich Text Editor [Tier 1]

As an author,
I want a professional rich text editor with formatting options,
So that I can write and format my manuscript beautifully.

**Acceptance Criteria:**

**Given** a chapter is open in the editor
**When** the ProseMirror editor is initialized
**Then** the editor uses a custom schema supporting: Paragraphs (default), Headings (H1, H2, H3), Bold, Italic, Underline, Blockquotes, Lists (ordered, unordered), Hard breaks (Shift+Enter)
**And** the editor loads the chapter content from the database (ProseMirror JSON)
**And** the editor has a minimum height of 400px
**And** the editor has a clean, distraction-free appearance with Fluent Design typography

**Given** the editor toolbar is displayed
**When** the user views formatting options
**Then** the following toolbar buttons are available: Bold (Ctrl+B / ⌘+B), Italic (Ctrl+I / ⌘+I), Underline (Ctrl+U / ⌘+U), Heading 1, Heading 2, Heading 3, Blockquote, Bullet List, Numbered List, Undo (Ctrl+Z / ⌘+Z), Redo (Ctrl+Y / ⌘+Shift+Z)
**And** active formatting is highlighted in the toolbar (e.g., Bold button is highlighted when cursor is in bold text)
**And** tooltips show keyboard shortcuts on hover

**Given** the user selects text in the editor
**When** formatting buttons are clicked
**Then** the selected text is formatted accordingly
**And** the formatting persists in the ProseMirror document state
**And** the formatted content is visible immediately
**And** formatting can be toggled on and off

**Given** the user types in the editor
**When** content is entered
**Then** typing is responsive with <16ms latency
**And** the editor maintains 60 FPS while typing
**And** basic autocomplete works (e.g., smart quotes, em dashes)
**And** word count updates in real-time in the status bar

### Story 5.5: Implement Word Count Tracking [Tier 1]

As an author,
I want real-time word count display and chapter target tracking,
So that I can monitor my writing progress.

**Acceptance Criteria:**

**Given** the author is writing in the editor
**When** the content changes
**Then** the word count is recalculated in real-time
**And** the word count is displayed in the status bar (e.g., "3,245 words")
**And** if a target word count is set for the chapter, both are shown (e.g., "3,245 / 5,000 words")
**And** a visual progress bar shows completion percentage

**Given** a target word count is configured for the project
**When** the chapter word count is compared to the target
**Then** the status bar indicates: Green text if within 90-110% of target, Amber text if 70-89% or 111-130% of target, Red text if below 70% or above 130% of target
**And** a tooltip provides specific guidance (e.g., "1,755 words below target")

**Given** the author reaches or exceeds the target word count
**When** the milestone is achieved
**Then** a celebratory animation is displayed (confetti, checkmark)
**And** a toast notification appears: "Chapter {number} complete! {word_count} words written."
**And** the chapter is marked as complete in the chapter list

**Given** the project has multiple chapters
**When** the user views the overall project progress
**Then** a project-level word count is calculated (sum of all chapter word counts)
**And** the project word count is displayed in the main workspace header
**And** a progress indicator shows percentage toward the total target word count

### Story 5.6: Implement Auto-Save (Every 30 Seconds) [Tier 1]

As an author,
I want the application to automatically save my work every 30 seconds,
So that I never lose writing progress.

**Acceptance Criteria:**

**Given** the author is writing in the editor
**When** content changes occur
**Then** a debounced auto-save timer starts (resets on each edit)
**And** after 30 seconds of inactivity OR 60 seconds since last save (whichever comes first), auto-save is triggered
**And** the status bar shows "Saving..." during the save operation
**And** the save completes in <200ms for chapters up to 10,000 words

**Given** auto-save is triggered
**When** the save operation runs
**Then** the chapter content (ProseMirror JSON) is serialized
**And** the content is written to the database (UPDATE chapters SET content=?, word_count=?, updated_at=?)
**And** the word_count field is updated based on the serialized content
**And** the updated_at timestamp is set to the current time
**And** after save completes, the status bar shows "Saved X seconds ago" (relative time)

**Given** multiple rapid edits occur
**When** the auto-save timer is running
**Then** only one save operation is performed (batches changes)
**And** the save includes all changes up to the point of save execution
**And** subsequent edits reset the timer for the next auto-save cycle

**Given** a save operation fails (database error, disk full, etc.)
**When** the failure is detected
**Then** the user sees an error notification: "Auto-save failed: {reason}. Your changes are temporarily stored in memory."
**And** the application retries the save operation every 30 seconds
**And** unsaved changes are preserved in memory
**And** the status bar shows a warning indicator
**And** the user is prompted to save manually or resolve the issue

### Story 5.7: Implement Manual Save (Ctrl+S / ⌘+S) [Tier 1]

As an author,
I want to manually save my work at any time using a keyboard shortcut,
So that I can ensure important changes are persisted immediately.

**Acceptance Criteria:**

**Given** the author is writing in the editor
**When** the author presses Ctrl+S (Windows/Linux) or ⌘+S (macOS)
**Then** an immediate save is triggered regardless of auto-save timer
**And** the same save logic as auto-save is executed
**And** the status bar shows "Saving..." then "Saved" immediately
**And** a subtle visual feedback confirms the save (brief green flash in status bar)

**Given** no changes have been made since the last save
**When** the author presses Ctrl+S / ⌘+S
**Then** the status bar shows "No changes to save"
**And** no database write occurs (optimization)
**And** a brief toast notification confirms "Already saved"

**Given** the author is working on a chapter
**When** the author switches to a different chapter
**Then** the current chapter is automatically saved before switching
**And** the status bar confirms "Chapter {number} saved"
**And** the new chapter loads with its saved content

### Story 5.8: Implement Undo/Redo in Editor [Tier 1]

As an author,
I want undo and redo functionality in the editor,
So that I can experiment freely and revert changes.

**Acceptance Criteria:**

**Given** the author is writing in the editor
**When** the author makes changes
**Then** each change is recorded in ProseMirror's history plugin
**And** the undo stack maintains up to 100 edit actions per session
**And** the undo/redo state is preserved during auto-save (does not clear history)

**Given** the author has made edits
**When** the author presses Ctrl+Z (or ⌘+Z)
**Then** the most recent edit is undone
**And** the editor content updates immediately
**And** the word count updates accordingly
**And** the redo stack is updated (the undone action can be redone)
**And** the cursor position is restored to before the undone action

**Given** the author has undone one or more actions
**When** the author presses Ctrl+Y (Windows/Linux) or ⌘+Shift+Z (macOS)
**Then** the most recently undone action is redone
**And** the editor content and word count update accordingly
**And** the cursor position is restored

**Given** the author undoes actions and then makes a new edit
**When** the new edit occurs
**Then** the redo stack is cleared (cannot redo past the new edit)
**And** the new edit is added to the undo stack

**Given** the author closes and reopens a chapter
**When** the chapter loads
**Then** the undo/redo stacks are cleared (history does not persist across chapter sessions)
**And** the editor loads the last saved content

### Story 5.9: Implement Crash Recovery [Tier 1]

As an author,
I want the application to recover my unsaved work after a crash,
So that I never lose writing progress due to unexpected failures.

**Acceptance Criteria:**

**Given** the application is running
**When** content changes occur in the editor
**Then** a local crash recovery store is updated every 10 seconds
**And** the recovery store persists: Current chapter ID, ProseMirror document state (JSON), Timestamp of last update, Word count
**And** the recovery store is written to `{app_data}/crash_recovery/{project_id}.json`

**Given** the application crashes or is force-closed
**When** the application is restarted
**Then** the crash recovery system checks for recovery files
**And** if a recovery file exists and is newer than the last database save, the user sees a modal: "Unsaved work detected. Would you like to recover Chapter {number}? Last edited: {timestamp} (X minutes ago)"
**And** options are provided: "Recover" (restores the crash recovery content), "Discard" (deletes the recovery file), "View Changes" (shows diff between saved and recovered content)

**Given** the user clicks "Recover"
**When** the recovery is applied
**Then** the crash recovery content is loaded into the editor
**And** the chapter is marked as modified (unsaved changes indicator)
**And** the user is prompted to save manually
**And** a toast notification confirms: "Work recovered successfully. Press Ctrl+S to save."
**And** the crash recovery file is deleted after successful recovery

**Given** the user clicks "Discard"
**When** the discard action is performed
**Then** the crash recovery file is deleted
**And** the last saved version of the chapter is loaded
**And** no further recovery prompts are shown for this session

**Given** the application closes normally (user quits)
**When** the application shutdown occurs
**Then** all chapters are auto-saved if there are pending changes
**And** crash recovery files are deleted (since everything is saved)
**And** the next launch does not trigger recovery prompts

### Story 5.10: Implement Table of Contents Auto-Generation [Tier 1]

As an author,
I want an automatically generated table of contents,
So that I can navigate my manuscript structure easily.

**Acceptance Criteria:**

**Given** a project has multiple chapters
**When** the table of contents is generated
**Then** the TOC includes all chapters in order with: chapter number, chapter title, word count, completion status (checkmark if meets target)
**And** the TOC is accessible from the main workspace via a "TOC" button in the left sidebar

**Given** the user clicks the "TOC" button
**When** the table of contents modal opens
**Then** the full TOC is displayed in a scrollable list
**And** clicking any chapter in the TOC navigates to that chapter in the editor
**And** the currently open chapter is highlighted in the TOC
**And** a "Close" button or ESC key closes the modal

**Given** the author adds, removes, or reorders chapters
**When** the chapter structure changes
**Then** the TOC automatically updates to reflect the current structure
**And** no manual refresh is required

### Story 5.11: Implement Offline Mode Support [Tier 1]

As an author,
I want to write and edit my manuscript without an internet connection,
So that I can work anywhere without connectivity concerns.

**Acceptance Criteria:**

**Given** the author is working online
**When** the internet connection is lost
**Then** the application detects the offline state
**And** the status bar displays an "Offline" indicator (icon with tooltip)
**And** all writing and editing features continue to work normally
**And** auto-save and manual save continue to function (local database)
**And** AI-related features are disabled with clear messaging

**Given** the application is offline
**When** the user attempts to use AI generation features
**Then** a tooltip or disabled button state explains: "AI features require an internet connection"
**And** the user can still write and edit manually without interruption

**Given** the application is offline
**When** the internet connection is restored
**Then** the application detects the online state
**And** the status bar updates to show "Online"
**And** AI features are automatically re-enabled
**And** a toast notification appears: "You're back online. AI features are now available."

**Given** the author works offline for an extended period
**When** the application is closed and reopened
**Then** all work saved while offline is preserved
**And** the application opens in offline mode if no connection is available
**And** no data is lost due to offline operation

### Story 5.12: Implement Save Status Indicator [Tier 2]

As an author,
I want clear visual feedback about save status,
So that I always know whether my work is saved.

**Acceptance Criteria:**

**Given** the author is viewing the editor
**When** no unsaved changes exist
**Then** the status bar shows "Saved X seconds ago" (relative time, updates every 10 seconds)
**And** the save indicator is styled in neutral/green color

**Given** the author makes edits
**When** content changes occur
**Then** the status bar immediately shows "Unsaved changes"
**And** the indicator changes to amber color
**And** the chapter title in the sidebar shows an unsaved indicator (dot or asterisk)

**Given** auto-save is in progress
**When** the save operation is running
**Then** the status bar shows "Saving..." with a spinner animation
**And** the indicator is styled in blue color

**Given** a save operation completes successfully
**When** the save finishes
**Then** the status bar shows "Saved just now"
**And** the indicator changes to green color
**And** after 10 seconds, the text updates to "Saved X seconds ago"
**And** the unsaved indicator is removed from the chapter title

**Given** a save operation fails
**When** the failure is detected
**Then** the status bar shows "Save failed: {reason}"
**And** the indicator changes to red color
**And** a "Retry" button appears next to the status
**And** the unsaved changes indicator remains visible

### Story 5.13: Implement Chapter Snapshots [Tier 2]

As an author,
I want to create named snapshots of chapters before major revisions,
So that I can safely experiment and revert if needed.

**Acceptance Criteria:**

**Given** the author is editing a chapter
**When** the author right-clicks the chapter in the sidebar (or uses a menu option)
**Then** a "Create Snapshot" option is available
**And** clicking it opens a snapshot creation dialog

**Given** the snapshot creation dialog is open
**When** the author provides a snapshot name
**Then** an input field prompts for a snapshot name (e.g., "Before major revision")
**And** the current chapter content, word count, and timestamp are captured
**And** the snapshot is saved to the chapter_snapshots table
**And** a success toast confirms: "Snapshot '{name}' created"

**Given** snapshots exist for a chapter
**When** the author right-clicks the chapter
**Then** a "View Snapshots" option is available
**And** clicking it opens a snapshots modal

**Given** the snapshots modal is open
**When** the list of snapshots is displayed
**Then** each snapshot shows: snapshot name, creation date/time, word count at time of snapshot, "Restore", "View", and "Delete" buttons
**And** snapshots are sorted by creation date (newest first)

**Given** the author clicks "View" on a snapshot
**When** the snapshot viewer opens
**Then** the snapshot content is displayed in a read-only editor
**And** a side-by-side comparison is available showing the snapshot vs. current version
**And** a "Restore This Version" button is available

**Given** the author clicks "Restore" on a snapshot
**When** the confirmation dialog appears
**Then** the dialog warns: "Restore this snapshot? Your current chapter content will be replaced. Consider creating a snapshot of the current version first."
**And** if confirmed, the snapshot content replaces the current chapter content
**And** the chapter is marked as modified (unsaved)
**And** the author is prompted to save

### Story 5.14: Implement Chapter Comparison (Diff View) [Tier 2]

As an author,
I want to compare two versions of a chapter side-by-side,
So that I can see exactly what changed between versions.

**Acceptance Criteria:**

**Given** the author is viewing snapshots for a chapter
**When** the author selects "Compare" on a snapshot
**Then** a comparison modal opens showing side-by-side panels: Left panel: Snapshot version (read-only), Right panel: Current version (read-only)
**And** differences are highlighted: Deleted text (red background in left panel), Added text (green background in right panel), Modified text (amber background in both panels)

**Given** the comparison view is displayed
**When** differences are highlighted
**Then** the user can scroll through both panels in sync
**And** a navigation bar shows difference counts (e.g., "5 additions, 3 deletions, 2 modifications")
**And** "Previous" and "Next" buttons allow jumping between differences
**And** a "Close" button exits the comparison view

**Given** the author views a comparison
**When** decisions are made about changes
**Then** the author can close the comparison and choose to: Keep current version (no action), Restore snapshot version (replaces current), Manually merge changes (copy/paste between versions)
**And** no automatic merging is performed (user retains full control)

### Story 5.15: Implement Focus Mode [Tier 2]

As an author,
I want a distraction-free focus mode,
So that I can concentrate fully on writing without UI clutter.

**Acceptance Criteria:**

**Given** the author is in the main workspace
**When** the author activates focus mode (button or F11 key)
**Then** the application transitions to fullscreen mode
**And** the left sidebar (chapter list) is hidden
**And** the right sidebar (Story Bible) is hidden
**And** the toolbar is minimized or hidden (appears on hover)
**And** only the editor remains visible with generous padding
**And** the status bar shows only essential info (word count, save status)

**Given** focus mode is active
**When** the author moves the mouse to the top of the screen
**Then** a minimized toolbar appears with: Exit focus mode button, Save button, Word count display, Undo/Redo buttons
**And** the toolbar auto-hides after 3 seconds of inactivity

**Given** focus mode is active
**When** the author presses F11 or ESC
**Then** focus mode exits
**And** the normal three-column layout is restored
**And** the chapter and Story Bible sidebars reappear
**And** the full toolbar is restored

**Given** focus mode is active
**When** the author writes
**Then** the editor provides a distraction-free experience with: Centered text (max-width 800px), Increased line height for readability, Subtle background (genre-themed or neutral), No animations or notifications (except save status)
**And** typing performance remains optimal (60 FPS, <16ms latency)

---

## Epic 6: AI-Powered Story Development & Generation

Authors can use AI to generate supporting characters, settings, themes, dialogue preferences, and full chapters (5,000-8,000 words), with all content assembled using relevant Story Bible context for consistency.

### Story 6.1: Design AI Generation Database Schema [Tier 1]

As a development team,
I want a database schema for tracking AI generation operations and history,
So that we can monitor, debug, and improve generation quality.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V6__create_ai_generation_schema.sql`
**Then** the migration defines an `ai_generations` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), chapter_id (INTEGER, FOREIGN KEY, NULL for non-chapter generations), generation_type (TEXT: 'chapter', 'character', 'setting', 'theme', 'dialogue_prefs'), provider_name (TEXT), model_name (TEXT), prompt_template (TEXT), context_summary (TEXT, brief description of assembled context), input_tokens (INTEGER), output_tokens (INTEGER), generation_time_ms (INTEGER), status (TEXT: 'in_progress', 'completed', 'failed', 'cancelled'), error_message (TEXT), created_at (TIMESTAMP), completed_at (TIMESTAMP)
**And** the schema includes indexes on (project_id, generation_type) and (status, created_at)
**And** a `generation_context_entries` table links which Story Bible entries were used: id (PRIMARY KEY), generation_id (INTEGER, FOREIGN KEY), story_bible_entry_id (INTEGER, FOREIGN KEY), relevance_score (REAL)

**Given** the schema is created
**When** the team tests generation tracking
**Then** generation records can be inserted when AI operations start
**And** records can be updated when operations complete or fail
**And** context entries can be linked to show which Story Bible entries influenced the generation

### Story 6.2: Implement Story Bible Context Assembly [Tier 1]

As a development team,
I want an intelligent context assembly system,
So that AI prompts include the most relevant Story Bible information.

**Acceptance Criteria:**

**Given** a chapter generation is requested
**When** the context assembly process begins
**Then** the system retrieves relevant Story Bible entries using: Semantic search via Qdrant (embeddings of the generation request vs. Story Bible vectors), Category-based inclusion (always include main characters, primary setting, key rules), Recency filtering (prioritize recently added/edited entries), Relationship traversal (include related entries for selected characters/settings)
**And** a relevance score is calculated for each entry (0.0 to 1.0)
**And** entries are ranked by relevance score

**Given** relevant entries are identified
**When** the context is assembled
**Then** the top 20 most relevant entries are selected (or fewer if under context token limit)
**And** entries are organized by category (Characters, Settings, Rules, Themes, Plot Threads)
**And** each entry is formatted as: **[Category] - Title**: Description/Content
**And** the assembled context is a markdown-formatted string

**Given** the context exceeds the AI provider's token limit
**When** pruning is necessary
**Then** lower-relevance entries are removed until the context fits
**And** essential entries (main protagonist, primary setting) are never removed
**And** a warning is logged: "Context pruned: removed {N} entries to fit token limit"
**And** the user is optionally notified if significant pruning occurred

**Given** the Story Bible is empty or has insufficient entries
**When** context assembly runs
**Then** the system assembles a minimal context using: Project genre, story framework, plot premise, target audience/tone
**And** a notification is shown to the user: "Limited Story Bible context. Consider adding characters and settings for better AI generation."

### Story 6.3: Create AI Prompt Templates [Tier 1]

As a development team,
I want structured prompt templates for different generation types,
So that AI outputs are consistent and high-quality.

**Acceptance Criteria:**

**Given** the application needs to generate a chapter
**When** the chapter generation prompt is constructed
**Then** the prompt template includes: System instruction (role: professional novelist, style guidance), Story Bible context (assembled relevant entries), Chapter context (chapter number, position in story framework, previous chapter summary), Generation request (word count target, any user guidance like "add more tension"), Output format instructions (plain text prose, no meta-commentary)
**And** the template is parameterized (uses variables for project-specific values)

**Given** the application needs to generate a character
**When** the character generation prompt is constructed
**Then** the prompt template includes: System instruction (role: character development specialist), Story Bible context (existing characters, settings, plot threads), Character generation request (role in story, relationship to existing characters), Output format (structured: name, description, traits, backstory, relationships)
**And** the user can provide seed information (e.g., "villain who opposes the protagonist")

**Given** the application needs to generate a setting
**When** the setting generation prompt is constructed
**Then** the prompt template includes: System instruction (role: worldbuilding expert), Story Bible context (genre, existing settings, world rules), Setting generation request (type: location/time period/world, purpose in story), Output format (structured: name, description, key features, atmosphere)
**And** the template ensures genre consistency (fantasy setting for fantasy novel, etc.)

**Given** a prompt template is used for generation
**When** the template is populated with actual data
**Then** all variables are replaced with project-specific values
**And** the final prompt is validated for token count
**And** if the prompt exceeds token limits, context pruning is applied
**And** the final prompt is logged (without API keys or sensitive data) for debugging

### Story 6.4: Implement Chapter Generation with Streaming [Tier 1]

As an author,
I want to generate full chapters using AI with real-time streaming,
So that I can see progress and cancel if the output is not what I want.

**Acceptance Criteria:**

**Given** the author has a chapter open in the editor
**When** the author clicks "Generate Chapter" (button or Ctrl+G / ⌘+G)
**Then** a generation configuration modal opens with options: Word count target (default: project target, adjustable 500-15000), User guidance (optional text input: "Make it darker", "Focus on character development"), Story Bible context preview (shows which entries will be included), "Generate" and "Cancel" buttons
**And** if no AI provider is configured, the user is prompted to set one up

**Given** the user clicks "Generate"
**When** the generation process starts
**Then** the modal closes and a generation progress panel opens in the editor area
**And** the editor content is hidden (or replaced) by the progress panel
**And** the progress panel shows: Progress bar (0-100%, updated as generation proceeds), Estimated time remaining (calculated from streaming rate), Real-time word count (updates as text streams in), Preview of generated text (last 200 characters, scrolling), "Cancel Generation" button

**Given** the AI provider streams the generated text
**When** text chunks are received
**Then** the progress bar updates based on estimated completion (word count / target)
**And** the preview area updates with the latest text
**And** the word count indicator updates in real-time
**And** the UI remains responsive (streaming on background thread)
**And** if the generation stalls (no data for 30 seconds), a "Connection timeout" warning is shown

**Given** the generation completes successfully
**When** the AI finishes
**Then** the progress panel is replaced by a "Generation Complete" preview panel
**And** the preview panel shows: Full generated text (scrollable, read-only), Final word count, "Accept", "Regenerate", and "Cancel" buttons
**And** the text is NOT automatically inserted into the editor (requires user approval)

**Given** the user clicks "Accept"
**When** the generated text is approved
**Then** the text is inserted into the editor (replacing any existing content with a warning first)
**And** the chapter is marked as is_generated = 1 in the database
**And** generation metadata (provider, model, tokens used) is saved
**And** the editor returns to normal edit mode
**And** a success toast appears: "Chapter generated successfully. You can now edit it."

**Given** the user clicks "Regenerate"
**When** the regeneration is requested
**Then** the preview panel closes and the generation process starts again
**And** the previous generated text is discarded
**And** the user can optionally provide different guidance

**Given** the user clicks "Cancel Generation" during streaming
**When** the cancellation is triggered
**Then** the AI API request is cancelled (if supported) or ignored
**And** partial generated text is preserved
**And** the user sees a confirmation: "Generation cancelled. Keep partial text?"
**And** if confirmed, the partial text is offered for acceptance
**And** if declined, the editor returns to the previous state

### Story 6.5: Implement Generate Characters, Settings, Themes [Tier 1]

As an author,
I want to use AI to generate supporting story elements,
So that I can quickly flesh out my story world.

**Acceptance Criteria:**

**Given** the author is viewing the Story Bible panel
**When** the author clicks "+" and selects "Generate Character with AI"
**Then** a generation dialog opens with: Character role dropdown (Protagonist, Antagonist, Supporting, Minor), Relationship to existing characters (multi-select), Brief description or seed idea (text input, optional), "Generate" and "Cancel" buttons
**And** a preview of the Story Bible context that will be used is shown

**Given** the user clicks "Generate" for a character
**When** the AI generation runs
**Then** the AI generates structured character data: Name, Physical description, Personality traits, Backstory, Relationships (to existing characters), Role in story
**And** a progress spinner is displayed during generation
**And** the generation completes in <30 seconds

**Given** the character generation completes
**When** the result is displayed
**Then** the user sees a preview of the generated character
**And** "Accept", "Regenerate", and "Edit Before Saving" buttons are available
**And** clicking "Accept" creates a new Story Bible entry with the generated data
**And** clicking "Edit Before Saving" opens the create entry modal pre-filled with the generated data
**And** the user can review and modify before saving

**Given** the author is viewing the Story Bible panel
**When** the author clicks "Generate Setting with AI"
**Then** a similar generation dialog opens with: Setting type (Location, Time Period, World), Purpose in story (text input), Existing setting relationships (optional), "Generate" and "Cancel" buttons
**And** the AI generates structured setting data (name, description, key features, atmosphere)
**And** the same preview/accept/edit workflow applies

**Given** the author is viewing the Story Bible panel
**When** the author clicks "Generate Themes with AI"
**Then** a generation dialog prompts for: Theme category (dropdown: Central Theme, Subtheme, Moral Question), Brief description (optional), "Generate" and "Cancel" buttons
**And** the AI generates theme suggestions: Theme statement, How it relates to the plot, Potential character arcs that explore this theme, Symbolic elements to reinforce the theme
**And** the user can accept, edit, or regenerate the theme

**Given** the user generates multiple story elements
**When** all generations are complete
**Then** each generated entry is linked appropriately in the Story Bible (characters to plot threads, settings to characters, etc.)
**And** embedding vectors are created for semantic search
**And** the Story Bible panel updates to show the new entries

### Story 6.6: Implement Style Profile Detection [Tier 2]

As an author,
I want StoryTeller to detect my writing style from existing chapters,
So that AI-generated content matches my voice.

**Acceptance Criteria:**

**Given** the author has written at least 5,000 words across multiple chapters
**When** the style profile detection is triggered (automatically or manually)
**Then** the system analyzes the author's written chapters using NLP techniques: Sentence length distribution (average, variance), Vocabulary richness (unique words / total words ratio), Common phrases and patterns, Dialogue tags frequency, Paragraph length distribution, Use of literary devices (metaphors, similes)
**And** a style profile is generated and stored in the project metadata

**Given** a style profile exists
**When** AI generation is requested
**Then** the generation prompt includes style guidance extracted from the profile: Average sentence length preference, Vocabulary complexity level, Typical paragraph structure, Dialogue style notes
**And** the AI is instructed to match these stylistic patterns

**Given** the author continues writing
**When** the style profile becomes outdated (e.g., after 20,000 new words)
**Then** the system offers to update the style profile
**And** a notification appears: "Update style profile with recent writing?"
**And** clicking "Update" re-analyzes recent chapters and updates the profile
**And** the updated profile is used for subsequent generations

**Given** the style profile is displayed
**When** the author reviews the detected style
**Then** a "Style Profile" section in Settings shows: Detected sentence length (e.g., "Average: 15 words, prefers variety"), Vocabulary level (e.g., "Moderate complexity"), Dialogue style (e.g., "Uses said/asked primarily, minimal adverbs"), Paragraph structure (e.g., "Short paragraphs, 3-4 sentences average")
**And** the author can manually adjust or override these settings

### Story 6.7: Implement Style Matching in AI Generation [Tier 2]

As an author,
I want AI-generated content to match my existing writing style,
So that the novel feels cohesive and authentic.

**Acceptance Criteria:**

**Given** a style profile has been detected
**When** a chapter is generated
**Then** the generation prompt includes specific style instructions: "Match the author's style: average sentence length {X} words, vocabulary level {Y}, paragraph length {Z} sentences.", "Use similar narrative techniques observed in the author's writing.", "Maintain consistency with the author's dialogue style."
**And** the AI provider processes these style instructions

**Given** a chapter is generated with style matching
**When** the generation completes
**Then** the generated text is analyzed for style adherence
**And** a style match score is calculated (0-100%)
**And** the score is displayed to the user: "Style match: 85% - Close match to your writing"
**And** if the score is low (<70%), a warning is shown: "This chapter may not match your usual style. Consider editing or regenerating."

**Given** the user reviews a generated chapter
**When** style mismatches are identified
**Then** the user can provide feedback: "This doesn't sound like me. Regenerate with stronger style matching."
**And** the feedback is logged for future improvement
**And** regeneration with increased style weight is offered

### Story 6.8: Implement Generation Preview Before Insertion [Tier 1]

As an author,
I want to preview all AI-generated content before it's inserted,
So that I maintain full control over my manuscript.

**Acceptance Criteria:**

**Given** any AI generation completes (chapter, character, setting, etc.)
**When** the result is ready
**Then** the content is displayed in a preview mode (read-only)
**And** the content is NOT automatically inserted or saved
**And** the user must explicitly approve before it affects the manuscript

**Given** a chapter generation preview is displayed
**When** the user reviews the content
**Then** the full generated text is shown in a scrollable panel
**And** the word count is displayed
**And** a warning is shown if existing content will be replaced: "This will replace your current chapter content. Consider creating a snapshot first."
**And** "Accept", "Regenerate", "Edit Before Accepting", and "Cancel" buttons are available

**Given** the user clicks "Edit Before Accepting"
**When** the edit mode is activated
**Then** the generated text is loaded into a temporary editor (not the main editor)
**And** the user can modify the text freely
**And** after edits, clicking "Accept" inserts the edited version
**And** the chapter is marked as "AI-generated then user-edited" (different from fully AI-generated)

**Given** a Story Bible entry generation preview is displayed
**When** the user reviews the content
**Then** the structured data (name, description, relationships) is shown
**And** the user can edit any fields before saving
**And** clicking "Accept" creates the Story Bible entry with the (optionally edited) data

**Given** the user clicks "Cancel" on any generation preview
**When** the cancellation occurs
**Then** the generated content is discarded completely
**And** no database changes are made
**And** the user returns to the previous state

### Story 6.9: Implement Show Context Used in Generation [Tier 2]

As an author,
I want to see which Story Bible entries were used for AI generation,
So that I can understand and verify the consistency logic.

**Acceptance Criteria:**

**Given** a chapter generation preview is displayed
**When** the user reviews the generated content
**Then** an "Info" tab is available in the preview panel
**And** clicking "Info" shows: AI provider and model used, Generation time and token counts, List of Story Bible entries included in the context (with relevance scores), Seed guidance provided by the user (if any)
**And** each Story Bible entry is clickable to view its details

**Given** the context info is displayed
**When** the user reviews the included entries
**Then** entries are grouped by category (Characters, Settings, Rules, etc.)
**And** each entry shows its relevance score (0-100%)
**And** entries are sorted by relevance score (highest first)
**And** a note explains: "These entries were selected based on semantic relevance to this chapter."

**Given** the user is viewing the context info
**When** the user identifies missing or irrelevant entries
**Then** the user can provide feedback: "This entry should have been included" or "This entry was not relevant"
**And** the feedback is logged for future context assembly improvement
**And** the user can manually regenerate with different context (advanced option)

### Story 6.10: Implement Context Pruning for Token Limits [Tier 1]

As a development team,
I want automatic context pruning when approaching token limits,
So that generation works reliably across different AI providers with different limits.

**Acceptance Criteria:**

**Given** the context assembly process has assembled relevant Story Bible entries
**When** the total token count (context + prompt template) is calculated
**Then** the system checks against the provider's context window limit (e.g., 8K, 128K, 200K tokens)
**And** if the total exceeds 80% of the limit, pruning is triggered

**Given** pruning is triggered
**When** the pruning algorithm runs
**Then** entries are prioritized for retention: Essential entries (main protagonist, primary setting, key rules): NEVER pruned, High-relevance entries (score > 0.7): pruned last, Medium-relevance entries (score 0.4-0.7): pruned if necessary, Low-relevance entries (score < 0.4): pruned first
**And** entries are removed in order of increasing relevance until under 75% of token limit
**And** the number of pruned entries is logged

**Given** pruning occurs
**When** the generation proceeds
**Then** the user is notified (if significant pruning occurred): "Context pruned: {N} entries removed to fit token limit. Generation will proceed with {M} entries."
**And** the user can optionally view which entries were pruned
**And** the generation continues with the pruned context

**Given** pruning removes critical information
**When** the user is notified
**Then** the warning is more prominent: "Warning: Significant context pruning occurred. Consider simplifying your Story Bible or using a provider with larger context window."
**And** options are provided: "Proceed Anyway", "Switch Provider", "Simplify Context"

### Story 6.11: Implement Warn Before Overwriting User Edits [Tier 1]

As an author,
I want clear warnings before AI generation overwrites my manually edited content,
So that I never accidentally lose my work.

**Acceptance Criteria:**

**Given** a chapter has existing content that was user-written or user-edited
**When** the author clicks "Generate Chapter"
**Then** a warning modal is displayed before generation starts: "This chapter has existing content. Generating a new chapter will replace it. Consider creating a snapshot first."
**And** options are provided: "Create Snapshot & Generate" (recommended), "Generate Anyway" (dangerous), "Cancel"
**And** the default/recommended action is pre-selected

**Given** the user selects "Create Snapshot & Generate"
**When** the action is performed
**Then** a snapshot is automatically created with the name "Before AI Generation - {timestamp}"
**And** the generation process proceeds
**And** a confirmation toast shows: "Snapshot created. Generating chapter..."

**Given** the user selects "Generate Anyway"
**When** the action is confirmed
**Then** a second confirmation is required: "Are you absolutely sure? Your current content will be lost if you don't accept the generated version."
**And** if confirmed, the generation proceeds without creating a snapshot
**And** the risk is on the user (power user feature)

**Given** a generated chapter has been accepted and then user-edited
**When** the author attempts to regenerate
**Then** the same overwrite warning is shown
**And** the warning emphasizes: "You've made {N} edits to this AI-generated chapter. Regenerating will lose your edits."
**And** creating a snapshot is strongly encouraged

### Story 6.12: Implement Regeneration with User Guidance [Tier 1]

As an author,
I want to provide guidance when regenerating content,
So that I can steer the AI toward my desired outcome.

**Acceptance Criteria:**

**Given** a chapter generation preview is displayed (or a generated chapter is in the editor)
**When** the user clicks "Regenerate"
**Then** a regeneration dialog opens with: Previous user guidance (if any) pre-filled, New guidance text input (e.g., "Make it darker", "Add more tension", "Focus on character development"), "Regenerate" and "Cancel" buttons
**And** the dialog explains: "Your guidance will be added to the generation prompt to refine the output."

**Given** the user provides guidance like "Make it darker"
**When** the regeneration runs
**Then** the prompt template is modified to include: "Previous attempt did not meet expectations. User requests: {guidance}. Adjust tone, themes, and events accordingly."
**And** the generation proceeds with the updated prompt
**And** the guidance is logged for analysis

**Given** multiple regenerations occur for the same chapter
**When** the user provides different guidance each time
**Then** each guidance instance is logged (generation history)
**And** the system learns from the pattern (future improvement: suggest common guidance options)
**And** the user can view previous guidance attempts: "Attempt 1: Make it darker. Attempt 2: Add more character conflict."

**Given** the user provides guidance
**When** the new generation completes
**Then** the preview shows: "Generated with guidance: {guidance}"
**And** the user can compare this attempt with previous attempts (if desired)
**And** the user can continue regenerating with new guidance until satisfied

### Story 6.13: Track User Feedback on Generated Content [Tier 2]

As a development team,
I want to collect user feedback on AI-generated content quality,
So that we can measure and improve generation accuracy over time.

**Acceptance Criteria:**

**Given** a generated chapter is previewed or accepted
**When** the user reviews the content
**Then** a feedback option is available: "Rate this generation" (thumbs up/down) or 1-5 stars
**And** an optional comment field allows detailed feedback
**And** a "Submit Feedback" button sends the feedback

**Given** the user submits feedback
**When** the feedback is processed
**Then** the feedback is stored in the database: generation_id, rating (1-5), comment, timestamp
**And** the feedback is linked to the specific generation record
**And** a thank you message is displayed: "Thank you for your feedback! This helps us improve AI generation quality."

**Given** feedback is collected over time
**When** the development team reviews feedback
**Then** aggregated metrics are available: Average rating per provider/model, Common complaints or issues, Positive feedback patterns, Correlation between context size and quality ratings
**And** this data informs future improvements

---

## Epic 7: Story Bible Intelligence - Validation & Contradiction Detection

Authors receive real-time validation that AI-generated content is consistent with their Story Bible, with contradiction detection before, during, and after generation, plus guided setup and templates.

### Story 7.1: Design Validation Database Schema [Tier 1]

As a development team,
I want a database schema for storing validation results and contradiction reports,
So that we can track validation history and provide detailed reports to users.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V7__create_validation_schema.sql`
**Then** the migration defines a `validation_runs` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), generation_id (INTEGER, FOREIGN KEY, nullable), validation_type (TEXT: 'pre_generation', 'realtime', 'post_generation'), status (TEXT: 'passed', 'warnings', 'failed'), issues_found (INTEGER), critical_issues (INTEGER), created_at (TIMESTAMP), completed_at (TIMESTAMP)
**And** a `validation_issues` table is defined: id (PRIMARY KEY), validation_run_id (INTEGER, FOREIGN KEY), issue_type (TEXT: 'character_inconsistency', 'plot_contradiction', 'world_rule_violation', 'timeline_error'), severity (TEXT: 'critical', 'warning', 'suggestion'), description (TEXT), story_bible_entry_id (INTEGER, FOREIGN KEY, the conflicting entry), generated_text_excerpt (TEXT), suggested_fix (TEXT), is_resolved (BOOLEAN DEFAULT 0), user_action (TEXT: 'accepted', 'dismissed', 'manual_fix')

**Given** the schema is created
**When** validation runs occur
**Then** each validation creates a validation_runs record
**And** detected issues are recorded as validation_issues records
**And** issues are linked to the relevant Story Bible entries

### Story 7.2: Implement Pre-Generation Validation [Tier 1]

As an author,
I want validation to run before AI generation starts,
So that I'm warned about potential issues with my Story Bible setup.

**Acceptance Criteria:**

**Given** the author initiates chapter generation
**When** pre-generation validation runs
**Then** the system checks for: Empty or insufficient Story Bible (warning if < 5 entries), Missing essential entries (no protagonist, no primary setting), Conflicting entries (e.g., two characters with the same name), Incomplete plot threads (active threads with no recent mentions)
**And** validation completes in <5 seconds

**Given** pre-generation validation finds warnings
**When** the results are presented
**Then** a validation report modal is displayed before generation proceeds: "Validation Warnings Found", List of issues with severity indicators, Suggested actions for each issue, "Proceed Anyway", "Fix Issues First", "View Story Bible" buttons
**And** if only minor warnings exist, the user can proceed

**Given** pre-generation validation finds critical issues
**When** the results are presented
**Then** generation is blocked until issues are resolved
**And** the report explains: "Critical issues must be resolved before generation. These issues could result in inconsistent or contradictory content."
**And** the user must click "Fix Issues First" (generation cannot proceed)

**Given** the user clicks "View Story Bible" from the validation report
**When** navigation occurs
**Then** the Story Bible panel is opened and filtered to show only entries related to the issues
**And** the validation report remains accessible (pinned or minimized)
**And** after fixes, the user can re-run validation

### Story 7.3: Implement Post-Generation Validation [Tier 1]

As an author,
I want validation to run after AI generation completes,
So that I'm alerted to any inconsistencies before accepting the content.

**Acceptance Criteria:**

**Given** AI generation completes for a chapter
**When** post-generation validation runs
**Then** the system analyzes the generated text for: Character consistency (names, traits, relationships), Plot continuity (does this align with established plot threads?), World-building adherence (are world rules respected?), Timeline accuracy (does timing make sense?), Emotional arc progression (appropriate emotional beats for story position)
**And** validation completes within 15 seconds (15% overhead per NFR)

**Given** post-generation validation detects issues
**When** the issues are identified
**Then** each issue is categorized by type and severity
**And** the generated text excerpt containing the issue is identified
**And** the conflicting Story Bible entry is referenced
**And** a suggested fix is generated (if possible)

**Given** validation results are ready
**When** the generation preview is displayed
**Then** a "Validation" tab is available in the preview panel
**And** clicking "Validation" shows a detailed report: Summary (e.g., "3 warnings found, 1 critical issue"), List of issues grouped by severity, Each issue shows: Description (e.g., "Marcus's eye color changed from blue to brown"), Excerpt from generated text (highlighted), Conflicting Story Bible entry (clickable link), Suggested fix (e.g., "Change 'brown eyes' to 'blue eyes'")
**And** "Accept Despite Issues", "Regenerate", "Edit Before Accepting" buttons are available

**Given** a critical issue is found
**When** the user attempts to click "Accept"
**Then** a warning is displayed: "Critical validation issue detected. Are you sure you want to accept this content? It contradicts your Story Bible."
**And** the user can still accept (with full awareness of the issue)
**And** the issue is flagged for review

**Given** the user clicks "Edit Before Accepting"
**When** the edit mode opens
**Then** validation issues are highlighted in the text (e.g., red underline for critical, amber for warnings)
**And** hovering over a highlight shows the issue description and suggested fix
**And** the user can manually correct issues before accepting

### Story 7.4: Implement Contradiction Report Generation [Tier 1]

As an author,
I want detailed contradiction reports with references,
So that I can understand and resolve validation issues effectively.

**Acceptance Criteria:**

**Given** validation has detected issues
**When** the contradiction report is generated
**Then** the report includes for each issue: Issue ID (unique identifier), Severity level (critical, warning, suggestion), Issue type (character inconsistency, plot contradiction, world rule violation, timeline error), Description (clear explanation of the problem), Generated text excerpt (with issue highlighted), Story Bible source (the entry that was contradicted), Chapter and line number (where the issue occurs), Suggested resolution (actionable fix)
**And** the report is formatted as structured data (JSON) for programmatic access
**And** a human-readable version is displayed in the UI

**Given** the report is displayed in the UI
**When** the user views the report
**Then** issues are grouped by severity (critical first, then warnings, then suggestions)
**And** each issue is expandable to show full details
**And** clicking the Story Bible source link opens that entry in the Story Bible panel
**And** clicking the chapter reference opens that chapter in the editor (if saved)

**Given** the user reviews an issue
**When** resolution actions are available
**Then** the user can: Mark as "Not an Issue" (false positive feedback), Accept the generated text (override Story Bible), Update the Story Bible (change the conflicting entry), Manually edit the generated text
**And** the user's action is recorded in the validation_issues.user_action field

**Given** multiple validation runs occur over time
**When** the user views validation history
**Then** a "Validation History" section in Settings shows: List of recent validation runs (date, type, issues found), Aggregate statistics (total issues, resolution rate, false positive rate), Ability to view detailed reports for past runs
**And** this data helps track validation system performance

### Story 7.5: Implement Prevent Story Bible Editing During Generation [Tier 1]

As a development team,
I want to block Story Bible edits while AI generation is in progress,
So that we avoid race conditions and inconsistent context.

**Acceptance Criteria:**

**Given** an AI generation is in progress
**When** the author attempts to edit, create, or delete a Story Bible entry
**Then** the action is blocked
**And** a tooltip or modal explains: "Story Bible editing is disabled during AI generation to prevent inconsistencies. Estimated completion: {X} seconds."
**And** the UI visually indicates that Story Bible is locked (e.g., dimmed, lock icon)

**Given** Story Bible is locked during generation
**When** the author hovers over the Story Bible panel
**Then** a status message is displayed: "🔒 Locked during generation"
**And** the estimated time remaining is shown (if available)

**Given** the generation completes, is cancelled, or fails
**When** the final status is reached
**Then** the Story Bible is automatically unlocked
**And** a toast notification confirms: "Story Bible unlocked. You can now make edits."
**And** any pending edits the user attempted are not lost (buffered if possible, or user is notified to retry)

**Given** the generation is taking longer than expected (>5 minutes)
**When** the user is waiting
**Then** an option is provided: "Cancel Generation and Unlock Story Bible"
**And** clicking this cancels the generation and immediately unlocks the Story Bible
**And** partial generated content is preserved (if any)

### Story 7.6: Implement Validation Intensity Configuration [Tier 2]

As an author,
I want to configure validation intensity,
So that I can balance thoroughness with performance based on my needs.

**Acceptance Criteria:**

**Given** the user is in Settings → Validation
**When** the validation configuration is displayed
**Then** a "Validation Intensity" setting is available with options: Fast Mode (pre-generation and post-generation only, realtime disabled), Comprehensive Mode (all three validation layers enabled: pre, realtime, post), Custom Mode (user selects which layers to enable)
**And** the default is "Comprehensive Mode"
**And** performance implications are explained for each mode

**Given** the user selects "Fast Mode"
**When** the setting is saved
**Then** realtime validation during generation is disabled
**And** only pre-generation and post-generation validation run
**And** generation time is faster (no realtime overhead)
**And** a note explains: "Fast Mode reduces generation time but may miss issues that arise during generation."

**Given** the user selects "Comprehensive Mode"
**When** the setting is saved
**Then** all three validation layers are enabled
**And** validation runs before, during, and after generation
**And** maximum consistency checking is performed
**And** generation time includes the 15% realtime validation overhead

**Given** the user selects "Custom Mode"
**When** the configuration panel is displayed
**Then** checkboxes allow enabling/disabling: Pre-generation validation, Realtime validation, Post-generation validation
**And** the user can choose any combination
**And** estimated performance impact is shown for the selected configuration
**And** the configuration is saved per project

### Story 7.7: Implement Guided Story Bible Setup Tutorial [Tier 2]

As a first-time author,
I want a guided tutorial for setting up my Story Bible,
So that I understand how to create effective entries for consistency checking.

**Acceptance Criteria:**

**Given** a new project is created with an empty Story Bible
**When** the main workspace opens
**Then** a tutorial overlay is displayed highlighting the Story Bible panel
**And** the tutorial explains: "The Story Bible is your story's knowledge base. Add characters, settings, and rules here so StoryTeller can keep your novel consistent."
**And** options are provided: "Start Guided Setup" (recommended), "Add Entries Manually", "Skip Tutorial"

**Given** the user clicks "Start Guided Setup"
**When** the guided setup begins
**Then** the setup walks through creating essential entries step-by-step: Step 1: "Let's add your protagonist" → prompts for name, role, key traits, Step 2: "Add your primary setting" → prompts for location/world details, Step 3: "Add a key world rule" → prompts for a rule your story follows (e.g., "Magic requires sacrifice"), Step 4: "Add your main plot thread" → prompts for central conflict/goal
**And** each step includes examples and tips

**Given** the user completes the guided setup
**When** the setup finishes
**Then** the Story Bible has 4 essential entries (protagonist, setting, rule, plot thread)
**And** a success message is displayed: "Great! Your Story Bible is ready. Add more entries as your story develops."
**And** the tutorial overlay closes
**And** a preference is saved to not show the tutorial again
**And** the user can now use AI generation with a functional Story Bible

**Given** the user clicks "Skip Tutorial"
**When** the tutorial is skipped
**Then** the Story Bible remains empty
**And** the user can add entries manually
**And** a "Help" button in the Story Bible panel re-opens the tutorial if needed later

### Story 7.8: Implement Genre-Specific Story Bible Templates [Tier 2]

As an author,
I want pre-configured Story Bible templates for my genre,
So that I can quickly set up my Story Bible with relevant categories and examples.

**Acceptance Criteria:**

**Given** a new project is created with a specific genre (e.g., Fantasy)
**When** the Story Bible setup begins
**Then** the user is offered a genre template: "Use Fantasy Story Bible template? This includes common entries like magic systems, world rules, and character archetypes."
**And** options are provided: "Use Template", "Start from Scratch"

**Given** the user selects "Use Template"
**When** the template is applied
**Then** the Story Bible is pre-populated with template entries: For Fantasy: Magic system rules, World geography/cultures, Character archetypes (Hero, Mentor, Villain), Key locations (e.g., "Kingdom Capital", "Forbidden Forest"), For Thriller: Character motivations/secrets, Timeline (critical for thrillers), Red herrings and plot twists, Setting details (crime scenes, etc.), For Romance: Relationship dynamics, Character emotional arcs, Key romantic moments (meet-cute, first kiss, etc.), Secondary characters (friends, rivals)
**And** all template entries are placeholders that the user can edit or delete
**And** the entries are marked as "template" (user can clear all template entries if desired)

**Given** a template is applied
**When** the user reviews the entries
**Then** each entry has helpful placeholder text: "Example: Magic requires a personal sacrifice. Define your magic system's cost here."
**And** clicking "Edit" allows the user to replace the placeholder with their actual story details

**Given** the user modifies template entries
**When** edits are saved
**Then** the "template" marker is removed (entries become normal Story Bible entries)
**And** the entries are fully integrated into validation and context assembly

### Story 7.9: Implement Contradiction Detection Statistics Tracking [Tier 2]

As a development team,
I want to track contradiction detection statistics,
So that we can measure validation accuracy and identify improvement areas.

**Acceptance Criteria:**

**Given** validation runs occur over time
**When** issues are detected and resolved
**Then** the following statistics are tracked: Total validations run, Total issues detected, Issues by type (character inconsistency, plot contradiction, etc.), Issues by severity (critical, warning, suggestion), User actions (accepted, dismissed, manually fixed), False positives (user marked as "Not an Issue"), False negatives (user manually found contradictions validation missed)
**And** statistics are stored in aggregated form (not individual issue details)

**Given** statistics are collected
**When** the development team reviews metrics
**Then** a validation performance dashboard is available showing: Validation accuracy rate (1 - false positive rate), Issue detection rate (issues found / total validations), User satisfaction (inferred from acceptance rate), Improvement trends over time (as validation improves)
**And** this data informs algorithm tuning and training

**Given** the user is interested in validation performance
**When** the user views validation settings
**Then** an optional "Share Validation Statistics" toggle is available
**And** the toggle explains: "Help us improve validation by sharing anonymous statistics about validation accuracy. No manuscript content is shared."
**And** if enabled, aggregate statistics are sent to the development team (opt-in only)

### Story 7.10: Implement Real-Time Validation (During Generation) [Tier 2]

As an author,
I want validation to run during AI generation in real-time,
So that generation can be corrected or stopped early if major issues are detected.

**Acceptance Criteria:**

**Given** comprehensive validation mode is enabled
**When** AI generation is streaming
**Then** realtime validation runs on each text chunk as it arrives
**And** the validation checks for obvious contradictions (e.g., character name changes mid-generation)
**And** realtime validation adds maximum 15% overhead to generation time (per NFR)

**Given** realtime validation detects a critical issue during generation
**When** the issue is identified mid-stream
**Then** the generation is paused
**And** a modal is displayed: "Critical issue detected during generation: {description}. Options: Continue Anyway, Stop Generation, Regenerate with Correction"
**And** the issue details are shown (what was detected, what it contradicts)

**Given** the user selects "Continue Anyway"
**When** the decision is made
**Then** generation resumes from where it paused
**And** the issue is logged for post-generation validation
**And** the user can review and fix the issue after generation completes

**Given** the user selects "Stop Generation"
**When** the decision is made
**Then** the generation is cancelled immediately
**And** partial generated text is preserved
**And** the user can review what was generated before the issue occurred
**And** the user can attempt regeneration with different guidance

**Given** the user selects "Regenerate with Correction"
**When** the decision is made
**Then** the generation is restarted from the beginning
**And** the validation issue is added to the generation context as a constraint: "Avoid: {issue description}"
**And** the regenerated content is validated again
**And** if the issue persists, the user is notified that the AI may not be following the constraint

**Given** realtime validation completes a full generation without issues
**When** the generation finishes
**Then** a validation success indicator is shown: "✓ No issues detected during generation"
**And** post-generation validation still runs (double-check)
**And** the user can proceed with confidence

---

## Epic 8: Professional Export Pipeline

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

## Epic 9: Productivity & Motivation Features

Authors stay motivated and track their writing journey with milestone achievements, chapter objectives, productivity metrics, and exportable progress reports.

### Story 9.1: Design Productivity Tracking Database Schema [Tier 1]

As a development team,
I want a database schema for tracking writing sessions and productivity metrics,
So that authors can monitor their progress and stay motivated.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V9__create_productivity_schema.sql`
**Then** the migration defines a `writing_sessions` table with fields: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), chapter_id (INTEGER, FOREIGN KEY, nullable), start_time (TIMESTAMP), end_time (TIMESTAMP), words_written (INTEGER), session_duration_seconds (INTEGER), created_at (TIMESTAMP)
**And** a `milestones` table is defined: id (PRIMARY KEY), project_id (INTEGER, FOREIGN KEY), milestone_type (TEXT: 'first_chapter', '10k_words', '50k_words', 'chapter_complete', 'project_complete'), milestone_value (INTEGER), achieved_at (TIMESTAMP), is_celebrated (BOOLEAN DEFAULT 0)
**And** a `chapter_objectives` table is defined: id (PRIMARY KEY), chapter_id (INTEGER, FOREIGN KEY), objective_text (TEXT), is_completed (BOOLEAN DEFAULT 0), completed_at (TIMESTAMP)

### Story 9.2: Implement Writing Session Tracking [Tier 1]

As an author,
I want the application to automatically track my writing sessions,
So that I can see how much time and effort I'm putting into my novel.

**Acceptance Criteria:**

**Given** the author opens a chapter in the editor
**When** the author starts typing
**Then** a writing session is automatically started with start_time, chapter_id, and initial_word_count recorded
**And** the session tracks total words written and duration

**Given** a writing session is active
**When** the author stops writing for 30 minutes
**Then** the session is automatically ended with end_time and final metrics saved

### Story 9.3: Implement Productivity Dashboard [Tier 1]

As an author,
I want a dashboard showing my writing progress and productivity metrics,
So that I can stay motivated and track my goals.

**Acceptance Criteria:**

**Given** the author has written content across multiple sessions
**When** the author opens the Productivity Dashboard
**Then** the dashboard displays: Total project word count vs. target, Current writing streak (consecutive days), Words written today/week/month, Average words per session, Total time spent writing, Chapter completion rate, Milestone achievements (badges)
**And** visual elements include progress bars, charts, and badges

**Given** the author achieves a milestone
**When** the milestone is reached (e.g., 10,000 words)
**Then** a celebration animation is displayed with confetti
**And** a toast notification congratulates the author
**And** the milestone is recorded and displayed on the dashboard

### Story 9.4: Implement Chapter Objectives [Tier 2]

As an author,
I want to define objectives for each chapter,
So that I can track specific goals beyond word count.

**Acceptance Criteria:**

**Given** the author is viewing a chapter
**When** the author right-clicks the chapter
**Then** a "Set Chapter Objectives" option is available
**And** objectives can be added as a checklist
**And** objectives can be marked complete with checkboxes

**Given** all objectives for a chapter are completed
**When** the last objective is checked off
**Then** a celebration animation is displayed
**And** the chapter shows a completion badge

### Story 9.5: Implement Productivity Reports Export [Tier 2]

As an author,
I want to export my productivity data as a report,
So that I can share progress with accountability partners.

**Acceptance Criteria:**

**Given** the author is viewing the Productivity Dashboard
**When** an "Export Report" button is clicked
**Then** report options are displayed: Report period (7 days, 30 days, 90 days, all time), Format (PDF, CSV, JSON), Include charts, Include session details
**And** the report is generated and saved

---

## Epic 10: Cross-Platform Desktop Application & Auto-Update

Authors can install and use StoryTeller seamlessly across Windows, macOS, and Linux, with automatic background updates and easy rollback if needed.

### Story 10.1: Create Platform-Specific Installers [Tier 1]

As a development team,
I want platform-specific installers for Windows, macOS, and Linux,
So that users can install StoryTeller like any native application.

**Acceptance Criteria:**

**Given** the Tauri application is built for release
**When** the build process runs for Windows
**Then** an MSI installer is generated with desktop shortcut, start menu entry, file associations, and uninstaller

**Given** the build process runs for macOS
**When** the macOS bundler is used
**Then** a DMG file is generated with universal binary (Intel and Apple Silicon), code signing, and notarization

**Given** the build process runs for Linux
**When** the Linux bundlers are used
**Then** .deb, .rpm, and .AppImage packages are generated

### Story 10.2: Implement File Type Association [Tier 1]

As an author,
I want .storyteller files to open directly in StoryTeller when double-clicked,
So that I can access my projects quickly from the file explorer.

**Acceptance Criteria:**

**Given** StoryTeller is installed
**When** installation completes
**Then** the .storyteller extension is registered with the OS
**And** double-clicking a .storyteller file launches StoryTeller and opens the project

### Story 10.3: Implement Auto-Update System with Background Downloads [Tier 1]

As an author,
I want StoryTeller to automatically check for and download updates in the background,
So that I always have the latest features without manual effort.

**Acceptance Criteria:**

**Given** StoryTeller launches
**When** the application starts
**Then** an update check is performed in the background
**And** if an update is available, it downloads automatically without interrupting work
**And** the user is notified when the update is ready to install

### Story 10.4: Implement Update Installation and Rollback [Tier 1]

As an author,
I want the ability to rollback to the previous version if an update causes issues,
So that I can continue working if something goes wrong.

**Acceptance Criteria:**

**Given** an update is being installed
**When** the installation begins
**Then** the current version is backed up
**And** the new version is installed
**And** a rollback option is available in Settings if issues occur

### Story 10.5: Implement Cross-Platform UI Consistency [Tier 1]

As an author,
I want StoryTeller to look and feel native on each platform,
So that the application follows platform conventions while maintaining consistency.

**Acceptance Criteria:**

**Given** StoryTeller runs on Windows
**When** the application is displayed
**Then** the UI follows Windows Fluent Design principles

**Given** StoryTeller runs on macOS
**When** the application is displayed
**Then** the UI follows macOS Human Interface Guidelines

**Given** StoryTeller runs on Linux
**When** the application is displayed
**Then** the UI adapts to the system theme

### Story 10.6: Implement Delta Updates [Tier 2]

As an author,
I want updates to download only changed files (delta updates),
So that updates are faster and use less bandwidth.

**Acceptance Criteria:**

**Given** an update is available
**When** the update system calculates the delta
**Then** only changed files are included in the download (60%+ size reduction)
**And** the delta is applied to the existing installation

---

## Epic 11: Accessibility & Internationalization

Authors with disabilities or who speak different languages can use StoryTeller effectively with screen reader support, full keyboard navigation, WCAG 2.1 AA compliance, and multi-language UI.

### Story 11.1: Implement Full Keyboard Navigation [Tier 1]

As an author with motor impairments,
I want to navigate and use all features using only the keyboard,
So that I can write without requiring a mouse.

**Acceptance Criteria:**

**Given** the application is open
**When** the author presses Tab
**Then** focus moves to the next interactive element in logical order with visible 2px blue outline
**And** all features are accessible via keyboard shortcuts

### Story 11.2: Implement ARIA Labels and Screen Reader Support [Tier 1]

As an author who is visually impaired,
I want screen reader compatibility,
So that I can use StoryTeller with assistive technology.

**Acceptance Criteria:**

**Given** the application UI is rendered
**When** the HTML is generated
**Then** all interactive elements have proper ARIA labels
**And** screen readers can announce all content and interactions

### Story 11.3: Implement WCAG 2.1 AA Contrast Requirements [Tier 1]

As an author with low vision,
I want sufficient color contrast,
So that I can read and use the application comfortably.

**Acceptance Criteria:**

**Given** the application UI is designed
**When** colors are chosen
**Then** text-to-background contrast ratios meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
**And** color is not the only indicator for status or information

### Story 11.4: Implement Multi-Language UI Support (i18n) [Tier 1]

As an author who speaks a non-English language,
I want the StoryTeller UI in my preferred language,
So that I can use the application comfortably.

**Acceptance Criteria:**

**Given** StoryTeller launches
**When** the application detects the system language
**Then** the UI is displayed in that language (if supported)
**And** the user can change the UI language in Settings

### Story 11.5: Implement Accessible Touch Targets [Tier 1]

As an author using a touchscreen,
I want interactive elements to be large enough to tap easily,
So that I can use the application without precision issues.

**Acceptance Criteria:**

**Given** the UI is designed
**When** interactive elements are created
**Then** all touch targets are minimum 44x44 pixels with 8px spacing

### Story 11.6: Implement High Contrast Mode [Tier 2]

As an author with low vision,
I want a high contrast mode,
So that I can see the UI clearly without eye strain.

**Acceptance Criteria:**

**Given** the user enables high contrast mode in Settings
**When** the UI is displayed
**Then** text and backgrounds use maximum contrast (white on black or vice versa)
**And** decorative elements are removed for clarity

---

## Epic 12: Beta Program & Telemetry Infrastructure

Product team can collect opt-in anonymous feedback, track quality metrics, validate data loss prevention, and improve the product based on real beta user usage across all platforms.

### Story 12.1: Design Telemetry Database Schema [Tier 1]

As a development team,
I want a database schema for telemetry events and user feedback,
So that we can collect and analyze beta user data effectively.

**Acceptance Criteria:**

**Given** the SQLite database is configured
**When** the team creates migration `V10__create_telemetry_schema.sql`
**Then** tables are defined for telemetry_events, user_feedback, and telemetry_consent
**And** no PII is stored in telemetry data

### Story 12.2: Implement Opt-In Consent Dialog [Tier 1]

As an author,
I want clear control over whether StoryTeller collects anonymous usage data,
So that I can make an informed decision about privacy.

**Acceptance Criteria:**

**Given** StoryTeller launches for the first time
**When** the first-run experience begins
**Then** a telemetry consent dialog is displayed with clear explanation of what data is collected
**And** the user can opt-in or opt-out
**And** the preference is respected permanently

### Story 12.3: Implement Sentry Integration for Crash Reporting [Tier 1]

As a development team,
I want crash reports sent to Sentry,
So that we can diagnose and fix critical issues quickly.

**Acceptance Criteria:**

**Given** StoryTeller is built for beta
**When** an unhandled error occurs
**Then** the error report is sent to Sentry with stack trace, app version, platform, and anonymous user_id
**And** the report excludes all sensitive data (manuscript content, API keys, PII)

### Story 12.4: Implement In-App Feedback Mechanism [Tier 1]

As an author,
I want an easy way to provide feedback or report issues,
So that I can contribute to improving StoryTeller.

**Acceptance Criteria:**

**Given** the user wants to provide feedback
**When** the user clicks the "Feedback" button
**Then** a feedback form is displayed with fields for type (bug, feature, general), subject, description, rating, and optional contact email
**And** submitted feedback is stored and optionally uploaded (if telemetry enabled)

### Story 12.5: Implement Diagnostic Logging with Privacy Safeguards [Tier 1]

As a development team,
I want comprehensive diagnostic logs for troubleshooting,
So that we can diagnose issues while respecting privacy.

**Acceptance Criteria:**

**Given** the application is running
**When** operations occur
**Then** diagnostic events are logged to rotating log files (max 10MB each, 5 files retained)
**And** logs automatically scrub API keys, manuscript content, and PII
**And** users can view, export, or clear logs in Settings

### Story 12.6: Track Beta Program Metrics [Tier 2]

As a development team,
I want to track beta program success metrics,
So that we can measure product quality and readiness for launch.

**Acceptance Criteria:**

**Given** beta users are using StoryTeller
**When** telemetry data is collected
**Then** metrics are tracked: Total user-hours (target: 3,000+), Crash rate (target: <1 per 100 hours), Validation accuracy (FN <5%, FP <10%), Export success rate (target: >95%), Platform distribution (40% Windows, 40% macOS, 20% Linux)
**And** a beta dashboard displays progress toward quality gates

### Story 12.7: Implement Demo Mode [Tier 2]

As a developer or tester,
I want a demo mode with simulated AI responses,
So that I can test features without API costs.

**Acceptance Criteria:**

**Given** demo mode is enabled in Settings
**When** AI generation is triggered
**Then** simulated responses are returned (placeholder text, template characters)
**And** no actual API calls are made
**And** demo mode is clearly indicated in the UI
