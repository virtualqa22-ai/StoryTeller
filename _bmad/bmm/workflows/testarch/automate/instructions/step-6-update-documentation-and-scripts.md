# Step 6: Update Documentation and Scripts

## Actions

1. **Update Test README**

   If `{update_readme}` is true:

   Create or update `tests/README.md` with:
   - Overview of test suite structure
   - How to run tests (all, specific files, by priority)
   - Fixture and factory usage examples
   - Priority tagging convention ([P0], [P1], [P2], [P3])
   - How to write new tests
   - Common patterns and anti-patterns

   **Example section:**

   ````markdown
   ## Running Tests

   ```bash
   # Run all tests
   npm run test:e2e

   # Run by priority
   npm run test:e2e -- --grep "@P0"
   npm run test:e2e -- --grep "@P1"

   # Run specific file
   npm run test:e2e -- user-authentication.spec.ts

   # Run in headed mode
   npm run test:e2e -- --headed

   # Debug specific test
   npm run test:e2e -- user-authentication.spec.ts --debug
   ```
   ````

   ## Priority Tags
   - **[P0]**: Critical paths, run every commit
   - **[P1]**: High priority, run on PR to main
   - **[P2]**: Medium priority, run nightly
   - **[P3]**: Low priority, run on-demand

   ```

   ```

2. **Update package.json Scripts**

   If `{update_package_scripts}` is true:

   Add or update test execution scripts:

   ```json
   {
     "scripts": {
       "test:e2e": "playwright test",
       "test:e2e:p0": "playwright test --grep '@P0'",
       "test:e2e:p1": "playwright test --grep '@P1|@P0'",
       "test:api": "playwright test tests/api",
       "test:component": "playwright test tests/component",
       "test:unit": "vitest"
     }
   }
   ```

3. **Run Test Suite**

   If `{run_tests_after_generation}` is true:
   - Run full test suite locally
   - Capture results (passing/failing counts)
   - Verify no flaky patterns (tests should be deterministic)
   - Document any setup requirements or known issues

---
