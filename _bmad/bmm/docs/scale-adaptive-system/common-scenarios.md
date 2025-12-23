# Common Scenarios

## Scenario 1: Bug Fix (Quick Flow)

**Input**: "Fix email validation bug in login form"

**Detection**: Keywords "fix", "bug"

**Track**: Quick Flow

**Workflow**:

1. (Optional) Brief analysis
2. Tech-spec with single story
3. Implement immediately

**Time**: 2-4 hours total

---

## Scenario 2: Small Feature (Quick Flow)

**Input**: "Add OAuth social login (Google, GitHub, Facebook)"

**Detection**: Keywords "add", "feature", clear scope

**Track**: Quick Flow

**Workflow**:

1. (Optional) Research OAuth providers
2. Tech-spec with 3 stories
3. Implement story-by-story

**Time**: 1-3 days

---

## Scenario 3: Customer Portal (BMad Method)

**Input**: "Build customer portal with dashboard, tickets, billing"

**Detection**: Keywords "portal", "dashboard", multiple features

**Track**: BMad Method

**Workflow**:

1. (Recommended) Product Brief
2. PRD (FRs/NFRs)
3. (If UI) UX Design
4. Architecture (system design)
5. Create Epics and Stories
6. Implementation Readiness Check
7. Implement with sprint planning

**Time**: 1-2 weeks

---

## Scenario 4: E-commerce Platform (BMad Method)

**Input**: "Build e-commerce platform with products, cart, checkout, admin, analytics"

**Detection**: Keywords "platform", multiple subsystems

**Track**: BMad Method

**Workflow**:

1. Research + Product Brief
2. Comprehensive PRD (FRs/NFRs)
3. UX Design (recommended)
4. System Architecture (required)
5. Create Epics and Stories
6. Implementation Readiness Check
7. Implement with phased approach

**Time**: 3-6 weeks

---

## Scenario 5: Brownfield Addition (BMad Method)

**Input**: "Add search functionality to existing product catalog"

**Detection**: Brownfield + moderate complexity

**Track**: BMad Method (not Quick Flow)

**Critical First Step**:

1. **Run document-project** to analyze existing codebase

**Then Workflow**:

2. PRD for search feature (FRs/NFRs)
3. Architecture (integration design - highly recommended)
4. Create Epics and Stories
5. Implementation Readiness Check
6. Implement following existing patterns

**Time**: 1-2 weeks

**Why Method not Quick Flow?**: Integration with existing catalog system benefits from architecture planning to ensure consistency.

---

## Scenario 6: Multi-tenant Platform (Enterprise Method)

**Input**: "Add multi-tenancy to existing single-tenant SaaS platform"

**Detection**: Keywords "multi-tenant", enterprise scale

**Track**: Enterprise Method

**Workflow**:

1. Document-project (mandatory)
2. Research (compliance, security)
3. PRD (multi-tenancy requirements - FRs/NFRs)
4. Architecture (tenant isolation design)
5. Create Epics and Stories
6. Security Architecture (data isolation, auth)
7. DevOps Strategy (tenant provisioning, monitoring)
8. Test Strategy (tenant isolation testing)
9. Implementation Readiness Check
10. Phased implementation

**Time**: 3-6 months

---
