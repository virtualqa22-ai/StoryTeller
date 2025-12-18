# 7. Local Data Storage

## 7.1 IndexedDB vs. SQLite Comparison

**Storage Comparison for Desktop Apps:** ([StackShare](https://stackshare.io/stackups/indexeddb-vs-sqlite), [RxDB](https://rxdb.info/articles/localstorage-indexeddb-cookies-opfs-sqlite-wasm.html), [RxDB Electron](https://rxdb.info/electron-database.html), [LogRocket](https://blog.logrocket.com/offline-first-frontend-apps-2025-indexeddb-sqlite/))

| Factor | SQLite | IndexedDB | Winner |
|--------|--------|-----------|--------|
| **Data Model** | Relational (tables, SQL) | NoSQL (key-value pairs) | **SQLite** (structured data) |
| **Query Language** | SQL (powerful, standardized) | JavaScript API methods | **SQLite** (SQL queries) |
| **Performance** | Excellent (native, file-based) | Moderate (browser security layers) | **SQLite** |
| **Storage Location** | Single file on filesystem | Browser storage | **SQLite** (portable) |
| **Indexing** | Full SQL indexing | Supports indexing | **Tie** |
| **Async Support** | Yes (with libraries) | Native async | **IndexedDB** |
| **Desktop Integration** | Native, mature | Browser-based | **SQLite** |
| **Backup/Export** | Copy file | More complex | **SQLite** |
| **Size Limit** | Filesystem limit (TBs) | Several GB (browser-dependent) | **SQLite** |

## 7.2 Detailed Analysis

**SQLite Characteristics:** ([StackShare](https://stackshare.io/stackups/indexeddb-vs-sqlite))
- "**SQLite is a serverless and file-based database** that stores data in a **single file** on the file system"
- "Mainly supports **structured data** in the form of tables, much like traditional relational databases"
- "Uses **SQL for querying** and provides a wide range of SQL statements for data retrieval and modification"

**IndexedDB Characteristics:**
- "**In-built database provided by web browsers** that stores data in structured manner within browser itself"
- "Stores data as **key-value pairs in a NoSQL format**, allowing for flexible and schema-less data storage"
- "**IndexedDB is slow**, mostly because it has to go through **layers of browser security** and abstractions" ([RxDB](https://rxdb.info/articles/localstorage-indexeddb-cookies-opfs-sqlite-wasm.html))

**Electron-Specific Guidance:** ([RxDB Electron](https://rxdb.info/electron-database.html))
- "In production for Electron, it is recommended to use the **SQLite RxStorage** or the Filesystem RxStorage in the **main process**"
- "So that database operations do **not block the rendering of the UI**"
- "Using **SQLite in Electron is not possible in the renderer process**, only in the main process"

**Modern Trend:**
- "Running **SQLite directly in the browser** through WebAssembly"
- "Projects such as **sql.js and wa-sqlite** maturing to point where you can run a full SQL database, with millions of rows, **entirely on the client**" ([LogRocket](https://blog.logrocket.com/offline-first-frontend-apps-2025-indexeddb-sqlite/))

## 7.3 Storage Recommendation for StoryTeller

**Recommended: SQLite (Main Process)**

**Justification:**
1. **Data model fit**: Projects, chapters, characters, plots are relational
2. **Desktop app**: Not browser-based, so native SQLite advantages apply
3. **Performance**: "SQLite **better performance** than IndexedDB" for desktop
4. **Portability**: Single file = easy backup, sync, transfer
5. **SQL queries**: Complex queries for reports, searches, analytics
6. **Proven**: Mature, stable, used by Scrivener and many writing apps

**Implementation:**
- SQLite in Tauri/Electron main process
- Rust/Node.js bindings
- Async queries to avoid UI blocking
- Separate database file per project (portable projects)

**Schema Design:**
```sql
-- Projects
CREATE TABLE projects (id, name, genre, created_at, ...);

-- Chapters
CREATE TABLE chapters (id, project_id, number, title, content, word_count, ...);

-- Characters
CREATE TABLE characters (id, project_id, name, description, traits, ...);

-- Plot Threads
CREATE TABLE plot_threads (id, project_id, name, status, introduced_chapter, ...);

-- Story Bible Rules
CREATE TABLE story_rules (id, project_id, rule_type, category, content, critical, ...);

-- Full-text search indexes for content
```

---
