# Best Practices

## 1. Always Document First

Even if you know the code, AI agents need `document-project` output for context. Run it before planning.

## 2. Be Specific About Current Work

When workflow-init asks about your work:

- ✅ "Update payment method enums to include Apple Pay"
- ❌ "Fix stuff"

## 3. Choose Right Documentation Approach

- **Has good docs, no index?** → Run `index-docs` task (fast)
- **No docs or need codebase analysis?** → Run `document-project` (Deep scan)

## 4. Respect Existing Patterns

Tech-spec and create-story workflows will detect conventions from existing documentation. Follow them unless explicitly modernizing.

## 5. Plan Integration Points Explicitly

Document in tech-spec/architecture:

- Which existing modules you'll modify
- What APIs/services you'll integrate with
- How data flows between new and existing code

## 6. Design for Gradual Rollout

- Use feature flags for new functionality
- Plan rollback strategies
- Maintain backward compatibility
- Create migration scripts if needed

## 7. Test Integration Thoroughly

- Regression testing of existing features
- Integration point validation
- Performance impact assessment
- API contract verification

## 8. Use Sprint Planning Effectively

- Run `sprint-planning` at Phase 4 start
- Context epics before creating stories
- Update `sprint-status.yaml` as work progresses

## 9. Learn Continuously

- Run `retrospective` after each epic
- Incorporate learnings into next stories
- Update discovered patterns
- Share insights across team

---
