# Integration Issues (Brownfield)

## Problem: New code conflicts with existing architecture

**Symptoms:**

- Integration approach doesn't fit existing structure
- Would require major refactoring
- Conflicts with established patterns

**Solution:**

1. **Check if document-project was run** - Agents need architecture context
2. **Review existing architecture docs**:
   - Read docs/architecture.md (from document-project)
   - Understand current system design
3. **For Level 3-4**:
   - Run validate-architecture workflow before planning
   - Use integration-planning workflow
4. **Explicitly document integration strategy** in architecture:
   - How new components fit existing structure
   - What modifications needed to existing code
   - Migration path if changing patterns

## Problem: Breaking changes to existing APIs

**Symptoms:**

- Changing API breaks consumers
- Downstream services affected
- Need backward compatibility

**Solution:**

1. **Identify all API consumers** (document-project should show this)
2. **Plan versioning strategy**:
   - API v1 (existing) + v2 (new)
   - Deprecation timeline
3. **Use feature flags** for gradual rollout
4. **Document migration guide** for API consumers
5. **Add to testing strategy**:
   - Existing consumers still work (v1)
   - New functionality works (v2)

## Problem: Data migration required

**Symptoms:**

- Schema changes needed
- Existing data needs transformation
- Risk of data loss

**Solution:**

1. **Create explicit migration strategy** in architecture:
   - Forward migration (old → new schema)
   - Rollback plan (new → old schema)
   - Data validation approach
2. **Test migrations thoroughly**:
   - On copy of production data
   - Measure performance impact
3. **Plan rollout**:
   - Staging environment first
   - Gradual production rollout
   - Monitoring for issues
4. **Document in tech-spec/architecture**:
   - Migration scripts
   - Rollback procedures
   - Expected downtime

---
