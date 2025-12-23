# Trigger Naming Conventions

## Action-Based (Recommended)

```yaml
# Creation
- trigger: create-prd
- trigger: build-module
- trigger: generate-report

# Analysis
- trigger: analyze-requirements
- trigger: review-code
- trigger: validate-architecture

# Operations
- trigger: update-status
- trigger: sync-data
- trigger: deploy-changes
```

## Domain-Based

```yaml
# Development
- trigger: brainstorm
- trigger: architect
- trigger: refactor

# Project Management
- trigger: sprint-plan
- trigger: retrospective
- trigger: standup
```

## Bad Patterns

```yaml
# TOO VAGUE
- trigger: do
- trigger: run
- trigger: process

# TOO LONG
- trigger: create-comprehensive-product-requirements-document

# NO VERB
- trigger: prd
- trigger: config
```
