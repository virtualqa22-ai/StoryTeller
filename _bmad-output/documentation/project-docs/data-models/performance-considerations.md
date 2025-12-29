# Performance Considerations

## Index Strategy
- Index columns used in `WHERE` clauses (`id`, `file_path`)
- Index columns used in `ORDER BY` clauses (`last_opened_at`, `created_at`)
- Index DESC order to match query patterns

## Query Optimization
- Use parameterized queries (avoid SQL parsing overhead)
- Limit result sets with `LIMIT` clause
- SQLite query planner uses indexes automatically

## WAL Mode Benefits
- Better concurrent read/write performance
- Readers don't block writers
- Writers don't block readers

---
