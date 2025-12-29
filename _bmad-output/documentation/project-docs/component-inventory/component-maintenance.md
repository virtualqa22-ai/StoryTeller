# Component Maintenance

## Updating a Component
1. Read existing component and tests
2. Make changes following existing patterns
3. Update tests to cover new behavior
4. Run `pnpm check` to validate TypeScript
5. Run `pnpm test` to ensure tests pass
6. Update this inventory if props/behavior changes

## Deprecating a Component
1. Mark as deprecated in component documentation
2. Add console warning when component is used
3. Update all usages to new component
4. Remove after one version deprecation period

---

**Last Updated:** 2025-12-29
**Total Components:** 27
**Test Coverage:** 74% (20/27 components tested)
