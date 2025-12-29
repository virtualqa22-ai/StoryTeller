# Field Constraints & Validation

## Required Fields

| Field | Context | Validation |
|-------|---------|------------|
| `title` | Always | Must be non-empty |
| `file_path` | Always | Must be non-empty and unique |
| `language` | NewProject | Defaults to `"en"` if not provided |

## Optional Fields

All other fields are optional (can be `NULL`/`None`/`null`).

## Length Constraints

| Field | Max Length | Enforced Where |
|-------|-----------|----------------|
| `tagline` | 150 characters | Rust validation |
| `plot_premise` | 2000 characters | Rust validation |

**Note:** These are application-level constraints, NOT database constraints. SQLite TEXT columns have no inherent length limit.

## Unique Constraints

| Field | Constraint | Purpose |
|-------|-----------|---------|
| `file_path` | UNIQUE | Prevent duplicate project entries |

**Behavior:** Attempting to insert duplicate `file_path` throws `UNIQUE constraint failed` error.

---
