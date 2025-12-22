# Common Scenarios

## Scenario 1: Bug Fix (Quick Flow)

**Situation:** Authentication token expiration causing logout issues

**Track:** Quick Flow

**Workflow:**

1. **Document:** Skip if auth system documented, else run `document-project` (Quick scan)
2. **Plan:** Load PM → run `tech-spec`
   - Analyzes bug
   - Detects stack (Express, Jest)
   - Confirms conventions
   - Creates tech-spec.md + story
3. **Implement:** Load DEV → run `dev-story`
4. **Review:** Load DEV → run `code-review`

**Time:** 2-4 hours

---

## Scenario 2: Small Feature (Quick Flow)

**Situation:** Add "forgot password" to existing auth system

**Track:** Quick Flow

**Workflow:**

1. **Document:** Run `document-project` (Deep scan of auth module if not documented)
2. **Plan:** Load PM → run `tech-spec`
   - Detects Next.js 13.4, NextAuth.js
   - Analyzes existing auth patterns
   - Confirms conventions
   - Creates tech-spec.md + epic + 3-5 stories
3. **Implement:** Load SM → `sprint-planning` → `create-story`
   Load DEV → `dev-story` for each story
4. **Review:** Load DEV → `code-review`

**Time:** 1-3 days

---

## Scenario 3: Feature Set (BMad Method)

**Situation:** Add user dashboard with analytics, preferences, activity

**Track:** BMad Method

**Workflow:**

1. **Document:** Run `document-project` (Deep scan) - Critical for understanding existing UI patterns
2. **Analyze:** Load Analyst → `research` (if evaluating analytics libraries)
3. **Plan:** Load PM → `prd` (creates FRs/NFRs)
4. **Solution:** Load Architect → `create-architecture` → `create-epics-and-stories` → `implementation-readiness`
5. **Implement:** Sprint-based (10-15 stories)
   - Load SM → `sprint-planning`
   - Load SM → `create-story` per story
   - Load DEV → `dev-story` per story
6. **Review:** Per story completion

**Time:** 1-2 weeks

---

## Scenario 4: Complex Integration (BMad Method)

**Situation:** Add real-time collaboration to document editor

**Track:** BMad Method

**Workflow:**

1. **Document:** Run `document-project` (Exhaustive if not documented) - **Mandatory**
2. **Analyze:** Load Analyst → `research` (WebSocket vs WebRTC vs CRDT)
3. **Plan:** Load PM → `prd` (creates FRs/NFRs)
4. **Solution:**
   - Load Architect → `create-architecture` (extend for real-time layer)
   - Load Architect → `create-epics-and-stories`
   - Load Architect → `implementation-readiness`
5. **Implement:** Sprint-based (20-30 stories)

**Time:** 3-6 weeks

---

## Scenario 5: Enterprise Expansion (Enterprise Method)

**Situation:** Add multi-tenancy to single-tenant SaaS platform

**Track:** Enterprise Method

**Workflow:**

1. **Document:** Run `document-project` (Exhaustive) - **Mandatory**
2. **Analyze:** **Required**
   - `brainstorm-project` - Explore multi-tenancy approaches
   - `research` - Database sharding, tenant isolation, pricing
   - `product-brief` - Strategic document
3. **Plan:** Load PM → `prd` (comprehensive FRs/NFRs)
4. **Solution:**
   - `create-architecture` - Full system architecture including multi-tenancy design
   - `create-epics-and-stories` - Create epics and stories
   - `implementation-readiness` - Final validation before implementation
5. **Implement:** Phased sprint-based (50+ stories)

**Time:** 3-6 months

---
