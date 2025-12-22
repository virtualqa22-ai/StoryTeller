# Step 6: Generate Deliverables

## Actions

1. **Create ATDD Checklist Document**

   Use template structure at `{installed_path}/atdd-checklist-template.md`:
   - Story summary
   - Acceptance criteria breakdown
   - Test files created (with paths)
   - Data factories created
   - Fixtures created
   - Mock requirements
   - Required data-testid attributes
   - Implementation checklist
   - Red-green-refactor workflow
   - Execution commands

2. **Verify All Tests Fail**

   Before finalizing:
   - Run full test suite locally
   - Confirm all tests in RED phase
   - Document expected failure messages
   - Ensure failures are due to missing implementation, not test bugs

3. **Write to Output File**

   Save to `{output_folder}/atdd-checklist-{story_id}.md`

---
