# Common Scenarios

## Scenario 1: Startup (2 Developers)

**Project:** SaaS MVP (Level 3)

**Distribution:**

```
Developer A:
├─ Epic 1: Authentication (3 days)
├─ Epic 3: Payment Integration (2 days)
└─ Epic 5: Admin Dashboard (3 days)

Developer B:
├─ Epic 2: Core Product Features (4 days)
├─ Epic 4: Analytics (3 days)
└─ Epic 6: Notifications (2 days)

Total: ~2 weeks
Traditional estimate: 3-4 months
```

**BMM Setup:** Direct installation, both use Claude Code, minimal customization

## Scenario 2: Mid-Size Team (8 Developers)

**Project:** Enterprise Platform (Level 4)

**Distribution (Layer-Based):**

```
Backend (2 devs): 6 API epics
Frontend (2 devs): 6 UI epics
Full-stack (2 devs): 4 integration epics
DevOps (1 dev): 3 infrastructure epics
QA (1 dev): 1 E2E testing epic

Total: ~3 weeks
Traditional estimate: 9-12 months
```

**BMM Setup:** Git submodule, team config repo, mix of Claude Code/Cursor users

## Scenario 3: Large Enterprise (50+ Developers)

**Project:** Multi-Product Platform

**Organization:**

- 5 product teams (8-10 devs each)
- 1 platform team (10 devs - shared services)
- 1 infrastructure team (5 devs)

**Distribution (Feature-Based):**

```
Product Team A: Payments (10 epics, 2 weeks)
Product Team B: User Mgmt (12 epics, 2 weeks)
Product Team C: Analytics (8 epics, 1.5 weeks)
Product Team D: Admin Tools (10 epics, 2 weeks)
Product Team E: Mobile (15 epics, 3 weeks)

Platform Team: Shared Services (continuous)
Infrastructure Team: DevOps (continuous)

Total: 3-4 months
Traditional estimate: 2-3 years
```

**BMM Setup:** Each team has own submodule config, org-wide base config, variety of IDE tools

---
