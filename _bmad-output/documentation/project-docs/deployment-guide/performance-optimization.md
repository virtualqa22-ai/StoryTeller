# Performance Optimization

## Bundle Size Reduction

1. **Remove unused dependencies:**
```bash
pnpm prune
```

2. **Optimize frontend build:**
```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
};
```

3. **Strip Rust debug symbols:**
```toml
# Cargo.toml
[profile.release]
strip = true
lto = true
opt-level = "z"
```

---
