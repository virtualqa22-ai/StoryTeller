# Planning Documents by Track

## Quick Flow Documents

**Created**: Upfront in Planning Phase

**Tech-Spec**:

- Problem statement and solution
- Source tree changes
- Technical implementation details
- Detected stack and conventions (brownfield)
- UX/UI considerations (if user-facing)
- Testing strategy

**Serves as**: Complete planning document (replaces PRD + Architecture)

---

## BMad Method Documents

**Created**: Upfront in Planning and Solutioning Phases

**PRD (Product Requirements Document)**:

- Product vision and goals
- Functional requirements (FRs)
- Non-functional requirements (NFRs)
- Success criteria
- User experience considerations
- Business context

**Note**: Epics and stories are created AFTER architecture in the create-epics-and-stories workflow

**Architecture Document**:

- System components and responsibilities
- Data models and schemas
- Integration patterns
- Security architecture
- Performance considerations
- Deployment architecture

**For Brownfield**: Acts as focused "solution design" that distills existing codebase into integration plan

---

## Enterprise Method Documents

**Created**: Extended planning across multiple phases

Includes all BMad Method documents PLUS:

**Security Architecture**:

- Threat modeling
- Authentication/authorization design
- Data protection strategy
- Audit requirements

**DevOps Strategy**:

- CI/CD pipeline design
- Infrastructure architecture
- Monitoring and alerting
- Disaster recovery

**Test Strategy**:

- Test approach and coverage
- Automation strategy
- Quality gates
- Performance testing

---
