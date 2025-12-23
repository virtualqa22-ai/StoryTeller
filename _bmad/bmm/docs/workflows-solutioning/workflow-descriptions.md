# Workflow Descriptions

## architecture

**Purpose:** Make technical decisions explicit to prevent agent conflicts. Produces decision-focused architecture document optimized for AI consistency.

**Agent:** Architect

**When to Use:**

- Multi-epic projects (BMad Complex, Enterprise)
- Cross-cutting technical concerns
- Multiple agents implementing different parts
- Integration complexity exists
- Technology choices need alignment

**When to Skip:**

- Quick Flow (simple changes)
- BMad Method Simple with straightforward tech stack
- Single epic with clear technical approach

**Adaptive Conversation Approach:**

This is NOT a template filler. The architecture workflow:

1. **Discovers** technical needs through conversation
2. **Proposes** architectural options with trade-offs
3. **Documents** decisions that prevent agent conflicts
4. **Focuses** on decision points, not exhaustive documentation

**Key Outputs:**

**architecture.md** containing:

1. **Architecture Overview** - System context, principles, style
2. **System Architecture** - High-level diagram, component interactions, communication patterns
3. **Data Architecture** - Database design, state management, caching, data flow
4. **API Architecture** - API style (REST/GraphQL/gRPC), auth, versioning, error handling
5. **Frontend Architecture** (if applicable) - Framework, state management, component architecture, routing
6. **Integration Architecture** - Third-party integrations, message queuing, event-driven patterns
7. **Security Architecture** - Auth/authorization, data protection, security boundaries
8. **Deployment Architecture** - Deployment model, CI/CD, environment strategy, monitoring
9. **Architecture Decision Records (ADRs)** - Key decisions with context, options, trade-offs, rationale
10. **FR/NFR-Specific Guidance** - Technical approach per functional requirement, implementation priorities, dependencies
11. **Standards and Conventions** - Directory structure, naming conventions, code organization, testing

**ADR Format (Brief):**

```markdown
# ADR-001: Use GraphQL for All APIs

**Status:** Accepted | **Date:** 2025-11-02

**Context:** PRD requires flexible querying across multiple epics

**Decision:** Use GraphQL for all client-server communication

**Options Considered:**

1. REST - Familiar but requires multiple endpoints
2. GraphQL - Flexible querying, learning curve
3. gRPC - High performance, poor browser support

**Rationale:**

- PRD requires flexible data fetching (Epic 1, 3)
- Mobile app needs bandwidth optimization (Epic 2)
- Team has GraphQL experience

**Consequences:**

- Positive: Flexible querying, reduced versioning
- Negative: Caching complexity, N+1 query risk
- Mitigation: Use DataLoader for batching

**Implications for FRs:**

- FR-001: User Management → GraphQL mutations
- FR-002: Mobile App → Optimized queries
```

**Example:** E-commerce platform → Monolith + PostgreSQL + Redis + Next.js + GraphQL, with ADRs explaining each choice and FR/NFR-specific guidance.

**Integration:** Feeds into create-epics-and-stories workflow. Architecture provides the technical context needed for breaking FRs/NFRs into implementable epics and stories. All dev agents reference architecture during Phase 4 implementation.

---

## create-epics-and-stories

**Purpose:** Transform PRD's functional and non-functional requirements into bite-sized stories organized into deliverable functional epics. This workflow runs AFTER architecture so epics/stories are informed by technical decisions.

**Agent:** PM (Product Manager)

**When to Use:**

- After architecture workflow completes
- When PRD contains FRs/NFRs ready for implementation breakdown
- Before implementation-readiness gate check

**Key Inputs:**

- PRD (FRs/NFRs) from Phase 2 Planning
- architecture.md with ADRs and technical decisions
- Optional: UX design artifacts

**Why After Architecture:**

The create-epics-and-stories workflow runs AFTER architecture because:

1. **Informed Story Sizing:** Architecture decisions (database choice, API style, etc.) affect story complexity
2. **Dependency Awareness:** Architecture reveals technical dependencies between stories
3. **Technical Feasibility:** Stories can be properly scoped knowing the tech stack
4. **Consistency:** All stories align with documented architectural patterns

**Key Outputs:**

Epic files (one per epic) containing:

1. Epic objective and scope
2. User stories with acceptance criteria
3. Story priorities (P0/P1/P2/P3)
4. Dependencies between stories
5. Technical notes referencing architecture decisions

**Example:** E-commerce PRD with FR-001 (User Registration), FR-002 (Product Catalog) → Epic 1: User Management (3 stories), Epic 2: Product Display (4 stories), each story referencing relevant ADRs.

---

## implementation-readiness

**Purpose:** Systematically validate that planning and solutioning are complete and aligned before Phase 4 implementation. Ensures PRD, architecture, and epics are cohesive with no gaps.

**Agent:** Architect

**When to Use:**

- **Always** before Phase 4 for BMad Complex and Enterprise projects
- After create-epics-and-stories workflow completes
- Before sprint-planning workflow
- When stakeholders request readiness check

**When to Skip:**

- Quick Flow (no solutioning)
- BMad Simple (no gate check required)

**Purpose of Gate Check:**

**Prevents:**

- ❌ Architecture doesn't address all FRs/NFRs
- ❌ Epics conflict with architecture decisions
- ❌ Requirements ambiguous or contradictory
- ❌ Missing critical dependencies

**Ensures:**

- ✅ PRD → Architecture → Epics alignment
- ✅ All epics have clear technical approach
- ✅ No contradictions or gaps
- ✅ Team ready to implement

**Check Criteria:**

**PRD/GDD Completeness:**

- Problem statement clear and evidence-based
- Success metrics defined
- User personas identified
- Functional requirements (FRs) complete
- Non-functional requirements (NFRs) specified
- Risks and assumptions documented

**Architecture Completeness:**

- System architecture defined
- Data architecture specified
- API architecture decided
- Key ADRs documented
- Security architecture addressed
- FR/NFR-specific guidance provided
- Standards and conventions defined

**Epic/Story Completeness:**

- All PRD features mapped to stories
- Stories have acceptance criteria
- Stories prioritized (P0/P1/P2/P3)
- Dependencies identified
- Story sequencing logical

**Alignment Checks:**

- Architecture addresses all PRD FRs/NFRs
- Epics align with architecture decisions
- No contradictions between epics
- NFRs have technical approach
- Integration points clear

**Gate Decision Logic:**

**✅ PASS**

- All critical criteria met
- Minor gaps acceptable with documented plan
- **Action:** Proceed to Phase 4

**⚠️ CONCERNS**

- Some criteria not met but not blockers
- Gaps identified with clear resolution path
- **Action:** Proceed with caution, address gaps in parallel

**❌ FAIL**

- Critical gaps or contradictions
- Architecture missing key decisions
- Epics conflict with PRD/architecture
- **Action:** BLOCK Phase 4, resolve issues first

**Key Outputs:**

**implementation-readiness.md** containing:

1. Executive Summary (PASS/CONCERNS/FAIL)
2. Completeness Assessment (scores for PRD, Architecture, Epics)
3. Alignment Assessment (PRD↔Architecture, Architecture↔Epics/Stories, cross-epic consistency)
4. Quality Assessment (story quality, dependencies, risks)
5. Gaps and Recommendations (critical/minor gaps, remediation)
6. Gate Decision with rationale
7. Next Steps

**Example:** E-commerce platform → CONCERNS ⚠️ due to missing security architecture and undefined payment gateway. Recommendation: Complete security section and add payment gateway ADR before proceeding.

---
