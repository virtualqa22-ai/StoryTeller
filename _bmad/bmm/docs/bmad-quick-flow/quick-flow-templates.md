# Quick Flow Templates

## Tech Spec Template

```markdown
# Tech-Spec: {Feature Title}

**Created:** {date}
**Status:** Ready for Development
**Estimated Effort:** Small (1-2 days)

# Overview

## Problem Statement

{Clear description of what needs to be solved}

## Solution

{High-level approach to solving the problem}

## Scope (In/Out)

**In:** {What will be implemented}
**Out:** {Explicitly excluded items}

# Context for Development

## Codebase Patterns

{Key patterns to follow, conventions}

## Files to Reference

{List of relevant files and their purpose}

## Technical Decisions

{Important technical choices and rationale}

# Implementation Plan

## Tasks

- [ ] Task 1: {Specific implementation task}
- [ ] Task 2: {Specific implementation task}
- [ ] Task 3: {Testing and validation}

## Acceptance Criteria

- [ ] AC 1: {Given/When/Then format}
- [ ] AC 2: {Given/When/Then format}

# Additional Context

## Dependencies

{External dependencies or prerequisites}

## Testing Strategy

{How the feature will be tested}

## Notes

{Additional considerations}
```

## Quick Dev Commands

```bash
# From tech spec
quick-dev sprint-artifacts/tech-spec-user-auth.md

# Direct development
quick-dev "Add CORS middleware to API endpoints"
quick-dev "Fix null pointer exception in user service"
quick-dev "Optimize database query for user list"

# With optional planning
quick-dev "Implement file upload feature" --plan
```

---
