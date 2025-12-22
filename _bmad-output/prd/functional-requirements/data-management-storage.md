# Data Management & Storage

- FR83: System stores all project data locally on user's computer
- FR84: System saves projects to default location (~/Documents/StoryTeller/Projects/)
- FR85: Users can choose custom project storage location
- FR86: System uses custom .storyteller file extension for project files
- FR87: System associates .storyteller files with the application
- FR88: Users can open .storyteller files by double-clicking in file explorer
- FR90: System prevents data loss through crash recovery with automatic work restoration
- FR91: System stores user settings and preferences in OS-specific userData directory
- FR92: System maintains project metadata for recent projects list
- FR93: System manages memory efficiently when multiple large projects are open
- FR94: System provides diagnostic mode for troubleshooting data corruption or project loading issues
- FR141: Users can export Story Bible as standalone JSON/XML file for backup or migration
- FR142: System prevents file corruption by locking project files when open (prevents multiple instances editing same project)
- FR193: System explicitly operates in local-only mode with no cloud synchronization (intentional constraint)
- FR218: System detects external project file deletion and prompts user to save to new location
- FR219: System handles mid-operation disk space exhaustion with graceful failure and state preservation
