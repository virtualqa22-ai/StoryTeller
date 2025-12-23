# The Three Tracks

## Track 1: Quick Flow

**Definition**: Fast implementation with tech-spec planning.

**Time**: Hours to 1 day of planning

**Planning Docs**:

- Tech-spec.md (implementation-focused)
- Story files (1-15 typically, auto-detects epic structure)

**Workflow Path**:

```
(Brownfield: document-project first if needed)
↓
Tech-Spec → Implement
```

**Use For**:

- Bug fixes
- Simple features
- Enhancements with clear scope
- Quick additions

**Story Count**: Typically 1-15 stories (guidance, not rule)

**Example**: "Fix authentication token expiration bug"

**AI Agent Support**: Basic - minimal context provided

**Trade-off**: Less planning = higher rework risk if complexity emerges

---

## Track 2: BMad Method (RECOMMENDED)

**Definition**: Full product + system design planning.

**Time**: 1-3 days of planning

**Planning Docs**:

- PRD.md (functional and non-functional requirements)
- Architecture.md (system design)
- UX Design (if UI components)
- Epics and Stories (created after architecture)

**Workflow Path**:

```
(Brownfield: document-project first if needed)
↓
(Optional: Analysis phase - brainstorm, research, product brief)
↓
PRD → (Optional UX) → Architecture → Create Epics and Stories → Implementation Readiness Check → Implement
```

**Complete Workflow Visualization**:

![BMad Method Workflow - Standard Greenfield](./images/workflow-method-greenfield.svg)

_Detailed flowchart showing all phases, workflows, agents (color-coded), and decision points for the BMad Method track. Each colored box represents a different agent role._

**Use For**:

**Greenfield**:

- Products
- Platforms
- Multi-feature initiatives

**Brownfield**:

- Complex additions (new UIs + APIs)
- Major refactors
- New modules

**Story Count**: Typically 10-50+ stories (guidance, not rule)

**Examples**:

- "User dashboard with analytics and preferences"
- "Add real-time collaboration to existing document editor"
- "Payment integration system"

**AI Agent Support**: Exceptional - complete context for coding partnership

**Why Architecture for Brownfield?**

Your brownfield documentation might be huge. Architecture workflow distills massive codebase context into a focused solution design specific to YOUR project. This keeps AI agents focused without getting lost in existing code.

**Benefits**:

- Complete AI agent context
- Prevents architectural drift
- Fewer surprises during implementation
- Better code quality
- Faster overall delivery (planning pays off)

---

## Track 3: Enterprise Method

**Definition**: Extended planning with security, devops, and test strategy.

**Time**: 3-7 days of planning

**Planning Docs**:

- All BMad Method docs PLUS:
- Security Architecture
- DevOps Strategy
- Test Strategy
- Compliance documentation

**Workflow Path**:

```
(Brownfield: document-project nearly mandatory)
↓
Analysis (recommended/required) → PRD → UX → Architecture
↓
Create Epics and Stories
↓
Security Architecture → DevOps Strategy → Test Strategy
↓
Implementation Readiness Check → Implement
```

**Use For**:

- Enterprise requirements
- Multi-tenant systems
- Compliance needs (HIPAA, SOC2, etc.)
- Mission-critical systems
- Security-sensitive applications

**Story Count**: Typically 30+ stories (but defined by enterprise needs, not count)

**Examples**:

- "Multi-tenant SaaS platform"
- "HIPAA-compliant patient portal"
- "Add SOC2 audit logging to enterprise app"

**AI Agent Support**: Elite - comprehensive enterprise planning

**Critical for Enterprise**:

- Security architecture and threat modeling
- DevOps pipeline planning
- Comprehensive test strategy
- Risk assessment
- Compliance mapping

---
