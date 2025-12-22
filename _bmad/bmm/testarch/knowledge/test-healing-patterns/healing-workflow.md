# Healing Workflow

1. **Run test** → Capture failure
2. **Identify pattern** → Match error against diagnostic signatures
3. **Apply fix** → Use pattern-based healing strategy
4. **Re-run test** → Validate fix (max 3 iterations)
5. **Mark unfixable** → Use `test.fixme()` if healing fails after 3 attempts
