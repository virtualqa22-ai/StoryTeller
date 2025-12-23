# Quick Reference

## Three Tracks at a Glance

| Track                 | Planning Depth        | Best For                                   |
| --------------------- | --------------------- | ------------------------------------------ |
| **Quick Flow**        | Tech-spec only        | Simple features, bug fixes, clear scope    |
| **BMad Method**       | PRD + Arch + UX       | Products, platforms, complex features      |
| **Enterprise Method** | Method + Test/Sec/Ops | Enterprise needs, compliance, multi-tenant |

## Decision Tree

```mermaid
flowchart TD
    START{Describe your project}

    START -->|Bug fix, simple feature| Q1{Scope crystal clear?}
    START -->|Product, platform, complex| M[BMad Method<br/>PRD + Architecture]
    START -->|Enterprise, compliance| E[Enterprise Method<br/>Extended Planning]

    Q1 -->|Yes| QF[Quick Flow<br/>Tech-spec only]
    Q1 -->|Uncertain| M

    style QF fill:#bfb,stroke:#333,stroke-width:2px,color:#000
    style M fill:#bbf,stroke:#333,stroke-width:2px,color:#000
    style E fill:#f9f,stroke:#333,stroke-width:2px,color:#000
```

## Quick Keywords

- **Quick Flow**: fix, bug, simple, add, clear scope
- **BMad Method**: product, platform, dashboard, complex, multiple features
- **Enterprise Method**: enterprise, multi-tenant, compliance, security, audit

---
