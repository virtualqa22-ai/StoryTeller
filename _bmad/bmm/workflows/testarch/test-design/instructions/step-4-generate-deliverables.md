# Step 4: Generate Deliverables

## Actions

1. **Create Risk Assessment Matrix**

   Use template structure:

   ```markdown
   | Risk ID | Category | Description | Probability | Impact | Score | Mitigation      |
   | ------- | -------- | ----------- | ----------- | ------ | ----- | --------------- |
   | R-001   | SEC      | Auth bypass | 2           | 3      | 6     | Add authz check |
   ```

2. **Create Coverage Matrix**

   ```markdown
   | Requirement | Test Level | Priority | Risk Link | Test Count | Owner |
   | ----------- | ---------- | -------- | --------- | ---------- | ----- |
   | Login flow  | E2E        | P0       | R-001     | 3          | QA    |
   ```

3. **Document Execution Order**

   ```markdown
   ### Smoke Tests (<5 min)

   - Login successful
   - Dashboard loads

   ### P0 Tests (<10 min)

   - [Full P0 list]

   ### P1 Tests (<30 min)

   - [Full P1 list]
   ```

4. **Include Resource Estimates**

   ```markdown
   ### Test Effort Estimates

   - P0 scenarios: 15 tests × 2 hours = 30 hours
   - P1 scenarios: 25 tests × 1 hour = 25 hours
   - P2 scenarios: 40 tests × 0.5 hour = 20 hours
   - **Total:** 75 hours (~10 days)
   ```

5. **Add Gate Criteria**

   ```markdown
   ### Quality Gate Criteria

   - All P0 tests pass (100%)
   - P1 tests pass rate ≥95%
   - No high-risk (score ≥6) items unmitigated
   - Test coverage ≥80% for critical paths
   ```

6. **Write to Output File**

   Save to `{output_folder}/test-design-epic-{epic_num}.md` using template structure.

---
