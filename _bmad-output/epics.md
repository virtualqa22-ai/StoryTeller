---
stepsCompleted: [1, 2]
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
