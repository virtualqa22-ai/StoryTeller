# Non-Prescriptive Approach

**Minimal Examples:** This workflow provides principles and patterns, not rigid templates. Teams should adapt the traceability and gate decision formats to their needs.

**Key Patterns to Follow:**

- Map criteria to tests explicitly (don't rely on inference alone)
- Prioritize by risk (P0 gaps are critical, P3 gaps are acceptable)
- Check coverage at appropriate levels (E2E for journeys, Unit for logic)
- Verify test quality (explicit assertions, no flakiness)
- Apply deterministic gate rules for consistency
- Document gate decisions with clear evidence
- Use waivers judiciously (business approved, mitigation planned)

**Extend as Needed:**

- Add custom coverage classifications
- Integrate with code coverage tools (Istanbul, NYC)
- Link to external traceability systems (JIRA, Azure DevOps)
- Add compliance or regulatory requirements
- Customize gate decision thresholds per project
- Add manual approval workflows for gate decisions

---
