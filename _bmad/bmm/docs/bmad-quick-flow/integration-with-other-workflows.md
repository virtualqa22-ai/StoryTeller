# Integration with Other Workflows

## Upgrading Tracks

If a Quick Flow feature grows in complexity:

```mermaid
flowchart LR
    QF[Quick Flow] --> CHECK{Complexity Increases?}
    CHECK -->|Yes| UPGRADE[Upgrade to BMad Method]
    CHECK -->|No| CONTINUE[Continue Quick Flow]

    UPGRADE --> PRD[Create PRD]
    PRD --> ARCH[Architecture Design]
    ARCH --> STORIES[Create Epics/Stories]
    STORIES --> SPRINT[Sprint Planning]

    style QF fill:#e1f5fe
    style UPGRADE fill:#fff3e0
    style PRD fill:#f3e5f5
    style ARCH fill:#e8f5e9
    style STORIES fill:#f1f8e9
    style SPRINT fill:#e0f2f1
```

## Using Party Mode

For complex Quick Flow challenges:

```bash
# Start Barry
/bmad:bmm:agents:quick-flow-solo-dev

# Begin party mode for collaborative problem-solving
party-mode
```

Party mode brings in relevant experts:

- **Architect** - For design decisions
- **Dev** - For implementation pairing
- **QA** - For test strategy
- **UX Designer** - For user experience
- **Analyst** - For requirements clarity

## Quality Assurance Integration

Quick Flow can integrate with TEA agent for automated testing:

- Test case generation
- Automated test execution
- Coverage analysis
- Test healing

---
