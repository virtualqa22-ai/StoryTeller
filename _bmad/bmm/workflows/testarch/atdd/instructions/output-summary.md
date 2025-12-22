# Output Summary

After completing this workflow, provide a summary:

```markdown
# ATDD Complete - Tests in RED Phase

**Story**: {story_id}
**Primary Test Level**: {primary_level}

**Failing Tests Created**:

- E2E tests: {e2e_count} tests in {e2e_files}
- API tests: {api_count} tests in {api_files}
- Component tests: {component_count} tests in {component_files}

**Supporting Infrastructure**:

- Data factories: {factory_count} factories created
- Fixtures: {fixture_count} fixtures with auto-cleanup
- Mock requirements: {mock_count} services documented

**Implementation Checklist**:

- Total tasks: {task_count}
- Estimated effort: {effort_estimate} hours

**Required data-testid Attributes**: {data_testid_count} attributes documented

**Next Steps for DEV Team**:

1. Run failing tests: `npm run test:e2e`
2. Review implementation checklist
3. Implement one test at a time (RED → GREEN)
4. Refactor with confidence (tests provide safety net)
5. Share progress in daily standup

**Output File**: {output_file}

**Knowledge Base References Applied**:

- Fixture architecture patterns
- Data factory patterns with faker
- Network-first route interception
- Component TDD strategies
- Test quality principles
```

---
