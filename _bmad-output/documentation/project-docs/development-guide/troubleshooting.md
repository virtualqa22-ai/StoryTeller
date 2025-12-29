# Troubleshooting

## Common Issues

### Port 1420 Already in Use
```bash
# Kill process using port 1420
# Windows
netstat -ano | findstr :1420
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :1420
kill -9 <PID>
```

### Tauri Build Fails
```bash
# Clear Rust cache
cd src-tauri
cargo clean
cargo build
```

### Migration Errors
- Check migration syntax (SQL must be valid SQLite)
- Ensure version numbers are sequential (V1, V2, V3, ...)
- Cannot modify already-applied migrations

---
