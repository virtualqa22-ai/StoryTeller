# Future Enhancements

## Planned Commands
- `search_projects(query: string)` - Full-text search
- `export_project(id: number, format: string)` - Export to DOCX/PDF/ePub
- `import_project(path: string)` - Import existing project file
- `get_project_stats(id: number)` - Word count, chapter progress, etc.

## Optimization Opportunities
- Async command handlers (use `tokio` for async SQLite)
- Connection pooling (use `r2d2` or similar)
- Batch operations (bulk create/update/delete)

---

**Last Updated:** 2025-12-29
