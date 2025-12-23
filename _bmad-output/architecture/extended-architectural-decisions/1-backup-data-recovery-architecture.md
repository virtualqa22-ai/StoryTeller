# 1. Backup & Data Recovery Architecture

## Problem Statement

StoryTeller has a **zero data loss requirement** (99.99% reliability). A single data loss incident during beta would destroy reputation. We need a comprehensive backup and recovery system.

## Architectural Decisions

**Decision: Automatic backup location (no user configuration)**
- Backups stored in `{app_data}/backups/` automatically
- Users cannot configure backup location (reduces complexity and support burden)
- Future consideration: Optional encrypted cloud backup

**Decision: Rolling window backup strategy**

| Backup Type | Interval | Retention | Purpose |
|-------------|----------|-----------|---------|
| Auto-save | 30 seconds | Current session | Crash recovery |
| Quick backup | 5 minutes | 10 rolling | Recent work recovery |
| Session backup | On close | 5 rolling | Session recovery |
| Daily backup | 24 hours | 7 rolling | Historical recovery |
| Manual export | User-initiated | Unlimited | Archive/transfer |

## Component Structure

```
src-tauri/src/backup/
├── mod.rs              # Public API
├── scheduler.rs        # Background backup scheduler
├── snapshot.rs         # Point-in-time snapshot creation
├── storage.rs          # Backup file management
├── recovery.rs         # Restore and conflict resolution
└── tests.rs
```

## Implementation Details

**SQLite Backup Implementation:**
- Uses SQLite Online Backup API for consistency
- Non-blocking, copy-on-write approach
- Allows concurrent reads during backup

```rust
pub async fn create_backup(
    source: &Connection,
    backup_path: &Path,
) -> Result<BackupMetadata, AppError> {
    let backup = source.backup(DatabaseName::Main, backup_path)?;

    while backup.step(100)? != Done {
        tokio::task::yield_now().await;
    }

    let metadata = BackupMetadata {
        id: Uuid::new_v4(),
        timestamp: Utc::now(),
        size_bytes: fs::metadata(backup_path)?.len(),
        project_count: count_projects(source)?,
        checksum: calculate_sha256(backup_path)?,
    };

    Ok(metadata)
}
```

**Backup File Structure:**

```
{app_data}/backups/
├── auto/                          # Auto-saves (volatile)
│   └── session_{timestamp}.db
├── rolling/                       # 5-minute rolling backups
│   ├── backup_001.db
│   └── backup_010.db
├── daily/                         # Daily backups
│   └── 2025-12-22.db
├── exports/                       # User-initiated exports
│   └── StoryTeller_Export_2025-12-22.zip
└── backup_index.json             # Metadata for all backups
```

**ZIP Export Format:**

```
StoryTeller_Export_2025-12-22.zip
├── storyteller.db                 # Main database
├── qdrant/                        # Vector store snapshot
│   └── collection_snapshot.tar
├── prompts/                       # Custom user prompts
│   └── *.md
├── manifest.json                  # Version, checksums, metadata
└── README.txt                     # Instructions for restore
```

**Recovery Flow:**
1. Show backup list with timestamp, project count, size, integrity status
2. Verify backup integrity (checksum validation)
3. Create safety backup of current state first
4. Restore database and rebuild vector indices
5. Show recovery report with items restored and any conflicts

**Conflict Resolution:**

```rust
pub enum ConflictResolution {
    KeepLocal,           // Discard backup version
    KeepBackup,          // Overwrite with backup
    KeepBoth,            // Duplicate with suffix
    AskUser(ConflictUI), // Show UI for each conflict
}
```

**Required Fault Injection Tests:**

| Test Scenario | Method | Expected Outcome |
|---------------|--------|------------------|
| Crash during save | Kill process mid-write | Recovery from last backup |
| Disk full | Mock fs with no space | Graceful error, no corruption |
| Corrupted backup | Inject bad bytes | Checksum failure, skip backup |
| Power loss simulation | SIGKILL during backup | WAL recovery works |

---
