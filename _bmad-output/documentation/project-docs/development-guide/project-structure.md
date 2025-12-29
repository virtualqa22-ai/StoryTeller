# Project Structure

## Frontend (`src/`)

```
src/
├── lib/                         # Shared library code
│   ├── api/                     # Tauri command wrappers
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   └── projects/           # Domain components
│   └── utils/                   # Utility functions
├── routes/                      # SvelteKit pages
│   ├── +layout.svelte          # Root layout
│   └── +page.svelte            # Home page
└── app.css                      # Global styles
```

## Backend (`src-tauri/`)

```
src-tauri/
├── src/
│   ├── lib.rs                  # App initialization
│   ├── main.rs                 # Entry point
│   └── db/                     # Database layer
│       ├── commands/           # Tauri command handlers
│       ├── models/             # Data structures
│       ├── connection.rs       # SQLite connection
│       ├── migrations.rs       # Migration runner
│       └── projects.rs         # CRUD operations
└── migrations/                  # SQL migration files
```

---
